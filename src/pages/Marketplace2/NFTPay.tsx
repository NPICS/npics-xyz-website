import {Box, Button2, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import ethIcon from "../../assets/images/market/eth_icon_20x34.png"
import payTypeSelectedIcon from "../../assets/images/market/nft_pay_type_selected.png"
import {useEffect, useState} from "react";
import {CollectionDetail} from "../../model/user";
import BigNumber from "bignumber.js";
import downPayIcon from "../../assets/images/market/down_pay_icon.png"
import {numberFormat, urls} from "../../utils/urls";
import {Erc20} from "../../abis/Erc20";
import {ContractAddresses} from "../../utils/addresses";
import {useWeb3React} from "@web3-react/core";
import http from "../../utils/http";
import {message, notification} from "antd";
import {Npics} from "../../abis/Npics";
import Modal from "../../component/Modal";
import NFTPayProgressing from "./NFTPayProgressing";
import NFTPayCongratulations, {AttrLink} from "./NFTPayCongratulations";
import NFTPayWrong from "./NFTPayWrong";
import {useAsync} from "react-use";
import { TextPlaceholder } from "component/styled";
import wethIcon from "../../assets/images/market/weth_icon.svg"
import Checkbox from "../../component/Input/Checkbox";

export function PopupTitle(props: {
  title: string,
  canClose: boolean
}) {
  return <Flex
    alignItems={"center"}
    justifyContent={"center"}
  >
    <Typography
      fontWeight={800}
      fontSize={"30px"}
      color={"#000"}
    >{props.title}</Typography>
  </Flex>
}

const Cover = styled.img`
  display: block;
  background: #eee;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

function PayTypeButton(props: {
  isSelected: boolean,
  isEth: boolean,
  name: string,
  balance: string
  tap(): void
}) {
  return <Flex
    borderRadius={"10px"}
    padding={"25px 40px"}
    background={props.isSelected ? `#7BD742` : `#fff`}
    border={`1px solid ${props.isSelected ? "#7BD742" : "#e5e5e5"}`}
    alignItems={"center"}
    style={{
      "cursor": "pointer",
      "userSelect": "none"
    }}
    onClick={props.tap}
  >
    <Icon
      width={"20px"}
      height={"14px"}
      src={payTypeSelectedIcon}
      style={{
        "display": props.isSelected ? "block" : "none"
      }}
    />
    <Typography
      fontSize={"18px"}
      fontWeight={500}
      color={"#000"}
      marginLeft={"10px"}
    >{props.name}</Typography>
    <Flex flex={1}></Flex>
    <Icon width={"12px"} height={"19px"} src={props.isEth ? ethIcon : wethIcon}/>
    <Typography
      fontSize={"20px"}
      fontWeight={500}
      color={"#000"}
      marginLeft={"10px"}
    >{props.balance}</Typography>
  </Flex>
}

enum PayType {
  None,
  ETH = 1 << 0,
  WETH = 1 << 1
}

export const CancelButton = styled.button`
  variance: "secondary";
  border: 1px solid #00000033;
  background: #fff;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  height: 52px;
  min-width: 200px;
  cursor: pointer;
`

export const ConfirmButton = styled(Button2)`
  cursor: pointer;
  height: 52px;
  min-width: 200px;
  font-size: 16px;
  font-weight: 700;
`

