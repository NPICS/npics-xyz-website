import React, { useState, useEffect } from 'react'
import { Box, Flex, Icon, Typography, Grid, GridItem } from "component/Box";
import { imgurl } from 'utils/globalimport';
import ProgressBar from 'pages/Dashboard/components/components/ProgressBar';
import ButtonDefault from 'component/ButtonDefault'
import { DataSource, DebtData, LiquidatePrice, Record } from './Tableutils';
import { useWeb3React } from '@web3-react/core';
import { LendPool } from 'abi/LendPool';
import { notification, message } from 'antd';
import BigNumber from 'bignumber.js';
import { fetchUser, setIsLogin } from 'store/app';
import { SessionStorageKey } from 'utils/enums';
import http from 'utils/http';
import { getSignMessage } from 'utils/sign';
import { connectors } from 'utils/connectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import Payment from './Payment';
import styled from 'styled-components';
import PaySuccessful from './PaySuccessful';
const Banner = () => {
  return <Box
    position={"absolute"}
    height={"4.2rem"}
    top={0}
    left={0}
    right={0}
    zIndex={0}
    background={"#1a1a1a"}
  ></Box>
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
  }
  .ant-modal-body {
    padding: .24rem;
    line-height: 1.2 !important;
  }
  .ant-modal-header {
    display: none;
  }
  .ant-modal-close {
    display: none;
  }
