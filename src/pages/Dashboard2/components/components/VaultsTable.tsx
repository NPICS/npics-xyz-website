import React, { useRef, useState } from "react";
import { message, Modal, notification } from "antd";
import { imgurl } from "utils/globalimport";
import BigNumber from "bignumber.js";
import http, { NPICS_GRAPH_API } from "utils/http";
import { useWeb3React } from "@web3-react/core";
import { getSignMessage } from "utils/sign";
import { setIsShowConnect, updateLoginState } from "store/app";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { BANK_NAME_MAP, SessionStorageKey } from "utils/enums";
import { BgTable, VaultsItemData } from "./StyledInterface";
import NotFound from "component/NotFound";
import { useUpdateEffect } from "utils/hook";
import { Flex, Grid, Icon, Typography } from "component/Box";
import styled from "styled-components";
import ButtonDefault from "component/ButtonDefault";
import { deserializeArray } from "class-transformer";
import { CHAIN_ID, injected } from "connectors/hooks";
// import { aa } from './data'
import { useAsync } from "react-use";
import TableWarehouse from "./TableWarehouse";
import { getVaultsServerListDataMap } from "../../../../model/vaults";
import { Npics } from "../../../../abis/Npics";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 0.1rem;
  }
  .ant-modal-body {
    padding: 0.4rem 0.5rem;
    line-height: 1.2 !important;
  }
  .ant-modal-header {
    display: none;
  }
  .ant-modal-close {
    display: none;
  }