export default function NFTPay(props: {
  nft: CollectionDetail
  availableBorrow: BigNumber
  actualAmount: BigNumber
  progressBlock?(): void
  resultBlock?(result: boolean, hash?: string): void
  cancelBlock?(): void
  // dismiss?(): void
}) {
  const [payType, setPayType] = useState<PayType>(PayType.ETH) //< default selected eth
  const [ethBalance, setETHBalance] = useState<BigNumber>()
  const [wethBalance, setWETHBalance] = useState<BigNumber>()
  const {provider, account} = useWeb3React()
  const [userSelectedAmount, setUserSelectedAmount] = useState<BigNumber>(new BigNumber(0))
  const [ethAndWETHAmount, setEthAndWETHAmount] = useState<[BigNumber, BigNumber]>([new BigNumber(0), new BigNumber(0)])
  const [canBuy, setCanBuy] = useState<boolean>(false)

  const [didReadService, setDidReadService] = useState(false)

  useAsync(async () => {
    if (account && provider) {
      // let signer = library.getSigner(account)
      let weth = new Erc20(ContractAddresses.WETH, provider)

      const [balance, wethBalance] = await Promise.all([
        provider.getBalance(account),
        weth.balanceOf(account)
      ])
      setETHBalance(new BigNumber(balance.toString()))
      setWETHBalance(new BigNumber(wethBalance.toString()))
      // console.log(`ETH => ${balance.toFixed()}, WEHT => ${wethBalance.toFixed()}`)
    }
  }, [props.nft, account, provider])

  useEffect(() => {
    let total = new BigNumber(0)
    if (payType & PayType.ETH && ethBalance) {
      total = total.plus(ethBalance)
    }
    if (payType & PayType.WETH && wethBalance) {
      total = total.plus(wethBalance)
    }
    setUserSelectedAmount(total)
    console.log(`user select total amount => ${total.div(10 ** 18).toFixed()}`)
  }, [payType, ethBalance, wethBalance])

  useEffect(() => {
    // weth first, calculation and allocation
    let weth = new BigNumber(0)
    let eth = new BigNumber(0)
    if (wethBalance && ethBalance) {
      // only weth can pay
      if (payType & PayType.WETH) {
        if (wethBalance.isGreaterThanOrEqualTo(props.actualAmount)) {
          weth = props.actualAmount
          eth = new BigNumber(0)
        } else {
          weth = wethBalance
          eth = props.actualAmount.minus(wethBalance)
        }
      } else {
        weth = new BigNumber(0)
        if (ethBalance.isGreaterThanOrEqualTo(props.actualAmount)) {
          eth = props.actualAmount
        } else {
          eth = props.actualAmount.minus(ethBalance)
        }
      }
    }
    setEthAndWETHAmount([eth, weth])
    console.log(`ETH: ${eth.div(10 ** 18).toFixed()}, WETH: ${weth.div(10 ** 18).toFixed()}`)
  }, [ethBalance, wethBalance, props.actualAmount, payType])

  useEffect(() => {
    let [eth, weth] = ethAndWETHAmount;
    setCanBuy(
      userSelectedAmount.isGreaterThanOrEqualTo(eth.plus(weth)) &&
      userSelectedAmount.isGreaterThanOrEqualTo(props.actualAmount)
    )
    console.log(`${userSelectedAmount.toFixed()}`)
  }, [userSelectedAmount, ethAndWETHAmount, props.actualAmount])



  async function checkoutBtnClick() {
    if (!provider) return
    try {
      // check pay type
      if (payType === PayType.None) {
        message.error("Choose your payment")
        return
      }

      // check balance
      if (!canBuy) {
        message.error("Insufficient account balance")
        return
      }

      if ((payType & PayType.WETH) > 0 && wethBalance?.lte(0)) {
        message.error("WETH balance is insufficient.")
        return
      }

      if (!didReadService) {
        message.error(`Please agree to NPics Terms of Service`)
        return
      }
      // show progressing
      // setProgressingPopupOpen(true)
      // props.dismiss?.()
      // get transaction data
      props.progressBlock?.()
      let data = await getTradeDetailData()
      if (!data) {
        message.error("item has been sold")
        // setProgressingPopupOpen(false)
        // props.dismiss?.()
        props.resultBlock?.(false)
        return
      }
      /// call contract
      let [eth, weth] = ethAndWETHAmount;
      let contractParams = {
        nft: props.nft.address,
        tokenId: props.nft.tokenId,
        tradeDetail: data,
        loadAmt: props.availableBorrow,
        payEthAmt: eth,
        price: props.nft.currentBasePrice,
        market: ContractAddresses.getMarketAddressByName(props.nft.market) ?? "",
        wethAmt: weth,
      }
      console.log(contractParams)
      const signer = provider.getSigner(account)
      const c = new Npics(signer)
      let tx: any;
      if (payType & PayType.WETH) {
        tx = await c.downPayWithWETH(contractParams)
      } else {
        tx = await c.downPayWithETH(contractParams)
      }
      // setHash(tx.hash)
      // props.resultBlock?.(true)
      props.resultBlock?.(true, tx.hash)
      // setProgressingPopupOpen(false)
      // setSuccessPopupOpen(true)
    } catch (e: any) {
      props.resultBlock?.(false)
      notification.error({message: e.message})
      // setProgressingPopupOpen(false)
      // setFailedPopupOpen(true)
    }
  }

  async function getTradeDetailData(): Promise<string | undefined> {
    const inner = async (accountOrNbp: string | undefined | null) => {
      const resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/route`, {
        address: props.nft.address,
        amount: 1,
        balanceToken: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        sender: accountOrNbp,
        standard: props.nft.standard,
        tokenId: props.nft.tokenId
      })
      if (resp.code === 200 && resp.data.transaction) {
        return resp.data.transaction
      } else {
        return undefined
      }
    }
    if (props.nft.market.toLowerCase() === "nftx" && provider) {
      /// nftx market special treatment, get nbp address
      let c = new Npics(provider.getSigner(account))
      let nbp = await c.getNbpFor(props.nft.address, Number(props.nft.tokenId))
      console.log(`NBP => ${nbp}`)
      return inner(nbp)
    } else {
      return inner(account)
    }
  }

  return <Flex
    width={"880px"}
    background={"#fff"}
    borderRadius={"10px"}
    padding={"40px"}
    flexDirection={"column"}
  >


    {/* title */}
    <PopupTitle title={"Complete Checkout"} canClose={true}></PopupTitle>

    {/* nft info */}
    <Grid
      marginTop={"30px"}
      border={"1px solid #e5e5e5"}
      borderRadius={"10px"}
      padding={"20px"}
      gridTemplateColumns={"270px auto"}
      // alignItems={"start"}
      alignContent={"start"}
      gridTemplateAreas={`
                "cover title"
                "cover payment"
                "cover loan"
                "payTitle payTitle"
                "payType payType"
            `}
      gridColumnGap={"16px"}
      gridRowGap={"16px"}
    >
      <Grid gridArea={"cover"}>
        <Cover src={props.nft.imageUrl}/>
      </Grid>
      <Grid gridArea={"title"}>
        <Typography
          color={"rgba(0,0,0,.5)"}
          fontSize={"14px"}
          fontWeight={500}
        >
          {props.nft.collectionName}
        </Typography>
        <Typography
          color={"#000"}
          fontSize={"20px"}
          fontWeight={700}
          marginTop={"6px"}
        >{`${props.nft.collectionName} #${props.nft.tokenId}`}</Typography>
      </Grid>
      <Grid
        gridArea={"payment"}
        border={"1px solid #e5e5e5"}
        borderRadius={"10px"}
        padding={"20px 28px"}
      >
        <Flex flexDirection={"row"} alignItems={"center"}>
          <Icon width={"24px"} height={"24px"} src={downPayIcon}/>
          <Typography
            marginLeft={"10px"}
            fontWeight={700}
            fontSize={"16px"}
            color={"#FF490F"}
          >Down Payment</Typography>
          <Flex flex={1}></Flex>
          <Icon width={"12px"} height={"18px"} src={ethIcon}/>
          <Typography
            fontWeight={700}
            fontSize={"24px"}
            marginLeft={"10px"}
          >{numberFormat(props.actualAmount.div(10 ** 18).toFixed())}</Typography>
        </Flex>
      </Grid>
      <Grid
        gridArea={"loan"}
        border={"1px solid #e5e5e5"}
        borderRadius={"10px"}
        padding={"20px 28px"}
        gridGap={"22px"}
      >
        <Flex alignItems={"center"}>
          <Typography
            color={"#000"}
            fontSize={"14px"}
            fontWeight={500}
          >Listed Price</Typography>
          <Flex flex={1}></Flex>
          <Icon width={"10px"} height={"15px"} src={ethIcon}/>
          <Typography
            color={"#000"}
            fontSize={"16px"}
            fontWeight={500}
            marginLeft={"6px"}
          >{props.nft.basePriceFormat()}</Typography>
        </Flex>
        <Flex alignItems={"center"}>
          <Typography
            color={"#000"}
            fontSize={"14px"}
            fontWeight={500}
          >Loan Amount</Typography>
          <Flex flex={1}></Flex>
          <Icon width={"10px"} height={"15px"} src={ethIcon}/>
          <Typography
            color={"#000"}
            fontSize={"16px"}
            fontWeight={500}
            marginLeft={"6px"}
          >{numberFormat(props.availableBorrow.div(10 ** 18).toFixed())}</Typography>
        </Flex>
      </Grid>
      <Grid gridArea={"payTitle"}>
        <Typography
          fontWeight={500}
          fontSize={"20px"}
          color={"#000"}
          marginTop={"24px"}
        >Pay With</Typography>
      </Grid>
      <Grid
        gridArea={"payType"}
        gridTemplateColumns={"1fr 1fr"}
        gridColumnGap={"10px"}
      >
        <PayTypeButton
          isSelected={(payType & PayType.ETH) > 0}
          name={"ETH"}
          balance={ethBalance ? numberFormat(ethBalance.div(10 ** 18).toFixed()) : TextPlaceholder}
          tap={() => {
            let oldPayType = payType
            setPayType(payType & PayType.ETH ? oldPayType & ~PayType.ETH : oldPayType |= PayType.ETH)
          }}
          isEth={true}
        />
        <PayTypeButton
          isSelected={(payType & PayType.WETH) > 0}
          name={"WETH"}
          balance={wethBalance ? numberFormat(wethBalance.div(10 ** 18).toFixed()) : TextPlaceholder}
          tap={() => {
            let oldPayType = payType
            setPayType(payType & PayType.WETH ? oldPayType & ~PayType.WETH : oldPayType |= PayType.WETH)
          }}
          isEth={false}
        />
      </Grid>
    </Grid>
    {/*  terms of service  */}
    <Box marginTop={"24px"}>
      <label>
        <Flex alignItems={"center"} gap={"12px"}>
          <Checkbox

            defaultChecked={didReadService}
            onChange={() => setDidReadService(!didReadService)}
          />
          <Typography
            color={"#000"}
            fontSize={"14px"}
            fontWeight={500}
            style={{
              "userSelect": "none"
            }}
          >Checking this box, I agree to NPics <AttrLink href={urls.resource} target={"_blank"}>Terms of Service</AttrLink></Typography>
        </Flex>
      </label>
    </Box>
    <Flex alignItems={"center"} justifyContent={"center"} gap={"20px"} marginTop={"40px"}>
      <CancelButton type={"button"} onClick={() => props.cancelBlock?.()}>Cancel</CancelButton>
      <ConfirmButton
        type={"button"}
        onClick={checkoutBtnClick}
      >Checkout</ConfirmButton>
    </Flex>
  </Flex>
}