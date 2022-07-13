import React, {useState, useEffect} from 'react'
import {Box, Flex, Icon, Typography, Grid, GridItem} from "component/Box";
import {imgurl} from 'utils/globalimport';
import ProgressBar from 'pages/Dashboard2/components/components/ProgressBar';
import ButtonDefault from 'component/ButtonDefault'
import {DataSource, DebtData, LiquidatePrice, Record} from './StyledInterface';
import {useWeb3React} from '@web3-react/core';
import {LendPool} from 'abis/LendPool';
import {notification, message, Popover, InputNumber, Skeleton} from 'antd';
import BigNumber from 'bignumber.js';
import {fetchUser, setIsShowConnect, setShowWalletModalOpen, updateLoginState} from 'store/app';
import {SessionStorageKey} from 'utils/enums';
import http from 'utils/http';
import {getSignMessage} from 'utils/sign';
import {connectors} from 'utils/connectors';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {useNavigate, useParams} from 'react-router-dom';
import {Modal} from 'antd';
import Payment from './Payment';
import styled from 'styled-components';
import PaySuccessful from './PaySuccessful';
import {MintedNFTPop, HealthFactorPop, DebtPop, VaultAprPop, EstimatProfitPop} from 'utils/popover';
import {globalConstant} from 'utils/globalConstant';
import { injected } from 'connectors/hooks';
import { useAsync } from 'react-use';
import Checkbox from 'component/Input/Checkbox';
import { TextPlaceholder } from 'component/styled';
import { _toString } from './data';
import { Pop } from 'component/Popover/Popover';


const Banner = () => {
  return <Box
    position={"absolute"}
    height={"420px"}
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
    padding: 24px;
    line-height: 1.2 !important;
  }

  .ant-modal-header {
    display: none;
  }

  .ant-modal-close {
    display: none;
  }
`
const Cover = styled.img`
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
`

const TipsIcon = styled(Icon)`
  position: absolute;
  top: 14px;
  right: 14px;
`

const InputNumberStyled = styled(InputNumber)`
  .ant-input-number-input-wrap {
    .ant-input-number-input {
      user-select: auto;
      font-size: 30px;
      font-weight: 800;
      color: #000;
      width: inherit;
    }
  }