`;

interface IProps {
  sortedInfo: string;
}

function VaultsTable(props: IProps) {
  const { account, provider } = useWeb3React();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const action = useAppDispatch();
  const isLogin = useAppSelector((state) => state.app.isLogin);
  // const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
  const DebtPosition = useRef<VaultsItemData[]>();
  // const navigate = useNavigate()
  const [vaultsList, setVaultsList] = useState<VaultsItemData[]>([]);

  useUpdateEffect(() => {
    if (!DebtPosition.current) return;
    if (props.sortedInfo === "All") {
      setVaultsList(DebtPosition.current);
      return;
    }
    const result = DebtPosition.current.filter((item) => {
      return item.getFactorStatusString() === props.sortedInfo;
    });
    setVaultsList(result);
  }, [props.sortedInfo]);

  useAsync(async () => {
    if (isLogin && account) {
      setShowModal(false);
      await getNftActivities();
    } else {
      if (account) {
        setShowModal(true);
      } else {
        // Prevent refresh popup windows
        let walletAddress = localStorage.getItem(
          SessionStorageKey.WalletAuthorized
        );
        if (!walletAddress) {
          // action(setShowWalletModalOpen(true)) // Modal
          setTimeout(() => {
            action(setIsShowConnect(true)); // Popover
          }, 500);
        }
      }
    }
  }, [isLogin, account, provider]);

  async function login2() {
    if (!provider) return;
    // TODO: library -> provider
    try {
      let address = account!;
      let msg = getSignMessage(address);
      let signatureMsg = await provider.getSigner(account).signMessage(msg);
      const loginRep: any = await http.myPost(
        "/npics-auth/app-api/v2/auth/token",
        {
          address: address,
          original: msg,
          signature: signatureMsg,
        }
      );
      if (loginRep.code === 200) {
        localStorage.setItem(SessionStorageKey.AccessToken, loginRep.data);
        // action(setIsLogin(true))
        action(updateLoginState());
      } else {
        message.warning("Signing failed");
      }
    } catch (e) {
      setShowModal(false);
    }
  }

  const getNftActivities = async () => {
    setLoading(true);

    const downpays: VaultsItemData[] = await http
      .myPost(NPICS_GRAPH_API, {
        query: `
      
      {
  downpays(first: 1000, where: {
    user: "${account}"
  },orderBy: createdAt, orderDirection: desc) {
    id
    user
    nft
    tokenId
    value
    debtValue
    bankId
    createdAt
    isAcceptOffer
    neo
    nbp
    repayAll
    repayValue
  }
}
      `,
      })
      .then((res: any) => res.data.downpays || []);
    const serverListDataMap = await getVaultsServerListDataMap();

    let debtValueCalls = [];
    let detailsPromiseList = [];
    let npics = new Npics(null);
    console.log("downpays", downpays);
    for (let i = 0; i < downpays.length; i++) {
      debtValueCalls.push(
        npics.getLoanReserveBorrowAmount(downpays[i].nft, downpays[i].tokenId)
      );

      detailsPromiseList.push(
        http.myPost(`/npics-nft/app-api/v2/nft/getCollectionItemsDetail`, {
          address: downpays[i].nft,
          // paltfrom: BANK_NAME_MAP[downpays[i].bankId],
          tokenId: downpays[i].tokenId,
        })
      );
    }
    const debtValueList = await Promise.all(debtValueCalls);
    const details: any[] = await Promise.all(detailsPromiseList);
    console.log("details", details); //data.marketUrl
    for (let i = 0; i < downpays.length; i++) {
      const item =
        serverListDataMap[BANK_NAME_MAP[downpays[i].bankId]]
          .collectionsResultModelMap[downpays[i].nft.toLowerCase()];
      downpays[i] = {
        ...downpays[i],
        debtValue: debtValueList[i].repayDebtAmount,
        floorPrice: new BigNumber(item.floorPrice),
        purchaseFloorPrice: new BigNumber(downpays[i].value),
        ltv: new BigNumber(item.ltv),
        imageUrl: details[i].data?.imageUrl || item.nftCoverImage,
        collectionName: item.name,
        liquidationThreshold: item.liquidationThreshold,
      } as unknown as VaultsItemData;
    }
    const vaultsList_ = deserializeArray(
      VaultsItemData,
      JSON.stringify(downpays)
    );
    // console.log("vaultsList_", vaultsList_);
    setVaultsList(vaultsList_);
    DebtPosition.current = vaultsList_;
    setLoading(false);
  };

  const ConfirmModal = (props: { enter?(): void }) => (
    <Grid gridGap="0.3rem">
      <Flex alignItems="center" justifyContent="space-between">
        <Typography></Typography>
        <Typography fontSize="0.3rem" fontWeight="800" color="#000">
          Verify Address
        </Typography>
        <Typography></Typography>
        {/* <div style={{ cursor: 'pointer' }}><Icon width="0.24rem" height="0.24rem" src={imgurl.dashboard.Cancel} onClick={() => {
          setShowModal(false)
        }} /></div> */}
      </Flex>

      <Typography>
        You will be asked to sign a message in your wallet to verify you as the
        owner of the address.
      </Typography>
      <Flex gap="0.2rem" justifyContent="center" marginTop="0.3rem">
        <ButtonDefault
          minWidth="2rem"
          height="0.52rem"
          types="second"
          color="#000"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </ButtonDefault>
        <ButtonDefault
          minWidth="2rem"
          height="0.52rem"
          types="normal"
          color="#fff"
          onClick={async () => {
            if (account) {
              login2();
            } else {
              if (!account) {
                setShowModal(false);
                try {
                  await injected.activate(1);
                } catch (e: any) {
                  notification.error({ message: e.message });
                }
              }
            }
          }}
        >
          OK
        </ButtonDefault>
      </Flex>
    </Grid>
  );

  return (
    <BgTable>
      {loading ? (
        <div className="loading">
          <img src={imgurl.market.progressIcon} alt="" />
        </div>
      ) : vaultsList.length ? (
        <TableWarehouse
          Source={vaultsList}
          getNftActivities={getNftActivities}
        />
      ) : (
        <NotFound padding={"1rem 0"} />
      )}
      <StyledModal
        visible={showModal}
        footer={null}
        onCancel={() => {
          setShowModal(false);
        }}
        destroyOnClose={true}
        maskClosable={false}
        centered={true}
        width="5.48rem"
      >
        <ConfirmModal />
      </StyledModal>
    </BgTable>
  );
}

export default VaultsTable;
