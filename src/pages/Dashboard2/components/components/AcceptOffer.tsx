import React, { useState, useEffect, useMemo } from "react";
import Modal from "../../../../component/Modal";
import { Box, Flex, Grid, Icon, Typography } from "../../../../component/Box";
import {
  CancelButton,
  ConfirmButton,
  PopupTitle,
} from "../../../Marketplace2/NFTPay";
import validIcon from "../../../../assets/images/market/nfts_opensea_valid.svg";
import wethIcon from "../../../../assets/images/market/weth_icon.svg";
import { OfferModal } from "./TableWarehouse";
import { Offers } from "model/offers";
import { DataSource2 } from "./StyledInterface";
import BigNumber from "bignumber.js";
import { thousandFormat } from "utils/urls";
import { useAppSelector } from "store/hooks";
import { useAsync } from "react-use";
import { ContractAddresses } from "utils/addresses";
import { useERC721Contract, useNpicsContract } from "hooks/useContract";
import { notification, Popover } from "antd";
import http, { X2Y2_ORDER_SIGN_API } from "utils/http";
// import { useERC20Contract } from '../../../../hooks/useContract';
import tipsIcon from "assets/images/market/exclamation_point.png";
import { Pop20 } from "component/Popover/Popover";
import axios from "axios";
import { deserializeSignature } from "rsv-signature";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import {
  IMakerBid,
  ITakerAsk,
  LooksRareExchange,
} from "abis/looksRareExchange";
import { Erc20 } from "abis/Erc20";
interface IProps {
  showOffer: OfferModal;
  nftInfo: DataSource2 | undefined;
  accpetOffer: Offers | undefined;
  setShowOffer: React.Dispatch<React.SetStateAction<OfferModal>>;
}

