import React from 'react'
import { Box, Flex, Grid, Typography } from 'component/Box';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { globalConstant } from './globalConstant';
import { numberFormat } from './urls';
import { useAppSelector } from 'store/hooks';

const BorderBottom = styled.div`
  height: .02rem;
  width: 100%;
  background-color: #999;
`

export const listedPricePop = <Typography>
  The Lowest Listing price in all markets.
</Typography>

export function VaultAprPop(props: { rewardAPR: number, interestAPR: number }) {

  return <Grid width={'6rem'} gridGap=".1rem" borderRadius="20px">
    <Flex alignItems='center' justifyContent="space-between">
      <Typography fontSize=".16rem" fontWeight="500" color="#000">Reward APR(real-time)</Typography>
      <Typography fontSize=".16rem" fontWeight="500" color="#000">{(props.rewardAPR * 100).toFixed(2)}%</Typography>
    </Flex>
    <Flex alignItems='center' justifyContent="space-between">
      <Typography fontSize=".16rem" fontWeight="500" color="#000">Interest APR(real-time)</Typography>
      <Typography fontSize=".16rem" fontWeight="500" color="#000">{-(props.interestAPR * 100).toFixed(2)}%</Typography>
    </Flex>

    <BorderBottom />

    <Typography fontSize=".16rem" fontWeight="500" color="#000">Vault APR = Reward APR + Interest APR</Typography>

    <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">Rates shown are estimates,and fluctuate based on many different factors
      including collection floor price,trading volume,pool liquidity,token price,etc.</Typography>
    <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">Funding fees collected by NPics are distributed to our users as rewards.Eco-
      partner rewards are double-incentives during the execution of agreements.</Typography>

  </Grid>
}

export function DownPaymentPop(props: { listedPrice?: BigNumber, loanAmount?: BigNumber }) {
  const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
  const loanAmount = numberFormat(props.loanAmount?.times(ethRate).div(10 ** globalConstant.bit).toFixed() ?? '---')
  const listedPrice = numberFormat(props.listedPrice?.times(ethRate).div(10 ** globalConstant.bit).toFixed() ?? '---')

  return <Grid width={'6rem'} gridGap=".1rem" borderRadius="20px">
    <Flex alignItems='center' justifyContent="space-between">
      <Typography fontSize=".16rem" fontWeight="500" color="#000">Listed Price (real-time)</Typography>
      <Typography fontSize=".16rem" fontWeight="500" color="#000">{props.listedPrice?.div(10 ** globalConstant.bit).toFixed(2, 1) ?? '---'}{`$(${listedPrice})`}</Typography>
    </Flex>
    <Flex alignItems='center' justifyContent="space-between">
      <Typography fontSize=".16rem" fontWeight="500" color="#000">Loan Amount (real-time)</Typography>
      <Typography fontSize=".16rem" fontWeight="500" color="#000">{props.loanAmount?.div(10 ** globalConstant.bit).toFixed(2, 1) ?? "---"}{`$(${loanAmount})`}</Typography>
    </Flex>

    <BorderBottom />

    <Typography fontSize=".16rem" fontWeight="500" color="#000">Down Payment = Listed Price - Loan Amount</Typography>

    <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">The system obtains the prime price based on the market listing price in real-
      time,And the amount paid will be used as down payment for your position</Typography>

  </Grid>
}

export const MintedNFTPop = <Grid gridGap=".1rem" width="4.5rem">
  <Typography fontSize=".16rem" fontWeight="500" color="#000">NEO-NFT NPics Everlasting Option NFT</Typography>
  <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">NEO is NBPs voucher issued by the NPics on Ethereum,which is also a voucher
    held by the user to purchase NFT.
  </Typography>
</Grid>

export const HealthFactorPop = <Box width="4.5rem">
  <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">
    The health factor is a numerical representation of the security of your vault
    position relative to the borrowed ETH funds and its underlying value.The higher
    the value,the safer the position status is against the risk of liquidation.
    If the health factor reaches 1.the position liquidation risk will be triggered.
    Health factor below 1 may get liquidated.
  </Typography>
</Box>