`

interface Result {
  createTime: string,
  id: number,
  nftAddress: string,
  tokenId: string,
  userAddress: string,
  imageUrl: string,
  floorPrice: string,
  collectionName: string,
}

interface RepaymentInformation {
  address: string,
  tokenId: string,
  progressVal: number,
  payDebt: BigNumber
}

export default function VaultsDetail() {
  const [progressVal, setProgressVal] = useState<number>(0)
  const [checked, setChecked] = useState<boolean>(false)
  const { activate, account, library } = useWeb3React()
  const [walletBalance, setWalletBalance] = useState<BigNumber>()
  const [activities, setActivities] = useState<DataSource>()
  const [aprData, setAprData] = useState<{ apr: number, rewardApr: number }>({ apr: 0, rewardApr: 0 })
  const [payDebt, setPayDebt] = useState<BigNumber>()
  const [remainingDebt, setRemainingDebt] = useState<BigNumber>()
  const [showPayment, setShowPayment] = useState<boolean>(false)
  const [payInfo, setPayInfo] = useState<RepaymentInformation>()
  const [isPayingAllDebts,setIsPayingAllDebts] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)

  const action = useAppDispatch()
  const isLogin = useAppSelector(state => state.app.isLogin)
  let urlParams: any = useParams()
  const navigate = useNavigate() 
  const params:{address:string, tokenId: string} = urlParams

  useEffect(() => {
    // get thw arp
    http.myPost("/npics-nft/app-api/v2/nfthome/getAprInfo", {}).then((resp) => {
      let _resp = resp as any;
      if (_resp.code === 200) {
        setAprData({
          apr: parseFloat(_resp.data.apr) || 0,
          rewardApr: parseFloat(_resp.data.rewardApr) || 0
        })
      }
    })
  }, [])
  useEffect(() => {
    getBalance()
    // eslint-disable-next-line
  }, [account])

  const getBalance = async () => {
    if (!account) return
    const balance = await library.getBalance(account)
    setWalletBalance(balance)
  }

  useEffect(() => {
    if (checked) {
      setProgressVal(1)
    } else {
      setProgressVal(0)
    }
    // eslint-disable-next-line
  }, [checked])
  useEffect(() => {
    if (!activities) return
    if (progressVal === 1) {
      setChecked(true)
    } else {
      setChecked(false)
    }
    const pDebt = progressVal === 1 ? activities.maxDebt : activities?.debt.times(progressVal)
    const rDebt = progressVal === 1 ? new BigNumber(0) : activities?.debt.times(1 - progressVal)
    setPayDebt(pDebt)
    setRemainingDebt(rDebt)

    // eslint-disable-next-line
  }, [progressVal,activities])

  useEffect(() => {
    let token = sessionStorage.getItem("ACCESS_TOKEN")
    if (!token) {
      // login()
    }
    // eslint-disable-next-line
  }, [account])

  useEffect(() => {
    if (isLogin) {
      setProgressVal(0)
      getNftActivities()
    }
    // eslint-disable-next-line
  }, [isLogin,params,account,reload])

  useEffect(() => {
    if (account && !isLogin) {
      login2()
      console.log(`😈 ${isLogin}`)
    } else {
      if (!account) {
        activate(connectors.injected, (e) => {
          if (e.name === "UnsupportedChainIdError") {
            sessionStorage.removeItem(SessionStorageKey.WalletAuthorized)
            action(fetchUser(`{}`))
            notification.error({ message: "Prompt connection failed, please use the Ethereum network" })
          }
        })
      }
    }
    // eslint-disable-next-line
  }, [account, isLogin])

  async function login2() {
    try {
      let address = account!
      let msg = getSignMessage(address);
      let signatureMsg = await library.getSigner(account).signMessage(msg)
      const loginRep: any = await http.myPost("/npics-auth/app-api/v2/auth/token", {
        "address": address,
        "original": msg,
        "signature": signatureMsg
      })
      if (loginRep.code === 200) {
        sessionStorage.setItem("ACCESS_TOKEN", loginRep.data)
        action(setIsLogin(true))
      } else {
        message.warning('Signing failed')
      }
    } catch (e) {
      console.log(`Login Erro => ${e}`)
    }
  }

  const turnStr = (val: BigNumber) => {
    let factor = +(new BigNumber(val.toString()).div(10 ** 18).dp(0).toString())
    if (factor >= 1.5) {
      return 'Inforce'
    } else if (factor >= 1 && factor < 1.5) {
      return 'In Risk'
    } else if (factor < 1) {
      return 'Terminated'
    }
    return ''
  }

  const getNftActivities = async () => {
    if(!params) return
    const url = "/npics-nft/app-api/v1/neo/getRecordById"
    const parameter = {
      tokenId: params.tokenId,
      nftAddress: params.address,
    }
    try {
      const result: any = await http.myPost(url,parameter)
      let orgData: Result = result.data
      // let address = "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e"
      // let neoId = '2595'
      if (result.code === 200 && orgData) {
        const signer = library.getSigner(account)
        let lendPool = new LendPool(signer)
        const values1: DebtData = await lendPool.getNftDebtData(params.address, params.tokenId)
        const values2: LiquidatePrice = await lendPool.getNftLiquidatePrice(params.address, params.tokenId)
        let newArray: Record
        newArray = {
          debtData: values1,
          liquidatePrice: values2,
          ...orgData
        }

        const slippage = (data: BigNumber) => {
          let val = BigNumber.minimum(data.multipliedBy(new BigNumber('0.001')), new BigNumber('0.01').multipliedBy(10 ** 18))
          return val
        }

        let dataSource: DataSource
        dataSource = {
          key: 'nft-detail',
          items: newArray.tokenId,
          contract: newArray.tokenId,
          debtString: new BigNumber(newArray.debtData.totalDebt.toString()).div(10 ** 18).toFixed(4, 1) || `--`,
          debt: new BigNumber(newArray.debtData.totalDebt.toString()),
          maxDebt: new BigNumber(newArray.debtData.totalDebt.toString()).plus(slippage(new BigNumber(newArray.debtData.totalDebt.toString()))),
          liquidationPrice: new BigNumber(newArray.liquidatePrice.liquidatePrice.toString()).div(10 ** 18).toFixed(4, 1) || "--",
          healthFactor: new BigNumber(newArray.debtData.healthFactor.toString()).div(10 ** 18).toFixed(4, 1) || "--",
          status: new BigNumber(newArray.debtData.healthFactor.toString()).div(10 ** 18).toFixed(4, 1) || "--",
          statusSrt: turnStr(newArray.debtData.healthFactor),
          address: newArray.nftAddress,
          tokenId: newArray.tokenId,
          imageUrl: newArray.imageUrl,
          floorPrice: newArray.floorPrice,
          collectionName: newArray.collectionName,
        }
        setActivities(dataSource)
      }
    } catch (e) {
      console.error(`Error => ${e}`)
    }
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }
  const onProgressBar = (e: any) => {
    setProgressVal(e)
  }
  const goBack = () => {
    navigate("/dashboard/vaults")
  }
  const handleRepay = () => {
    let object = {
      address: activities?.address as string,
      tokenId: activities?.tokenId as string,
      progressVal: progressVal,
      payDebt: payDebt as BigNumber
    }
    setPayInfo(object)
    setShowPayment(true)
  }

  return <Flex
    position={"relative"}
    flexDirection={"column"}
    padding={"0 1.6rem"}
    background={"transparent"}
    marginBottom={"1.6rem"}
  >
    <Banner />
    <Box
      zIndex={1}
    >
      <Flex
        marginTop={"2.14rem"}
        marginBottom={".1rem"}
        gap={".2rem"}
        alignItems={"center"}
      >
        {/*<Icon width='.36rem' height='.36rem' src={imgurl.dashboard.reback} />*/}
        <div style={{cursor: 'pointer'}}><Icon width='.36rem' height='.36rem' src={imgurl.dashboard.reback} onClick={goBack}/></div>
        <Typography fontSize={".3rem"} fontWeight={"800"} color={"#fff"}>Repay</Typography>
      </Flex>

      <Box
        background={"#fff"}
        minHeight={"60vh"}
        borderRadius={"10px"}
        padding={".4rem .6rem"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDirection={"column"}>
            <Typography fontSize={".2rem"} fontWeight={"700"} color={"#000"}>Vault Detail</Typography>
            <Flex alignItems={"center"}>
              <Typography fontSize={".16rem"} fontWeight={"500"} color={"rgba(0,0,0,.5)"} marginRight=".05rem">Asset:</Typography>
              <Typography fontSize={".16rem"} fontWeight={"500"} color={"rgba(0,0,0,.5)"}>
                {`${activities?.collectionName ?? '--'} # ${activities?.tokenId ?? '--'}`}
              </Typography>
            </Flex>
          </Flex>
          <Flex alignItems={"center"} background={"#fff"} boxShadow={"0 0 20px rgba(0,0,0,.1)"} borderRadius={"10px"} gap={".12rem"} padding={".11rem"}>
            <Typography fontSize={".14rem"} fontWeight={"500"} color={"#000"}>Status</Typography>
            <Typography fontSize={".16rem"} fontWeight={"700"} color={activities?.statusSrt === "Inforce"? "#7BD742" :"#FF4949"}>{activities?.statusSrt}</Typography>
          </Flex>
        </Flex>

        <Grid
          marginTop={".3rem"}
          gridTemplateColumns={"3.4rem auto"}
          gridGap={".3rem"}
        >
          <Icon borderRadius={"10px"} width='3.4rem' height='3.4rem' src={activities?.imageUrl ?? "https://tva1.sinaimg.cn/large/e6c9d24egy1h3g0c8ugwqj20v50jhgrr.jpg"} />
          <Grid
            gridTemplateAreas='"Minted Profit" "Numerical Numerical"'
            gridGap={".1rem"}
          >
            <GridItem
              background={"#fff"}
              boxShadow={"0 0 0 3px rgba(0,0,0,.05)"}
              borderRadius={"10px"}
              gridArea={'Minted'}
              padding={".3rem 0"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
            >
              <Typography marginBottom={".14rem"}>{`NEO-${activities?.collectionName ?? '--'} # ${activities?.tokenId ?? '--'}`}</Typography>
              <Typography>Minted-NFT</Typography>
            </GridItem>
            <GridItem
              background={"#fff"}
              boxShadow={"0 0 0 3px rgba(0,0,0,.05)"}
              borderRadius={"10px"}
              gridArea={'Profit'}
              padding={".3rem 0"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
            >
              <Typography marginBottom={".14rem"}>{activities?.liquidationPrice}</Typography>
              <Typography>Estimat Profit</Typography>
            </GridItem>

            <Grid
              gridArea={'Numerical'}
              gridTemplateColumns={"repeat(3, 1fr)"}
              background={"rgba(0,0,0,.03)"}
              border={"1px solid rgba(0,0,0,.1)"}
              borderRadius={"10px"}
              padding={".32rem 1.5rem"}
              gridGap={".4rem 1.3rem"}
            >
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Health factor</Typography>
                <Typography>{activities?.healthFactor}</Typography>
              </Flex>
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Floor price</Typography>
                <Typography>{activities?.healthFactor}</Typography>
              </Flex>
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Debt</Typography>
                <Typography>{activities?.debtString}</Typography>
              </Flex>
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Vault APR</Typography>
                <Typography>{`${(aprData.rewardApr*100 - aprData.apr).toFixed(2)}%`}</Typography>
              </Flex>
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Liquidation Price</Typography>
                <Typography>{activities && new BigNumber(activities?.debt.toString()).div('0.9').div(10 ** 18).toFixed(2, 1)}</Typography>
              </Flex>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        background={"#fff"}
        minHeight={"60vh"}
        borderRadius={"10px"}
        padding={".4rem .6rem"}
        marginTop={".1rem"}
      >
        <Typography marginBottom={".4rem"} fontSize={".2rem"} fontWeight={"700"} color={"#000"}>Repay</Typography>
        <Grid
          gridTemplateAreas='"debt pay" "factor pay""balance pay"'
          gridTemplateColumns={"3.2rem auto "}
          gridGap={".1rem .7rem"}
        >
          <GridItem
            boxShadow={"0px 0px 30px rgba(0, 0, 0, 0.05)"}
            borderRadius="10px"
            gridArea={'debt'}
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={".1rem"}
            padding={".32rem 0"}
          >
            <Typography>{remainingDebt && remainingDebt.div(10 ** 18).toFixed(4, 1)}</Typography>
            <Typography>Remaining debt</Typography>
          </GridItem>
          <GridItem
            boxShadow={"0px 0px 30px rgba(0, 0, 0, 0.05)"}
            borderRadius="10px"
            gridArea={'factor'}
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={".1rem"}
            padding={".32rem 0"}
          >
            <Typography>
              {
                activities &&
                remainingDebt &&
                (remainingDebt.eq(0) ?
                  '--' :
                  payDebt?.eq(0) ?
                    activities?.healthFactor :
                    new BigNumber(activities?.floorPrice.toString()).times('0.9').div(remainingDebt?.div(10 ** 18)).toFixed(4, 1))
              }
            </Typography>
            <Typography>New health factor</Typography>
          </GridItem>
          <GridItem
            boxShadow={"0px 0px 30px rgba(0, 0, 0, 0.05)"}
            borderRadius="10px"
            gridArea={'balance'}
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={".1rem"}
            padding={".32rem 0"}
          >
            <Flex alignItems={"center"}>
            {walletBalance && new BigNumber(walletBalance.toString()).div(10 ** 18).dp(4, 1).toFixed()}
              <Icon width='.22rem' height='.22rem' src={imgurl.home.ethBlack22} />
            </Flex>
            <Typography>Wallet balance</Typography>
          </GridItem>
          <GridItem gridArea={'pay'} flexDirection="column">
            <Flex
              background="rgba(0, 0, 0, 0.03)"
              border="1px solid rgba(0, 0, 0, 0.1)"
              borderRadius="10px"
              padding=".31rem .5rem"
              alignItems="center"
              justifyContent="space-between"
              flex="auto"
            >
              <Typography fontSize={".3rem"} fontWeight={"800"} color={"#000"}>{payDebt && payDebt.div(10 ** 18).toFixed(4, 1) || 0}</Typography>
              <Icon width='.4rem' height='.4rem' src={imgurl.home.ethBlack40} />
            </Flex>

            <Box marginTop=".36rem">
              <ProgressBar
                onChange={onProgressBar}
                value={progressVal}
              ></ProgressBar>
            </Box>

            <Box minHeight={'1rem'} marginTop=".3rem">
              <Flex alignItems="center" marginBottom=".3rem" gap='.1rem'>
                <input style={{ width: ".24rem", height: ".24rem", cursor: "pointer" }} type={'checkbox'} onChange={(e) => handleCheck(e)} checked={checked} id="payAll" />
                <label style={{ cursor: "pointer" }} htmlFor="payAll">Repay all</label>
                <Typography fontSize={".16rem"} fontWeight={"500"} color="rgba(0,0,0,.5)" >(Repay the whole loan to regain NFT ownership)</Typography>
              </Flex>

              {
                checked ? <Typography color="#FF490F">
                  Because of the change in interest rates, this transaction is set up with a default slippage of 0.1% and a maximum slippage of 0.01 ETH.
                  All unused ETH will be returned to your wallet.
                </Typography> : null
              }
            </Box>


            <Typography marginTop=".3rem">
              <ButtonDefault disabled={payDebt?.eq(0) ? false : false} types='normal' color='#fff' onClick={handleRepay}>Repay</ButtonDefault>
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
        setReload(!reload)
      }}
      destroyOnClose={true}
      width='7.48rem'
    >
      {
        isPayingAllDebts ? 
        <PaySuccessful setShowPayment={setShowPayment} setIsPayingAllDebts={setIsPayingAllDebts} setReload={setReload} reload={reload}/> :
        <Payment setIsPayingAllDebts={setIsPayingAllDebts} setShowPayment={setShowPayment} payInfo={payInfo} setReload={setReload} reload={reload}/>
      }
    </StyledModal>

  </Flex>
}