`

interface Result {
  createTime: string,
  id: number,
  nftAddress: string,
  neoAddress: string,
  tokenId: string,
  userAddress: string,
  imageUrl: string,
  floorPrice: BigNumber,
  collectionName: string,
  ltv: BigNumber,
  purchaseFloorPrice: BigNumber,
  status: number
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
  const {account, provider} = useWeb3React()
  const [walletBalance, setWalletBalance] = useState<BigNumber>()
  const [activities, setActivities] = useState<DataSource>()
  const [aprData, setAprData] = useState<{ apr: number, rewardApr: number }>({apr: 0, rewardApr: 0})
  const [payDebt, setPayDebt] = useState<BigNumber>(new BigNumber(0))
  const [inputPayDebt, setInputPayDebt] = useState<number>(0)
  const [remainingDebt, setRemainingDebt] = useState<BigNumber>()
  const [showPayment, setShowPayment] = useState<boolean>(false)
  const [payInfo, setPayInfo] = useState<RepaymentInformation>()
  const [isPayingAllDebts, setIsPayingAllDebts] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)
  const [tradeTx, setTradeTx] = useState<string>('')
  const action = useAppDispatch()
  const isLogin = useAppSelector(state => state.app.isLogin)
  let urlParams: any = useParams()
  const navigate = useNavigate()
  const params: { address: string, tokenId: string } = urlParams

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
    if (!account || !provider) return
    const balance = await provider.getBalance(account)
    setWalletBalance(new BigNumber(balance.toString()))
    // TODO: bignumber is not the bignumber
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
      console.log('checked',checked);
      setChecked(true)
    } else {
      setChecked(false)
    }
    const pDebt = progressVal === 1 ? activities.maxDebt : activities?.debt.times(progressVal)
    const rDebt = progressVal === 1 ? new BigNumber(0) : activities?.debt.times(1 - progressVal)
    const showDebt = +pDebt.div(10 ** 18).toFixed(4, 1)
    setPayDebt(pDebt)
    setRemainingDebt(rDebt)
    setInputPayDebt(showDebt)
    console.log('pDebt', pDebt.toFixed());

    // eslint-disable-next-line
  }, [progressVal, activities])
  let timeout: NodeJS.Timeout | null
  const onProgressBar = (e: any) => {
    if (!timeout) {
      timeout = setTimeout(function () {
        setProgressVal(e)
        timeout = null;
      }, 35);
    }
  }
  useEffect(() => {
    if (!activities) return
    if (inputPayDebt === +activities?.maxDebt.div(10 ** 18).toFixed(4, 1)) {
      setProgressVal(1)
      return
    } else if (inputPayDebt === 0) {
      setProgressVal(0)
      return
    }
    const Proportion = inputPayDebt / +activities.debt.div(10 ** 18).toFixed(4, 1)
    setProgressVal(Proportion)
    console.log('inputPayDebt', inputPayDebt);
  }, [inputPayDebt])

  const handleIptDebt = (e: string | number) => {
    if (!activities) return
    let maxDebtNum = +activities?.maxDebt.div(10 ** 18).toFixed(4, 1)
    if (e >= maxDebtNum) {
      setInputPayDebt(maxDebtNum)
    } else {
      setInputPayDebt(e as number)
    }
    if (e === null) {
      setInputPayDebt(0.000)
    }
  }

  useEffect(() => {
    if (isLogin) {
      setProgressVal(0)
      getNftActivities()
    }
    // eslint-disable-next-line
  }, [isLogin, params, account, reload])

  useAsync(async () => {
    console.log(account,isLogin)
    if (account && !isLogin) {
      console.log(`😈 ${isLogin}`)
      login2()
    } else {
      // Prevent refresh popup windows
      let walletAddress = sessionStorage.getItem(SessionStorageKey.WalletAuthorized)
      if (!account && !walletAddress) {
        setTimeout(() => {
          action(setIsShowConnect(true)) // Popover
        },500)
        // action(setShowWalletModalOpen(true)) // modal
      }
    }
    // eslint-disable-next-line
  }, [account, isLogin])

  async function login2() {
    if (!provider) return
    try {
      let address = account!
      let msg = getSignMessage(address);
      let signatureMsg = await provider.getSigner(account).signMessage(msg)
      const loginRep: any = await http.myPost("/npics-auth/app-api/v2/auth/token", {
        "address": address,
        "original": msg,
        "signature": signatureMsg
      })
      if (loginRep.code === 200) {
        sessionStorage.setItem(SessionStorageKey.AccessToken, loginRep.data)
        action(updateLoginState())
        // action(setIsLogin(true))
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
    } else if (0 < factor && factor < 1) {
      return 'In Liquidation'
    } else if (factor <= 0) {
      return 'Terminated'
    }
    return ''
  }

  const getNftActivities = async () => {
    if (!params || !provider) return
    const url = "/npics-nft/app-api/v1/neo/getRecordById"
    const parameter = {
      tokenId: params.tokenId,
      nftAddress: params.address,
    }
    try {
      const result: any = await http.myPost(url, parameter)
      let orgData: Result = result.data
      if (result.code === 200 && orgData) {
        const signer = provider.getSigner(account)
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
          debtString: new BigNumber(newArray.debtData.totalDebt.toString()).div(10 ** 18).toFixed(4, 1) || TextPlaceholder,
          // debtString: '13.14' || TextPlaceholder,
          debt: new BigNumber(newArray.debtData.totalDebt.toString()),
          // debt: new BigNumber('13140000000000000000'),
          maxDebt: new BigNumber(newArray.debtData.totalDebt.toString()).plus(slippage(new BigNumber(newArray.debtData.totalDebt.toString()))),
          // maxDebt: new BigNumber("14440000000000000000"),
          liquidationPrice: new BigNumber(newArray.liquidatePrice.liquidatePrice.toString()).div(10 ** 18).toFixed(4, 1) || TextPlaceholder,
          // liquidationPrice: '5.82' || TextPlaceholder,
          healthFactor: new BigNumber(newArray.debtData.healthFactor.toString()).div(10 ** 18).toFixed(4, 1) || TextPlaceholder,
          status: newArray.status,
          statusSrt: turnStr(newArray.debtData.healthFactor),
          address: newArray.nftAddress,
          neoAddress: newArray.neoAddress,
          tokenId: newArray.tokenId,
          imageUrl: newArray.imageUrl,
          floorPrice: new BigNumber(newArray.floorPrice),
          // floorPrice: new BigNumber(10800000000000000000),
          collectionName: newArray.collectionName,
          purchaseFloorPrice: new BigNumber(newArray.purchaseFloorPrice),
          ltv: new BigNumber(newArray.ltv),
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
    padding={"0 160px"}
    background={"transparent"}
    marginBottom={"160px"}
  >
    <Banner/>
    <Box
      zIndex={1}
    >
      <Flex
        marginTop={"214px"}
        marginBottom={"30px"}
        gap={"20px"}
        alignItems={"center"}
      >
        {/*<Icon width='36px' height='36px' src={imgurl.dashboard.reback} />*/}
        <div style={{cursor: 'pointer'}}><Icon width='36px' height='36px' src={imgurl.dashboard.reback}
                                               onClick={goBack}/></div>
        <Typography fontSize={"30px"} fontWeight={"800"} color={"#fff"}>Repay</Typography>
      </Flex>

      <Box
        background={"#fff"}
        // minHeight={"60vh"}
        borderRadius={"10px"}
        padding={"40px 60px"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDirection={"column"}>
            <Typography fontSize={"20px"} fontWeight={"700"} color={"#000"}>Vault Detail</Typography>
            <Flex alignItems={"center"} marginRight="5px">
              <Typography marginRight="7px" fontSize={"14px"} fontWeight={"500"}
                          color={"rgba(0,0,0,.5)"}>Asset:</Typography>
              <Flex alignItems={'center'}>
                <Typography marginRight={'10px'} fontSize={"14px"} fontWeight={"500"} color={"rgba(0,0,0,.5)"}>
                  {activities && `${_toString(activities?.collectionName) ?? TextPlaceholder} #${activities?.tokenId ?? TextPlaceholder}`}
                </Typography>
                <Icon style={{cursor: "pointer"}} width="14px" height="14px" src={imgurl.dashboard.export14} alt=""
                      onClick={() => window.open(`https://etherscan.io/nft/${activities?.address}/${activities?.tokenId}`)}/>
              </Flex>
            </Flex>
          </Flex>
          <Flex alignItems={"center"} background={"#fff"} boxShadow={"0 0 20px rgba(0,0,0,.1)"} borderRadius={"10px"}
                gap={"12px"} padding={"11px"}>
            {/* <Typography fontSize={"14px"} fontWeight={"500"} color={"#000"}>Status</Typography> */}
            <Typography fontSize={"16px"} fontWeight={"700"}
                        color={activities?.statusSrt === "Inforce" ? "#7BD742" : "#FF4949"}>{activities?.statusSrt}</Typography>
          </Flex>
        </Flex>

        <Grid
          marginTop={"30px"}
          gridTemplateColumns={"340px auto"}

          gridGap={"30px"}
        >
          {/* <Icon style={{borderRadius: '10px', background: "#e5e5e5"}} width='340px' height='340px'
                src={activities?.imageUrl ?? ""}/> */}
          <Grid>
            {
              activities?.imageUrl ?
                <Cover src={activities?.imageUrl} /> :
                <Skeleton.Image style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
            }
          </Grid>
          <Grid
            gridTemplateAreas='"Minted Profit" "Numerical Numerical"'
            gridGap={"10px"}
          >
            <GridItem
              background={"#fff"}
              boxShadow={"0 0 20px rgba(0,0,0,.1)"}
              borderRadius={"10px"}
              gridArea={'Minted'}
              padding={"25px 0"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
              position={"relative"}
            >
              <Pop
                content={MintedNFTPop}>
                <TipsIcon width={"14px"} src={imgurl.market.tipsIcon}/>
              </Pop>
              <Flex alignItems={'center'} marginBottom={"12px"}>
                <Typography marginRight={'10px'} fontSize="24px" fontWeight='700' color="#000">
                  {activities && `NEO ${_toString(activities?.collectionName) ?? TextPlaceholder} #${activities?.tokenId ?? TextPlaceholder}`}
                </Typography>
                <Icon style={{cursor: "pointer"}} width="16px" height="16px" src={imgurl.dashboard.export14} alt=""
                      onClick={() => {
                        if (!activities) return
                        window.open(`https://cn.etherscan.com/nft/${activities.neoAddress}/${activities.tokenId}`)
                      }}/>
              </Flex>
              <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">NEO NFT</Typography>
            </GridItem>
            <GridItem
              background={"#fff"}
              boxShadow={"0 0 20px rgba(0,0,0,.1)"}
              borderRadius={"10px"}
              gridArea={'Profit'}
              padding={"25px 0"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
              position="relative"
            >
              <Pop
                content={EstimatProfitPop({
                  purchaseFloorPrice: activities?.purchaseFloorPrice,
                  ltv: activities?.ltv,
                  floorPrice: activities?.floorPrice
                })}>
                <TipsIcon width={"14px"} src={imgurl.market.tipsIcon}/>
              </Pop>
              <Flex alignItems="center" marginBottom={"14px"}>
                <Icon width='22px' height='22px' src={imgurl.home.ethBlack22}/>
                <Typography fontSize="24px" fontWeight='700' color="#000">
                  {activities?.purchaseFloorPrice && `${activities?.floorPrice.minus(activities?.purchaseFloorPrice).div(10 ** globalConstant.bit).toFixed(2, 1)}`}
                  {activities?.purchaseFloorPrice && ` (${activities?.floorPrice.minus(activities?.purchaseFloorPrice).div(activities?.purchaseFloorPrice?.times(new BigNumber(1).minus(activities?.ltv?.div(10 ** 4) as BigNumber))).times(10 ** 2).toFixed(2, 1)}%)`}
                </Typography>
              </Flex>
              <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">Estimated Profit</Typography>
            </GridItem>

            <Grid
              gridArea={'Numerical'}
              gridTemplateColumns={"repeat(3, 1fr)"}
              background={"rgba(0,0,0,.03)"}
              border={"1px solid rgba(0,0,0,.1)"}
              borderRadius={"10px"}
              padding={"20px 150px"}
              gridGap={"25px 150px"}
            >
              <Flex alignItems={"self-start"} justifyContent={"center"} flexDirection="column" gap='10px'>
                <Flex gap="10px">
                  <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">Health Factor</Typography>
                  <Pop 
                    content={HealthFactorPop}>
                    <Icon width={"14px"} src={imgurl.market.tipsIcon}/>
                  </Pop>

                </Flex>
                <Typography fontSize="20px" fontWeight='500' color="#000">{activities?.healthFactor}</Typography>
              </Flex>
              <Flex alignItems={"self-start"} justifyContent={"center"} flexDirection="column" gap='10px'>
                <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">Floor Price</Typography>
                <Flex alignItems={'center'}>
                  <Icon width='22px' height='22px' src={imgurl.home.ethBlack22}/>
                  <Typography fontSize="20px" fontWeight='500'
                              color="#000">{activities?.floorPrice.div(10 ** globalConstant.bit).toFixed(2, 1)}</Typography>
                </Flex>
              </Flex>
              <Flex alignItems={"self-start"} justifyContent={"center"} flexDirection="column" gap='10px'>
                <Flex gap="10px">
                  <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">Debt</Typography>
                  <Pop 
                    content={DebtPop({Principal: activities?.debt, noInterest: TextPlaceholder})}>
                    <Icon width={"14px"} src={imgurl.market.tipsIcon}/>
                  </Pop>

                </Flex>
                <Flex alignItems={'self-start'}>
                  <Icon width='22px' height='22px' src={imgurl.home.ethBlack22}/>
                  <Typography fontSize="20px" fontWeight='500' color="#000">  {activities?.debtString}</Typography>
                </Flex>
              </Flex>
              <Flex alignItems={"self-start"} justifyContent={"center"} flexDirection="column" gap='10px'>
                <Flex gap="10px">
                  <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">Vault APR</Typography>

                  <Pop
                    content={VaultAprPop({rewardAPR: (aprData.rewardApr ?? 0), interestAPR: aprData.apr / 100 ?? 0})}>
                    <Icon width={"14px"} src={imgurl.market.tipsIcon}/>
                  </Pop>

                </Flex>
                <Typography fontSize="20px" fontWeight='500'
                            color="#000">{`${(aprData.rewardApr * 100 - aprData.apr).toFixed(2)}%`}</Typography>
              </Flex>
              <Flex alignItems={"self-start"} justifyContent={"center"} flexDirection="column" gap='10px'>
                <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">Liquidation Price</Typography>
                <Flex alignItems={'center'}>
                  <Icon width='22px' height='22px' src={imgurl.home.ethBlack22}/>
                  <Typography fontSize="20px" fontWeight='500'
                              color="#000">{activities && new BigNumber(activities?.debt.toString()).div('0.9').div(10 ** 18).toFixed(2, 1)}</Typography>
                </Flex>
              </Flex>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        background={"#fff"}
        // minHeight={"60vh"}
        borderRadius={"10px"}
        padding={"40px 260px 40px 60px"}
        marginTop={"10px"}
      >
        <Typography marginBottom={"40px"} fontSize={"20px"} fontWeight={"700"} color={"#000"}>Repay</Typography>
        <Grid
          gridTemplateAreas='"debt pay" "factor pay""balance pay"'
          gridTemplateColumns={"320px auto "}
          gridTemplateRows={"120px 120px 120px"}
          gridGap={"10px 70px"}
        >
          <GridItem
            boxShadow={"0px 0px 30px rgba(0, 0, 0, 0.05)"}
            borderRadius="10px"
            gridArea={'debt'}
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={"10px"}
            padding={"32px 0"}
          >
            <Flex alignItems="center">
              {remainingDebt && <Icon width='22px' height='22px' src={imgurl.home.ethBlack22}/>}
              <Typography fontSize="24px" fontWeight='700' color="#000">
                {remainingDebt && remainingDebt.div(10 ** 18).toFixed(4, 1)}
              </Typography>
            </Flex>
            <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">Remaining Debt</Typography>
          </GridItem>
          <GridItem
            boxShadow={"0px 0px 30px rgba(0, 0, 0, 0.05)"}
            borderRadius="10px"
            gridArea={'factor'}
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={"10px"}
            padding={"32px 0"}
          >
            <Typography fontSize="24px" fontWeight='700' color="#000">
              {
                activities &&
                remainingDebt &&
                (remainingDebt.eq(0) ?
                  TextPlaceholder :
                  payDebt?.eq(0) ?
                    activities?.healthFactor :
                    new BigNumber(activities?.floorPrice.div(10 ** 18).toString()).times('0.9').div(remainingDebt?.div(10 ** 18)).toFixed(4, 1))
              }
            </Typography>
            <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">New Health Factor</Typography>
          </GridItem>
          <GridItem
            boxShadow={"0px 0px 30px rgba(0, 0, 0, 0.05)"}
            borderRadius="10px"
            gridArea={'balance'}
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={"10px"}
            padding={"32px 0"}
          >
            <Flex alignItems={"center"}>
              <Icon width='22px' height='22px' src={imgurl.home.ethBlack22}/>
              <Typography fontSize="24px" fontWeight='700'
                          color="#000">{walletBalance && new BigNumber(walletBalance.toString()).div(10 ** 18).dp(4, 1).toFixed()}</Typography>
            </Flex>
            <Typography fontSize="14px" fontWeight='500' color="rgba(0,0,0,.5)">Wallet Balance</Typography>
          </GridItem>
          <GridItem gridArea={'pay'} flexDirection="column">
            <Flex
              background={progressVal === 1 ? "rgba(0, 0, 0, 0.03)" : "#fff"}
              border="1px solid rgba(0, 0, 0, 0.1)"
              borderRadius="10px"
              padding="30px 50px"
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
                onChange={(e) => handleIptDebt(e)} 
                bordered={false} precision={4}
                disabled={progressVal === 1 ? true : false }           
              />
              <Icon width='40px' height='40px' src={imgurl.home.ethBlack40}/>
            </Flex>

            <Box marginTop="30px">
              <ProgressBar
                onChange={onProgressBar}
                value={progressVal}
              ></ProgressBar>
            </Box>

            <Flex minHeight={'90px'} marginTop="55px" flexDirection={'column'}>
              <Flex alignItems="center" marginBottom="20px" gap='10px'>
                <label style={{display:'flex',alignItems:'center'}}>
                  <Checkbox 
                    style={{width: "24px", height: "24px", cursor: "pointer"}}
                    onChange={(e:any) => handleCheck(e)}
                    // _checked={checked}
                    _checked={checked}
                    // value={checked}
                  />
                  <Typography marginLeft="12px" fontSize="14px">Repay all</Typography>
                </label>
                {/* <input style={{width: "24px", height: "24px", cursor: "pointer"}} type={'checkbox'}
                       onChange={(e) => handleCheck(e)} checked={checked} id="payAll"/>
                <label style={{cursor: "pointer"}} htmlFor="payAll">Repay all</label> */}
                <Typography fontSize={"12px"} fontWeight={"500"} color="rgba(0,0,0,.5)">(Repay the whole loan to
                  regain NFT ownership)</Typography>
              </Flex>

              {
                checked ? <Typography color="#FF490F" fontSize="14px">
                  Because of the change in interest rates, this transaction is set up with a default slippage of 0.1%
                  and a maximum slippage of 0.01 ETH.
                  All unused ETH will be returned to your wallet.
                </Typography> : null
              }
            </Flex>


            <Typography marginTop="20px">
              <ButtonDefault height='70px' disabled={payDebt?.eq(0) ? true : false} types='normal' color='#fff'
                             onClick={handleRepay}>{progressVal === 1 ? 'Repay all' :`Repay`}</ButtonDefault>
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
      maskClosable={false}
      destroyOnClose={true}
      width='748px'
    >
      {
        isPayingAllDebts ?
          <PaySuccessful tradeTx={tradeTx} activities={activities} setShowPayment={setShowPayment}
                         setIsPayingAllDebts={setIsPayingAllDebts} setReload={setReload} reload={reload}/> :
          <Payment
            setTradeTx={setTradeTx}
            setIsPayingAllDebts={setIsPayingAllDebts}
            setShowPayment={setShowPayment}
            payInfo={payInfo}
            setReload={setReload}
            reload={reload}
          />
      }
    </StyledModal>

  </Flex>
}