let X2Y2Fee = 0.005;
let MarkerFee = 0.02;
export default function AcceptOffer(props: IProps) {
  const { account, provider } = useWeb3React();

  const ethRate = useAppSelector(
    (state) => new BigNumber(state.app.data.EthPrice)
  );
  const { showOffer, accpetOffer, nftInfo, setShowOffer } = props;
  const [accept, setAccept] = useState<boolean>(false);
  const [creatorRoyalty, setCreatorRoyalty] = useState<number>(0);
  // const erc721 = useERC721Contract(nftInfo?.nftAddress as string)
  const npics = useNpicsContract();
  const nft = useERC721Contract(nftInfo?.nftAddress as string);

  const signatureToRSV = (signature: string) => {
    const signature_ = signature.replace("0x", "");
    const size = 64;
    return {
      r: signature_.substring(0, size),
      s: signature_.substring(size, size * 2),
      v: 27, //Number("0x" + signature_.substring(size * 2, size * 2 + 2)),
    };
  };

  const getLockerGraphData = () => {
    return {
      id: "244364926",
      type: "OFFER",
      hash: null,
      createdAt: "2022-08-15T00:05:20.576Z",
      to: null,
      from: {
        address: "0x0fB87C2B4ac21Fb0908F194A1f1f9731d294305C",
        name: null,
        isVerified: false,
        avatar: null,
      },
      token: null,
      collection: {
        address: "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B",
        name: "CloneX",
        description: null,
        totalSupply: "19355",
        type: "ERC721",
        isVerified: true,
        logo: {
          src: "https://static.looksnice.org/0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B/0xfa2c7077faaa0d12c0f021c39a2e5ef672e531273914161742234795360d6a25",
          contentType: "image/png",
        },
        floorOrder: {
          price: "6900000000000000000",
        },
      },
      order: {
        status: "VALID",
        isOrderAsk: false,
        signer: "0x0fB87C2B4ac21Fb0908F194A1f1f9731d294305C",
        collection: {
          address: "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B",
        },
        price: "6150000000000000000",
        amount: "1",
        strategy: "0x86F909F70813CdB1Bc733f4D97Dc6b03B8e7E8F3",
        currency: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        nonce: "0",
        startTime: "1660521885",
        endTime: "1660781035",
        minPercentageToAsk: "9300",
        params: null,
        signature:
          "0x9a9635fdbf80469a7e66e19fdd94b12c5c17fd08c32dde5c6ed1274769bfcdac436819bd4a77f90c81b5908437019e7001688965c902bdc5352f03ee326d29ac00",
        token: null,
        hash: "0x3a8e336d93513e87e43f2fd2e53f249cf5c376b7c39a6f0efd48e8b827f10c2c",
      },
    };
    return axios
      .post(
        "https://graphql.looksrare.org/graphql",
        {
          query: `
     "query GetEventsQuery($pagination: PaginationInput, $filter: EventFilterInput) {\\n      events(pagination: $pagination, filter: $filter) {\\n        ...EventFragment\\n      }\\n    }\\n    \\n  fragment EventFragment on Event {\\n    id\\n    type\\n    hash\\n    createdAt\\n    to {\\n      ...UserEventFragment\\n    }\\n    from {\\n      ...UserEventFragment\\n    }\\n    token {\\n      tokenId\\n      image {\\n        src\\n        contentType\\n      }\\n      name\\n    }\\n    collection {\\n      address\\n      name\\n      description\\n      totalSupply\\n      type\\n      isVerified\\n      logo {\\n        src\\n        contentType\\n      }\\n      floor {\\n        floorPrice\\n      }\\n    }\\n    order {\\n      status\\n      ...OrderFragment\\n    }\\n  }\\n  \\n  fragment OrderFragment on Order {\\n    isOrderAsk\\n    signer\\n    collection {\\n      address\\n    }\\n    price\\n    amount\\n    strategy\\n    currency\\n    nonce\\n    startTime\\n    endTime\\n    minPercentageToAsk\\n    params\\n    signature\\n    token {\\n      tokenId\\n    }\\n    hash\\n  }\\n\\n  \\n  fragment UserEventFragment on User {\\n    address\\n    name\\n    isVerified\\n    avatar {\\n      image {\\n        src\\n        contentType\\n      }\\n    }\\n  }\\n\\n\\n  "
      `,
          variables: {
            filter: {
              collection: "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B",
            },
            pagination: { first: 20 },
          },
        }
        // {
        //   headers: {
        //     ["User-Agent"]:
        //       "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
        //     ["Content-Type"]: "application/json",
        //     ["Origin"]: "https://looksrare.org",
        //     ["Referer"]: "https://looksrare.org",
        //   },
        // }
      )
      .then((res) => {
        return res.data.data.events[0];
      });
  };

  const onApproveLooksRare = async (amount: string) => {
    if (!account) {
      return false;
    }
    let weth = new Erc20(
      ContractAddresses.WETH,
      provider ? provider.getSigner(account) : window.ethereum
    );

    const [allowance, balanceOf] = await Promise.all([
      weth.allowance(account, ContractAddresses.looksRareExchange),
      weth.balanceOf(account),
    ]);
    const _amount = new BigNumber(amount).multipliedBy(
      new BigNumber(10).pow(18)
    );
    // if (balanceOf.lt(_amount)) {
    //   throw new Error("Insufficient balance");
    // }
    if (allowance.gt(_amount)) {
      return;
    }
    const tx = await weth.approve(
      ContractAddresses.looksRareExchange,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    );
    await tx.wait();
  };

  const acceptOffer = async () => {
    if (!nftInfo || !accpetOffer || !npics || !account) return;
    setAccept(!accept);
    try {
      setShowOffer(OfferModal.PROGRESSING);
      const looksRareData = await getLockerGraphData();
      console.log("looksRareData", looksRareData);
      if (looksRareData) {
        // await onApproveLooksRare(looksRareData.order.amount);
        const sign = signatureToRSV(looksRareData.order.signature);
        console.log("sign", sign);

        const takerAsk: ITakerAsk = {
          isOrderAsk: true,
          taker: ContractAddresses.NpicsProxy,
          price: looksRareData.order.price,
          tokenId: nftInfo.tokenId,
          minPercentageToAsk: looksRareData.order.minPercentageToAsk,
          params: looksRareData.order.params || "",
        };

        const makerBid: IMakerBid = {
          isOrderAsk: looksRareData.order.isOrderAsk,
          signer: looksRareData.order.signer,
          collection: looksRareData.order.collection.address,
          price: looksRareData.order.price,
          tokenId: looksRareData.order.token || 0,
          amount: looksRareData.order.amount,
          strategy: looksRareData.order.strategy,
          currency: looksRareData.order.currency,
          nonce: looksRareData.order.nonce,
          startTime: looksRareData.order.startTime,
          endTime: looksRareData.order.endTime,
          minPercentageToAsk: looksRareData.order.minPercentageToAsk,
          params: looksRareData.order.params || "",
          v: sign.v,
          r: sign.r,
          s: sign.s,
        };
        console.log(takerAsk, makerBid);
        // console.log("takerAsk", takerAsk);
        // console.log("makerBid", makerBid);
        const singer = provider ? provider.getSigner(account) : window.ethereum;
        const looksRareExchangeContract = new LooksRareExchange(singer);
        const _BytesData =
          looksRareExchangeContract.getMatchBidWithTakerAskEncodeAbi(
            {
              ...takerAsk,
              params: takerAsk.params || "0x",
            },
            {
              ...makerBid,
              r: "0x" + makerBid.r,
              s: "0x" + makerBid.s,
              params: makerBid.params || "0x",
            }
          );
        console.log("_BytesData", _BytesData);
        await npics.acceptOffer(
          nftInfo.nftAddress,
          nftInfo.tokenId,
          ContractAddresses.looksRareExchange,
          _BytesData,
          ContractAddresses.looksRare_transferManagerERC721
        );
      } else {
        // await erc721?.approve(approveTo,nftInfo.tokenId)
        // const nbpAddress = await npics.getNbpFor(
        //   nftInfo.nftAddress,
        //   nftInfo.tokenId
        // );
        // const owner = await nft?.ownerOf(nftInfo.tokenId);
        // console.log(`owner => ${owner}`)
        // console.log(`nbpAddress => ${nbpAddress}`)
        const parameter = {
          caller: ContractAddresses.NpicsProxy,
          op: 2,
          amountToEth: "0",
          amountToWeth: "0",
          items: [
            {
              orderId: accpetOffer.id,
              currency: ContractAddresses.WETH,
              price: accpetOffer.price,
              tokenId: nftInfo.tokenId,
            },
          ],
        };

        let BytesData: any = await http
          .myPost(X2Y2_ORDER_SIGN_API, parameter)
          .then((res: any) => res.data[0].input);

        // const _owner = owner?.replace("0x", "").toLocaleLowerCase();
        // const _nbpAddress = nbpAddress?.replace("0x", "");
        const _BytesData = BytesData.replace("0x", "0x357a150b");
        // const __BytesData = _BytesData.replace(`${_owner}`, `${_nbpAddress}`);
        await npics.acceptOffer(
          nftInfo.nftAddress,
          nftInfo.tokenId,
          ContractAddresses.x2y2R1,
          _BytesData,
          ContractAddresses.x2y2_ERC721Delegate
        );
      }
      setShowOffer(OfferModal.NONE);
      notification.success({
        message: "Your vault has accepted the offer successfully.",
      });
    } catch (e: any) {
      console.log(e.message);
      setShowOffer(OfferModal.NONE);
      notification.error({ message: "Your vault accept the offer failed." });
    }
  };

  useAsync(async () => {
    if (!nftInfo) return;
    console.log(`nftInfo => ${nftInfo?.nftAddress}`);
    const result: any = await http.myGet(
      `/npics-nft/app-api/v2/neo/getOfferFee/${nftInfo?.nftAddress}`
    );
    console.log(`CreatorRoyalty => ${result.data.data}`);
    if (result.data.code === 200) {
      const _creatorRoyalty = result.data.data / 10000 / 100;
      setCreatorRoyalty(_creatorRoyalty);
    }
  }, [nftInfo]);

  return (
    <Modal isOpen={showOffer === OfferModal.OFFER}>
      <Box
        minWidth={"8.8rem"}
        background={`#fff`}
        borderRadius={`0.2rem`}
        padding={`0.4rem`}
      >
        <PopupTitle title={"Accept Offer"} canClose={false} />
        <Grid
          marginTop={`0.3rem`}
          padding={`0.2rem 0.25rem`}
          borderRadius={`0.1rem`}
          border={`0.01rem solid #0000001A`}
          gridTemplateRows={"3.06rem auto"}
          gridTemplateColumns={`3.06rem auto`}
          gridTemplateAreas={`
          "img price"
          "receive receive"
        `}
          gridGap={`0.14rem`}
        >
          <Grid
            gridArea={`img`}
            borderRadius={"0.06rem"}
            background={`#eee`}
            overflow={"hidden"}
          >
            <Icon width={"100%"} height={"100%"} src={nftInfo?.imageUrl}></Icon>
          </Grid>
          <Grid gridArea={`price`}>
            {/* Name and price */}
            <Flex flexDirection={`column`} alignItems={`stretch`}>
              <Flex gap={`0.06rem`} alignItems={`center`}>
                <Typography
                  color={`#000`}
                  fontSize={`0.14rem`}
                  fontWeight={500}
                >
                  {nftInfo && nftInfo.collectionName}
                </Typography>
                <Icon
                  src={validIcon}
                  width={`0.12rem`}
                  height={`0.12rem`}
                ></Icon>
              </Flex>
              <Typography
                marginTop={`0.06rem`}
                fontWeight={700}
                fontSize={`0.2rem`}
                color={`#000`}
              >
                {nftInfo && `${nftInfo.singularForName()} #${nftInfo.tokenId}`}
              </Typography>
              {/* Offer */}
              <Flex
                marginTop={`0.1rem`}
                border={`0.01rem solid #0000001A`}
                flex={1}
                borderRadius={`0.1rem`}
                flexDirection={`column`}
                alignItems={`stretch`}
                background={`#F6F6F6`}
                overflow={`hidden`}
              >
                <Flex
                  flex={1}
                  borderBottom={`0.01rem solid #0000001A`}
                  background={`#fff`}
                >
                  <OfferCell
                    title={`Offer`}
                    titleColor={`#000`}
                    infoIcon={false}
                    symbolIcon={true}
                    symbolOrVal={`${accpetOffer?.OfferPriceDisplay()}`}
                  />
                </Flex>
                <OfferCell
                  title={`Vault Debt`}
                  infoIcon={false}
                  symbolIcon={true}
                  symbolOrVal={`${nftInfo?.debtString()}`}
                />
                <OfferCell
                  title={`X2Y2 Fee`}
                  popoverInfo={"Fee to X2Y2"}
                  infoIcon={true}
                  symbolIcon={false}
                  symbolOrVal={`${X2Y2Fee * 100}%`}
                />
                <OfferCell
                  title={`Marker Fee`}
                  popoverInfo={"Fee to NPics"}
                  infoIcon={true}
                  symbolIcon={false}
                  symbolOrVal={`${MarkerFee * 100}%`}
                />
                <OfferCell
                  title={`Creator Royalty`}
                  popoverInfo={"Fee to the creator of NFT"}
                  infoIcon={true}
                  symbolIcon={false}
                  symbolOrVal={`${creatorRoyalty && creatorRoyalty * 100}%`}
                />
              </Flex>
            </Flex>
          </Grid>
          <Grid gridArea={`receive`}>
            <Flex
              background={`#7BD742`}
              borderRadius={`0.1rem`}
              padding={`0.3rem 0.4rem`}
              alignItems={`center`}
              justifyContent={`space-between`}
              style={{
                cursor: `pointer`,
                userSelect: `none`,
              }}
            >
              <Typography color={`#000`} fontSize={`0.2rem`} fontWeight={700}>
                You Receive
              </Typography>
              <Flex flexDirection={`row`} gap={`0.06rem`} alignItems={`center`}>
                <Icon src={wethIcon}></Icon>
                <Typography color={`#000`} fontSize={`0.2rem`} fontWeight={700}>
                  {nftInfo &&
                    accpetOffer &&
                    accpetOffer.price
                      .minus(nftInfo.totalDebt)
                      .minus(
                        new BigNumber(
                          `${X2Y2Fee + MarkerFee + creatorRoyalty}`
                        ).times(accpetOffer.price)
                      )
                      .div(10 ** 18)
                      .toFixed(2, 1)}
                </Typography>
                <Typography
                  color={`rgba(0, 0, 0, .5)`}
                  fontSize={`0.16rem`}
                  fontWeight={500}
                  marginLeft={`0.04rem`}
                >
                  {nftInfo &&
                    accpetOffer &&
                    `(${thousandFormat(
                      accpetOffer.price
                        .minus(nftInfo.totalDebt)
                        .minus(
                          new BigNumber(
                            X2Y2Fee + MarkerFee + creatorRoyalty
                          ).times(accpetOffer.price)
                        )
                        .times(ethRate)
                        .div(10 ** 18)
                        .toFixed(2, 1)
                    )})`}
                </Typography>
              </Flex>
            </Flex>
          </Grid>
        </Grid>
        {/* buttons */}
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          gap={"0.2rem"}
          marginTop={"0.3rem"}
        >
          <CancelButton
            onClick={async () => {
              props.setShowOffer(OfferModal.NONE);
            }}
          >
            Cancel
          </CancelButton>
          <ConfirmButton onClick={acceptOffer}>Accept Offer</ConfirmButton>
        </Flex>
      </Box>
    </Modal>
  );
}

function OfferCell(props: {
  title: string;
  titleColor?: string;
  symbolIcon: boolean;
  infoIcon: boolean;
  popoverInfo?: string;
  symbolOrVal?: string | number;
}) {
  return (
    <Flex
      flex={1}
      alignItems={`center`}
      justifyContent={`space-between`}
      padding={`0 0.3rem`}
    >
      <Typography
        color={props.titleColor ?? `rgba(0, 0, 0, .5)`}
        fontSize={`0.14rem`}
        fontWeight={500}
      >
        {props.title}
        <Pop20 content={props.popoverInfo ?? ""}>
          <Icon
            style={{ marginLeft: "0.08rem" }}
            width={"0.14rem"}
            src={tipsIcon}
            hidden={!props.infoIcon}
          />
        </Pop20>
      </Typography>

      <Flex alignItems={`center`} gap={`0.06rem`}>
        <Icon
          src={wethIcon}
          width={`0.1rem`}
          height={`0.15rem`}
          hidden={!props.symbolIcon}
        />
        <Typography fontSize={`0.14rem`} color={`#000`} fontWeight={500}>
          {props.symbolOrVal ?? `-`}
        </Typography>
      </Flex>
    </Flex>
  );
}
