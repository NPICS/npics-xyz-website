import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, GridItem, Icon, Typography } from "component/Box";
import { imgurl } from "utils/globalimport";
import ProgressBar from "pages/Dashboard2/components/components/ProgressBar";
import ButtonDefault from "component/ButtonDefault";
import { VaultsContractCalcData, VaultsItemData } from "./StyledInterface";
import { useWeb3React } from "@web3-react/core";
import { InputNumber, message, Modal, Skeleton } from "antd";
import BigNumber from "bignumber.js";
import { setIsShowConnect, updateLoginState } from "store/app";
import { BANK_ENUM, BANK_NAME_MAP, SessionStorageKey } from "utils/enums";
import http, { NPICS_GRAPH_API } from "utils/http";
import { getSignMessage } from "utils/sign";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import Payment from "./Payment";
import styled from "styled-components";
import PaySuccessful from "./PaySuccessful";
import {
  DebtPop,
  EstimatProfitPop,
  HealthFactorPop,
  MintedNFTPop,
  VaultAprPop,
} from "utils/popover";
import { useAsync } from "react-use";
import Checkbox from "component/Input/Checkbox";
import { TextPlaceholder } from "component/styled";
import { _toString } from "./data";
import { Pop } from "component/Popover/Popover";
import {
  getVaultsContractData,
  getVaultsServerListDataMap,
} from "../../../../model/vaults";
import { deserializeArray } from "class-transformer";
import { Npics } from "../../../../abis/Npics";
import wingPriceIcon from "../../../../assets/images/market/wing_price.svg";