export function DebtPop(props: { Principal?: BigNumber, Interest?: BigNumber, noInterest: string }) {
  const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
  const Principal = numberFormat(props.Principal?.times(ethRate).div(10 ** globalConstant.bit).toFixed() ?? '---')
  const Interest = numberFormat(props.Interest?.times(ethRate).div(10 ** globalConstant.bit).toFixed() ?? '---')

  return <Grid width={'6rem'} gridGap=".1rem" borderRadius="20px">
    <Flex alignItems='center' justifyContent="space-between">
      <Typography fontSize=".16rem" fontWeight="500" color="#000">Principal(real-time)</Typography>
      <Typography fontSize=".16rem" fontWeight="500" color="#000">{props.Principal?.div(10 ** globalConstant.bit).toFixed(2, 1) ?? '---'}{`$(${Principal})`}</Typography>
    </Flex>
    <Flex alignItems='center' justifyContent="space-between">
      <Typography fontSize=".16rem" fontWeight="500" color="#000">Interest(total)</Typography>
      {/* <Typography fontSize=".16rem" fontWeight="500" color="#000">{props.Interest?.div(10 ** globalConstant.bit).toFixed(2, 1) ?? "---"}{`$(${Interest})`}</Typography> */}
      <Typography fontSize=".16rem" fontWeight="500" color="#000">{props.noInterest}</Typography>
    </Flex>

    <BorderBottom />

    <Typography fontSize=".16rem" fontWeight="500" color="#000">Debt = Principal + Interest</Typography>

    <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">The principal initial loan amount-repaid amount</Typography>
    <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">the interest per period is based on the principal balance plus any outstanding
      interest already accrued.</Typography>
    <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">Please note that the interest will be settled before the principal for each
      repayment by default.</Typography>

  </Grid>
}

export function EstimatProfitPop(props: {purchaseFloorPrice?: BigNumber, ltv?: BigNumber, floorPrice?: BigNumber}) {
  const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
  const { floorPrice, purchaseFloorPrice, ltv } = props
  if(!ltv) return
  if(!purchaseFloorPrice) return

  // const profitAmount = floorPrice.minus(purchaseFloorPrice)
  // const ProfitRate = profitAmount.div(paymentHistory)
  
  const paymentHistory = purchaseFloorPrice?.times(new BigNumber(1).minus(ltv?.div(10 ** 4) as BigNumber))
  const purchaseFloorPriceDollar = numberFormat(purchaseFloorPrice?.times(ethRate).div(10 ** globalConstant.bit).toFixed() ?? '---')
  const floorPriceDollar = numberFormat(floorPrice?.times(ethRate).div(10 ** globalConstant.bit).toFixed() ?? '---')
  const paymentHistoryDollar = numberFormat(paymentHistory?.times(ethRate).div(10 ** globalConstant.bit).toFixed() ?? '---')

  return <Grid width={'6rem'} gridGap=".1rem" borderRadius="20px">
    <Flex alignItems='center' justifyContent="space-between">
      <Typography fontSize=".16rem" fontWeight="500" color="#000">PFP (Purchase floor price history)</Typography>
      <Typography fontSize=".16rem" fontWeight="500" color="#000">{purchaseFloorPrice?.div(10 ** globalConstant.bit).toFixed(2, 1) ?? '---'}{`$(${purchaseFloorPriceDollar})`}</Typography>
    </Flex>
    <Flex alignItems='center' justifyContent="space-between">
      <Typography fontSize=".16rem" fontWeight="500" color="#000">FP(real-time floor price)</Typography>
      <Typography fontSize=".16rem" fontWeight="500" color="#000">{floorPrice?.div(10 ** globalConstant.bit).toFixed(2, 1) ?? '---'}{`$(${floorPriceDollar})`}</Typography>
    </Flex>

    <Flex alignItems='center' justifyContent="space-between">
      <Typography fontSize=".16rem" fontWeight="500" color="#000">DP(Down Payment history)</Typography>
      <Typography fontSize=".16rem" fontWeight="500" color="#000">{paymentHistory?.div(10 ** globalConstant.bit).toFixed(2, 1) ?? '---'}{`$(${paymentHistoryDollar})`}</Typography>
    </Flex>

    <BorderBottom />

    <Typography fontSize=".16rem" fontWeight="500" color="#000">Profit Amount =(FP- PFP) * 1</Typography>
    <Typography fontSize=".16rem" fontWeight="500" color="#000">Profit Rate = Profit Amount / DP * 100%</Typography>

    <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">The estimated position profit are calculated by floor price difference andoriginal expense amount,actual profit is listed price difference.</Typography>

  </Grid>
}

