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

export function VaultAprPop(props:{rewardAPR: number,interestAPR: number}) {
  
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

export function DownPaymentPop(props:{listedPrice?: BigNumber,loanAmount?: BigNumber}) {
  const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
  const loanAmount = numberFormat(props.loanAmount?.times(ethRate).div(10 ** 18).toFixed() ?? '---')
  const listedPrice = numberFormat(props.listedPrice?.times(ethRate).div(10 ** 18).toFixed() ?? '---')
  
  return <Grid width={'6rem'} gridGap=".1rem" borderRadius="20px">
  <Flex alignItems='center' justifyContent="space-between">
    <Typography fontSize=".16rem" fontWeight="500" color="#000">Listed Price (real-time)</Typography>
    <Typography fontSize=".16rem" fontWeight="500" color="#000">{props.listedPrice?.div(10 ** globalConstant.bit).toFixed(2,1) ?? '---'}{ `$(${listedPrice})` }</Typography>
  </Flex>
  <Flex alignItems='center' justifyContent="space-between">
    <Typography fontSize=".16rem" fontWeight="500" color="#000">Loan Amount (real-time)</Typography>
    <Typography fontSize=".16rem" fontWeight="500" color="#000">{props.loanAmount?.div(10 ** globalConstant.bit).toFixed(2,1) ?? "---"}{ `$(${loanAmount})` }</Typography>
  </Flex>

  <BorderBottom />

  <Typography fontSize=".16rem" fontWeight="500" color="#000">Down Payment = Listed Price - Loan Amount</Typography>

  <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">The system obtains the prime price based on the market listing price in real-
time,And the amount paid will be used as down payment for your position</Typography>

</Grid>
}