const Banner = () => {
  return (
    <Box
      position={"absolute"}
      height={"4.2rem"}
      top={0}
      left={0}
      right={0}
      zIndex={0}
      background={"#1a1a1a"}
    ></Box>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 0.1rem;
  }

  .ant-modal-body {
    padding: 0.24rem;
    line-height: 1.2 !important;
  }

  .ant-modal-header {
    display: none;
  }

  .ant-modal-close {
    display: none;
  }
`;
const Cover = styled.img`
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: 0.1rem;
`;

const TipsIcon = styled(Icon)`
  position: absolute;
  top: 0.14rem;
  right: 0.14rem;
`;

const InputNumberStyled = styled(InputNumber)`
  .ant-input-number-input-wrap {
    .ant-input-number-input {
      height: 100%;
      padding-top: 0.05rem;
      user-select: auto;
      font-size: 0.3rem;
      font-weight: 800;
      color: #000;
      width: inherit;
    }
  }
`;

interface RepaymentInformation {
  address: string;
  tokenId: string;
  progressVal: number;
  payDebt: BigNumber;
}

export default function VaultsDetail() {
  const [progressVal, setProgressVal] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const { account, provider } = useWeb3React();
  const [walletBalance, setWalletBalance] = useState<BigNumber>();
  const [activities, setActivities] = useState<VaultsItemData>();
  const [contractCalcData, setContractCalcData] =
    useState<VaultsContractCalcData>();

  const [aprData, setAprData] = useState<{ apr: number; rewardApr: number }>({
    apr: 0,
    rewardApr: 0,
  });
  const [payDebt, setPayDebt] = useState<BigNumber>(new BigNumber(0));
  const [inputPayDebt, setInputPayDebt] = useState<number>(0);
  const [remainingDebt, setRemainingDebt] = useState<BigNumber>();
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [payInfo, setPayInfo] = useState<RepaymentInformation>();
  const [isPayingAllDebts, setIsPayingAllDebts] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [tradeTx, setTradeTx] = useState<string>("");
  const action = useAppDispatch();
  const isLogin = useAppSelector((state) => state.app.isLogin);
  let urlParams: any = useParams();
  const navigate = useNavigate();
  const params: { graphId: string } = urlParams;

  useEffect(() => {
    // get thw arp
    http.myPost("/npics-nft/app-api/v2/nfthome/getAprInfo", {}).then((resp) => {
      let _resp = resp as any;
      if (_resp.code === 200) {
        setAprData({
          apr: parseFloat(_resp.data.apr) || 0,
          rewardApr: parseFloat(_resp.data.rewardApr) || 0,
        });
      }
    });
  }, []);

  useEffect(() => {
    getBalance();
    // eslint-disable-next-line
  }, [account]);

  const getBalance = async () => {
    if (!account || !provider) return;
    const balance = await provider.getBalance(account);
    setWalletBalance(new BigNumber(balance.toString()));
    // TODO: bignumber is not the bignumber
  };

  useEffect(() => {
    if (checked) {
      setProgressVal(1);
    } else {
      setProgressVal(0);
    }
    // eslint-disable-next-line
  }, [checked]);

  useEffect(() => {
    if (!activities || !contractCalcData) return;
    if (progressVal === 1) {
      console.log("checked", checked);
      setChecked(true);
    } else {
      setChecked(false);
    }
    const pDebt =
      progressVal === 1
        ? contractCalcData.maxDebt
        : contractCalcData?.debt.times(progressVal);
    const rDebt =
      progressVal === 1
        ? new BigNumber(0)
        : contractCalcData?.debt.times(1 - progressVal);
    const showDebt = +pDebt.div(10 ** 18).toFixed(4, 1);
    setPayDebt(pDebt);
    setRemainingDebt(rDebt);
    setInputPayDebt(showDebt);
    console.log("pDebt", pDebt.toFixed());

    // eslint-disable-next-line
  }, [progressVal, activities, contractCalcData]);
  let timeout: NodeJS.Timeout | null;
  const onProgressBar = (e: any) => {
    if (!timeout) {
      timeout = setTimeout(function () {
        setProgressVal(e);
        timeout = null;
      }, 35);
    }
  };
  useEffect(() => {
    if (!activities || !contractCalcData) return;
    if (
      inputPayDebt === +contractCalcData?.maxDebt.div(10 ** 18).toFixed(4, 1)
    ) {
      setProgressVal(1);
      return;
    } else if (inputPayDebt === 0) {
      setProgressVal(0);
      return;
    }
    const Proportion =
      inputPayDebt / +contractCalcData.debt.div(10 ** 18).toFixed(4, 1);
    setProgressVal(Proportion);
  }, [inputPayDebt, contractCalcData]);

  const handleIptDebt = (e: string | number) => {
    if (!activities || !contractCalcData) return;
    let maxDebtNum = +contractCalcData?.maxDebt.div(10 ** 18).toFixed(4, 1);
    if (e >= maxDebtNum) {
      setInputPayDebt(maxDebtNum);
    } else {
      setInputPayDebt(e as number);
    }
    if (e === null) {
      setInputPayDebt(0.0);
    }
  };

  useEffect(() => {
    if (isLogin) {
      setProgressVal(0);
      getNftActivities();
    }
    // eslint-disable-next-line
  }, [isLogin, params, account, reload]);

  useAsync(async () => {
    if (account && !isLogin) {
      login2();
    } else {
      // Prevent refresh popup windows
      let walletAddress = localStorage.getItem(
        SessionStorageKey.WalletAuthorized
      );
      if (!account && !walletAddress) {
        setTimeout(() => {
          action(setIsShowConnect(true)); // Popover
        }, 500);
        // action(setShowWalletModalOpen(true)) // modal
      }
    }
    // eslint-disable-next-line
  }, [account, isLogin]);

  async function login2() {
    if (!provider) return;
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
        action(updateLoginState());
        // action(setIsLogin(true))
      } else {
        message.warning("Signing failed");
      }
    } catch (e) {
      console.log(`Login Erro => ${e}`);
    }
  }

  const getNftActivities = async () => {
    if (!params) return;

    let downpay: VaultsItemData = await http
      .myPost(NPICS_GRAPH_API, {
        query: `
      {
          downpays(first: 1, where: {
            id: "${params.graphId}"
          }) {
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
            floorPrice
          }
        }
      `,
      })
      .then((res: any) => res.data.downpays && res.data.downpays[0]);
    if (!downpay) {
      return;
    }

    const serverListDataMap = await getVaultsServerListDataMap();
    const downpayItem =
      serverListDataMap[BANK_NAME_MAP[downpay.bankId as 0 | 1]]
        .collectionsResultModelMap[downpay.nft.toLowerCase()];
    let npics = new Npics(null);
    const { repayDebtAmount: debtValue } =
      await npics.getLoanReserveBorrowAmount(downpay.nft, downpay.tokenId);

    const imageUrlData: any = await http.myPost(
      `/npics-nft/app-api/v2/nft/getCollectionItemsDetail`,
      {
        address: downpay.nft,
        tokenId: downpay.tokenId,
      }
    );
    downpay = {
      ...downpay,
      debtValue,
      purchaseFloorPrice: new BigNumber(downpay.floorPrice).div(10 ** 18),
      floorPrice: new BigNumber(downpayItem.floorPrice),
      ltv: new BigNumber(downpayItem.ltv),
      imageUrl: imageUrlData.data?.imageUrl || downpayItem.nftCoverImage,
      collectionName: downpayItem.name,
      liquidationThreshold: downpayItem.liquidationThreshold,
    } as unknown as VaultsItemData;
    console.log(
      downpay.floorPrice.toString(),
      downpay.purchaseFloorPrice.toString()
    );

    const contractData: VaultsContractCalcData = await getVaultsContractData(
      downpay.nft,
      downpay.tokenId
    );
    setContractCalcData(contractData);
    const [downpay_] = deserializeArray(
      VaultsItemData,
      JSON.stringify([downpay])
    );
    setActivities(downpay_);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const goBack = () => {
    navigate("/dashboard/vaults");
  };
  const handleRepay = () => {
    let object = {
      address: activities?.nft as string,
      tokenId: activities?.tokenId as string,
      progressVal: progressVal,
      payDebt: payDebt as BigNumber,
    };
    setPayInfo(object);
    setShowPayment(true);
  };

  const lendingProviderMap = {
    [BANK_ENUM.bend]: {
      name: "BenDao",
      img: imgurl.market.BendDAOBuy,
    },
    [BANK_ENUM.wing]: {
      name: "Wing",
      img: imgurl.market.wingPriceIcon,
    },
  };
  return (
    <Flex
      position={"relative"}
      flexDirection={"column"}
      padding={"0 1.6rem"}
      background={"transparent"}
      marginBottom={"1.6rem"}
    >
      <Banner />
      <Box zIndex={1}>
        <Flex
          marginTop={"2.14rem"}
          marginBottom={"0.3rem"}
          gap={"0.2rem"}
          alignItems={"center"}
        >
          {/*<Icon width='0.36rem' height='0.36rem' src={imgurl.dashboard.reback} />*/}
          <div style={{ cursor: "pointer" }}>
            <Icon
              width="0.36rem"
              height="0.36rem"
              src={imgurl.dashboard.reback}
              onClick={goBack}
            />
          </div>
          <Typography fontSize={"0.3rem"} fontWeight={"800"} color={"#fff"}>
            Repay
          </Typography>
        </Flex>

        <Box
          background={"#fff"}
          // minHeight={"60vh"}
          borderRadius={"0.1rem"}
          padding={"0.4rem 0.6rem"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex flexDirection={"column"}>
              <Typography fontSize={"0.2rem"} fontWeight={"700"} color={"#000"}>
                Vault Detail
              </Typography>
              <Flex alignItems={"center"} marginRight="0.05rem">
                <Typography
                  marginRight="0.07rem"
                  fontSize={"0.14rem"}
                  fontWeight={"500"}
                  color={"rgba(0,0,0,.5)"}
                >
                  Asset:
                </Typography>
                <Flex alignItems={"center"}>
                  <Typography
                    marginRight={"0.1rem"}
                    fontSize={"0.14rem"}
                    fontWeight={"500"}
                    color={"rgba(0,0,0,.5)"}
                  >
                    {activities &&
                      `${
                        _toString(activities?.collectionName) ?? TextPlaceholder
                      } #${activities?.tokenId ?? TextPlaceholder}`}
                  </Typography>
                  <Icon
                    style={{ cursor: "pointer" }}
                    width="0.14rem"
                    height="0.14rem"
                    src={imgurl.dashboard.export14}
                    alt=""
                    onClick={() =>
                      window.open(
                        `https://etherscan.io/nft/${activities?.nft}/${activities?.tokenId}`
                      )
                    }
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex
              alignItems={"center"}
              background={"#fff"}
              boxShadow={"0 0 0.2rem rgba(0,0,0,.1)"}
              borderRadius={"0.1rem"}
              gap={"0.12rem"}
              padding={"0.11rem"}
            >
              {/* <Typography fontSize={"0.14rem"} fontWeight={"500"} color={"#000"}>Status</Typography> */}
              <Typography
                fontSize={"0.16rem"}
                fontWeight={"700"}
                color={
                  activities?.getFactorStatusString() === "Inforce"
                    ? "#7BD742"
                    : "#FF4949"
                }
              >
                {activities?.getFactorStatusString()}
              </Typography>
            </Flex>
          </Flex>

          <Grid
            marginTop={"0.3rem"}
            gridTemplateColumns={"3.4rem auto"}
            gridGap={"0.3rem"}
          >
            {/* <Icon style={{borderRadius: '0.1rem', background: "#e5e5e5"}} width='3.4rem' height='3.4rem'
                src={activities?.imageUrl ?? ""}/> */}
            <Grid>
              {activities?.imageUrl ? (
                <Cover src={activities?.imageUrl} />
              ) : (
                <Skeleton.Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.1rem",
                  }}
                />
              )}
            </Grid>
            <Grid
              gridTemplateAreas='"Minted Profit" "Numerical Numerical"'
              gridGap={"0.1rem"}
            >
              <GridItem
                background={"#fff"}
                boxShadow={"0 0 0.2rem rgba(0,0,0,.1)"}
                borderRadius={"0.1rem"}
                gridArea={"Minted"}
                padding={"0.25rem 0"}
                flexDirection="column"
                alignItems="center"
                justifyContent={"center"}
                position={"relative"}
              >
                <Pop content={MintedNFTPop}>
                  <TipsIcon width={"0.14rem"} src={imgurl.market.tipsIcon} />
                </Pop>
                <Flex alignItems={"center"} marginBottom={"0.12rem"}>
                  <Typography
                    marginRight={"0.1rem"}
                    fontSize="0.24rem"
                    fontWeight="700"
                    color="#000"
                  >
                    {activities &&
                      `NEO ${
                        _toString(activities?.collectionName) ?? TextPlaceholder
                      } #${activities?.tokenId ?? TextPlaceholder}`}
                  </Typography>
                  <Icon
                    style={{ cursor: "pointer" }}
                    width="0.16rem"
                    height="0.16rem"
                    src={imgurl.dashboard.export14}
                    alt=""
                    onClick={() => {
                      if (!activities) return;
                      window.open(
                        `https://cn.etherscan.com/nft/${activities.neo}/${activities.tokenId}`
                      );
                    }}
                  />
                </Flex>
                <Typography
                  fontSize="0.14rem"
                  fontWeight="500"
                  color="rgba(0,0,0,.5)"
                >
                  NEO NFT
                </Typography>
              </GridItem>
              <GridItem
                background={"#fff"}
                boxShadow={"0 0 0.2rem rgba(0,0,0,.1)"}
                borderRadius={"0.1rem"}
                gridArea={"Profit"}
                padding={"0.25rem 0"}
                flexDirection="column"
                alignItems="center"
                justifyContent={"center"}
                position="relative"
              >
                <Pop
                  content={EstimatProfitPop({
                    purchaseFloorPrice: activities?.purchaseFloorPrice,
                    ltv: activities?.ltv,
                    floorPrice: activities?.floorPrice,
                  })}
                >
                  <TipsIcon width={"0.14rem"} src={imgurl.market.tipsIcon} />
                </Pop>
                <Flex alignItems="center" marginBottom={"0.14rem"}>
                  <Icon
                    width="0.22rem"
                    height="0.22rem"
                    src={imgurl.home.ethBlack22}
                  />
                  <Typography fontSize="0.24rem" fontWeight="700" color="#000">
                    {activities?.purchaseFloorPrice &&
                      `${activities?.floorPrice
                        .minus(activities?.purchaseFloorPrice)
                        .toFixed(2, 1)}`}
                    {activities?.purchaseFloorPrice &&
                      ` (${activities?.floorPrice
                        .minus(activities?.purchaseFloorPrice)
                        .div(
                          activities?.floorPrice?.times(
                            new BigNumber(1).minus(
                              activities?.ltv?.div(10 ** 4) as BigNumber
                            )
                          )
                        )
                        .times(10 ** 2)
                        .toFixed(2, 1)}%)`}
                  </Typography>
                </Flex>
                <Typography
                  fontSize="0.14rem"
                  fontWeight="500"
                  color="rgba(0,0,0,.5)"
                >
                  Estimated Profit
                </Typography>
              </GridItem>

              <Grid
                gridArea={"Numerical"}
                gridTemplateColumns={"repeat(3, 1fr)"}
                background={"rgba(0,0,0,.03)"}
                border={"0.01rem solid rgba(0,0,0,.1)"}
                borderRadius={"0.1rem"}
                padding={"0.2rem 0.8rem"}
                gridGap={"0.25rem 1.2rem"}
              >
                <Flex
                  alignItems={"self-start"}
                  justifyContent={"center"}
                  flexDirection="column"
                  gap="0.1rem"
                >
                  <Flex gap="0.1rem">
                    <Typography
                      fontSize="0.14rem"
                      fontWeight="500"
                      color="rgba(0,0,0,.5)"
                    >
                      Health Factor
                    </Typography>
                    <Pop content={HealthFactorPop}>
                      <Icon width={"0.14rem"} src={imgurl.market.tipsIcon} />
                    </Pop>
                  </Flex>
                  <Typography fontSize="0.2rem" fontWeight="500" color="#000">
                    {activities?.getHealthFactor().dp(4).toString()}
                  </Typography>
                </Flex>
                <Flex
                  alignItems={"self-start"}
                  justifyContent={"center"}
                  flexDirection="column"
                  gap="0.1rem"
                >
                  <Typography
                    fontSize="0.14rem"
                    fontWeight="500"
                    color="rgba(0,0,0,.5)"
                  >
                    Floor Price
                  </Typography>
                  <Flex alignItems={"center"}>
                    <Icon
                      width="0.22rem"
                      height="0.22rem"
                      src={imgurl.home.ethBlack22}
                    />
                    <Typography fontSize="0.2rem" fontWeight="500" color="#000">
                      {activities?.floorPrice.toFixed(2, 1)}
                    </Typography>
                  </Flex>
                </Flex>
                <Flex
                  alignItems={"self-start"}
                  justifyContent={"center"}
                  flexDirection="column"
                  gap="0.1rem"
                >
                  <Flex gap="0.1rem">
                    <Typography
                      fontSize="0.14rem"
                      fontWeight="500"
                      color="rgba(0,0,0,.5)"
                    >
                      Debt
                    </Typography>
                    <Pop
                      content={DebtPop({
                        Principal: contractCalcData?.debt,
                        noInterest: TextPlaceholder,
                      })}
                    >
                      <Icon width={"0.14rem"} src={imgurl.market.tipsIcon} />
                    </Pop>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Icon
                      width="0.22rem"
                      height="0.22rem"
                      src={imgurl.home.ethBlack22}
                    />
                    <Typography fontSize="0.2rem" fontWeight="500" color="#000">
                      {" "}
                      {contractCalcData?.debtString}
                    </Typography>
                  </Flex>
                </Flex>
                <Flex
                  alignItems={"self-start"}
                  justifyContent={"center"}
                  flexDirection="column"
                  gap="0.1rem"
                >
                  <Flex gap="0.1rem">
                    <Typography
                      fontSize="0.14rem"
                      fontWeight="500"
                      color="rgba(0,0,0,.5)"
                    >
                      Vault APR
                    </Typography>

                    <Pop
                      content={VaultAprPop({
                        rewardAPR: aprData.rewardApr ?? 0,
                        interestAPR: aprData.apr / 100 ?? 0,
                      })}
                    >
                      <Icon width={"0.14rem"} src={imgurl.market.tipsIcon} />
                    </Pop>
                  </Flex>
                  <Typography
                    fontSize="0.2rem"
                    fontWeight="500"
                    color="#000"
                  >{`${(aprData.rewardApr * 100 - aprData.apr).toFixed(
                    2
                  )}%`}</Typography>
                </Flex>
                <Flex
                  alignItems={"self-start"}
                  justifyContent={"center"}
                  flexDirection="column"
                  gap="0.1rem"
                >
                  <Typography
                    fontSize="0.14rem"
                    fontWeight="500"
                    color="rgba(0,0,0,.5)"
                  >
                    Liquidation Price
                  </Typography>
                  <Flex alignItems={"center"}>
                    <Icon
                      width="0.22rem"
                      height="0.22rem"
                      src={imgurl.home.ethBlack22}
                    />
                    <Typography fontSize="0.2rem" fontWeight="500" color="#000">
                      {activities &&
                        new BigNumber(contractCalcData?.debt?.toString() || "0")
                          .div("0.9")
                          .div(10 ** 18)
                          .toFixed(2, 1)}
                    </Typography>
                  </Flex>
                </Flex>
                <Flex
                  alignItems={"self-start"}
                  justifyContent={"center"}
                  flexDirection="column"
                  gap="0.1rem"
                >
                  <Typography
                    fontSize="0.14rem"
                    fontWeight="500"
                    color="rgba(0,0,0,.5)"
                  >
                    Lending Provider
                  </Typography>
                  {activities && (
                    <Flex alignItems={"center"}>
                      <Icon
                        width="0.26rem"
                        height="0.26rem"
                        src={lendingProviderMap[activities.bankId]?.img}
                      />
                      <Typography
                        fontSize="0.2rem"
                        fontWeight="500"
                        color="#000"
                        ml="0.04rem"
                      >
                        {lendingProviderMap[activities.bankId]?.name}
                      </Typography>
                    </Flex>
                  )}
                </Flex>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box
          background={"#fff"}
          // minHeight={"60vh"}
          borderRadius={"0.1rem"}
          padding={"0.4rem 2.6rem 0.4rem 0.6rem"}
          marginTop={"0.1rem"}
        >
          <Typography
            marginBottom={"0.4rem"}
            fontSize={"0.2rem"}
            fontWeight={"700"}
            color={"#000"}
          >
            Repay
          </Typography>
          <Grid
            gridTemplateAreas='"debt pay" "factor pay""balance pay"'
            gridTemplateColumns={"3.2rem auto "}
            gridTemplateRows={"1.2rem 1.2rem 1.2rem"}
            gridGap={"0.1rem 0.7rem"}
          >
            <GridItem
              boxShadow={"0rem 0rem 0.3rem rgba(0, 0, 0, 0.05)"}
              borderRadius="0.1rem"
              gridArea={"debt"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
              gap={"0.1rem"}
              padding={"0.32rem 0"}
            >
              <Flex alignItems="center">
                {remainingDebt && (
                  <Icon
                    width="0.22rem"
                    height="0.22rem"
                    src={imgurl.home.ethBlack22}
                  />
                )}
                <Typography fontSize="0.24rem" fontWeight="700" color="#000">
                  {remainingDebt && remainingDebt.div(10 ** 18).toFixed(4, 1)}
                </Typography>
              </Flex>
              <Typography
                fontSize="0.14rem"
                fontWeight="500"
                color="rgba(0,0,0,.5)"
              >
                Remaining Debt
              </Typography>
            </GridItem>
            <GridItem
              boxShadow={"0rem 0rem 0.3rem rgba(0, 0, 0, 0.05)"}
              borderRadius="0.1rem"
              gridArea={"factor"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
              gap={"0.1rem"}
              padding={"0.32rem 0"}
            >
              <Typography fontSize="0.24rem" fontWeight="700" color="#000">
                {/* {activities &&
                  remainingDebt &&
                  (remainingDebt.eq(0)
                    ? TextPlaceholder
                    : payDebt?.eq(0)
                    ? contractCalcData?.healthFactor
                    : new BigNumber(
                        activities?.floorPrice.div(10 ** 18).toString()
                      )
                        .times("0.9")
                        .div(remainingDebt?.div(10 ** 18))
                        .toFixed(4, 1))}*/}
                {activities?.getHealthFactor().dp(4).toString()}
              </Typography>
              <Typography
                fontSize="0.14rem"
                fontWeight="500"
                color="rgba(0,0,0,.5)"
              >
                New Health Factor
              </Typography>
            </GridItem>
            <GridItem
              boxShadow={"0rem 0rem 0.3rem rgba(0, 0, 0, 0.05)"}
              borderRadius="0.1rem"
              gridArea={"balance"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
              gap={"0.1rem"}
              padding={"0.32rem 0"}
            >
              <Flex alignItems={"center"}>
                <Icon
                  width="0.22rem"
                  height="0.22rem"
                  src={imgurl.home.ethBlack22}
                />
                <Typography fontSize="0.24rem" fontWeight="700" color="#000">
                  {walletBalance &&
                    new BigNumber(walletBalance.toString())
                      .div(10 ** 18)
                      .dp(4, 1)
                      .toFixed()}
                </Typography>
              </Flex>
              <Typography
                fontSize="0.14rem"
                fontWeight="500"
                color="rgba(0,0,0,.5)"
              >
                Wallet Balance
              </Typography>
            </GridItem>
            <GridItem gridArea={"pay"} flexDirection="column">
              <Flex
                background={progressVal === 1 ? "rgba(0, 0, 0, 0.03)" : "#fff"}
                border="0.01rem solid rgba(0, 0, 0, 0.1)"
                borderRadius="0.1rem"
                padding="0 0.5rem"
                alignItems="center"
                justifyContent="space-between"
                flex="auto"
              >
                {/* max={activities?.maxDebt.div(10 ** 18).toFixed(4,1) ?? 0} */}
                <InputNumberStyled
                  controls={false}
                  min={0}
                  defaultValue={0}
                  value={inputPayDebt}
                  onChange={(e: any) => handleIptDebt(e)}
                  bordered={false}
                  precision={4}
                  disabled={progressVal === 1 ? true : false}
                />
                <Icon
                  width="0.4rem"
                  height="0.4rem"
                  src={imgurl.home.ethBlack40}
                />
              </Flex>

              <Box marginTop="0.3rem">
                <ProgressBar
                  onChange={onProgressBar}
                  value={progressVal}
                ></ProgressBar>
              </Box>

              <Flex
                minHeight={"0.9rem"}
                marginTop="0.55rem"
                flexDirection={"column"}
              >
                <Flex alignItems="center" marginBottom="0.2rem" gap="0.1rem">
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      style={{
                        width: "0.24rem",
                        height: "0.24rem",
                        cursor: "pointer",
                      }}
                      onChange={(e: any) => handleCheck(e)}
                      // _checked={checked}
                      _checked={checked}
                      // value={checked}
                    />
                    <Typography marginLeft="0.12rem" fontSize="0.14rem">
                      Repay all
                    </Typography>
                  </label>
                  {/* <input style={{width: "0.24rem", height: "0.24rem", cursor: "pointer"}} type={'checkbox'}
                       onChange={(e) => handleCheck(e)} checked={checked} id="payAll"/>
                <label style={{cursor: "pointer"}} htmlFor="payAll">Repay all</label> */}
                  <Typography
                    fontSize={"0.12rem"}
                    fontWeight={"500"}
                    color="rgba(0,0,0,.5)"
                  >
                    (Repay the whole loan to regain NFT ownership)
                  </Typography>
                </Flex>

                {checked ? (
                  <Typography color="#FF490F" fontSize="0.14rem">
                    Because of the change in interest rates, this transaction is
                    set up with a default slippage of 0.1% and a maximum
                    slippage of 0.01 ETH. All unused ETH will be returned to
                    your wallet.
                  </Typography>
                ) : null}
              </Flex>

              <Typography marginTop="0.2rem">
                <ButtonDefault
                  height="0.7rem"
                  disabled={payDebt?.eq(0) ? true : false}
                  types="normal"
                  color="#fff"
                  onClick={handleRepay}
                >
                  {progressVal === 1 ? "Repay all" : `Repay`}
                </ButtonDefault>
              </Typography>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <StyledModal
        visible={showPayment}
        footer={null}
        onCancel={() => {
          setShowPayment(false);
          setIsPayingAllDebts(false);
          setReload(!reload);
        }}
        maskClosable={false}
        destroyOnClose={true}
        width="7.48rem"
      >
        {isPayingAllDebts ? (
          <PaySuccessful
            tradeTx={tradeTx}
            activities={activities}
            setShowPayment={setShowPayment}
            setIsPayingAllDebts={setIsPayingAllDebts}
            setReload={setReload}
            reload={reload}
          />
        ) : (
          <Payment
            setTradeTx={setTradeTx}
            setIsPayingAllDebts={setIsPayingAllDebts}
            setShowPayment={setShowPayment}
            payInfo={payInfo}
            setReload={setReload}
            reload={reload}
          />
        )}
      </StyledModal>
    </Flex>
  );
}
