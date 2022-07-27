import React, { useState, useEffect } from "react"
import { Box, Flex, Icon, Typography } from "component/Box";
import ButtonDefault from "component/ButtonDefault";
import { useWeb3React } from '@web3-react/core';
import { Npics } from 'abis/Npics'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setIsLoading } from 'store/app';
import { message } from 'antd';
import BigNumber from 'bignumber.js';
import { User } from "../../../model/user";
import { deserialize } from "class-transformer";
import { imgurl } from "utils/globalimport";
import More from "./components/More";

export default function MyRewards() {
  const { account, provider } = useWeb3React()
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0))
  const action = useAppDispatch()
  const userInfo = useAppSelector(state => deserialize(User, state.app.currentUser))
  useEffect(() => {
    getBalance()
    // eslint-disable-next-line
  }, [account, provider])
  const getBalance = async () => {
    if (!provider) return
    // TODO: library => provider @quan
    const signer = provider.getSigner(account)
    let npics = new Npics(signer)
    const Balance: BigNumber = await npics.getRewardsBalance(account || '')
    setBalance(new BigNumber(Balance.toString()))
  }

  const onRewards = async () => {
    if (!provider) return
    try {
      const signer = provider.getSigner(account)
      let npics = new Npics(signer)
      action(setIsLoading(true))
      await npics.claimRewards()
      action(setIsLoading(false))
    } catch (e) {
      action(setIsLoading(false))
      message.error(JSON.parse(JSON.stringify(e)).message)
    }

  }


  return <Box
    padding={"0.4rem 0.6rem"}
    position={"relative"}
  >
    <Typography fontSize={"0.3rem"} fontWeight={800} color={'#000'} marginBottom="0.3rem">NPics Rewards</Typography>
    {/* <Typography fontSize={"0.16rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom={"0.3rem"}>Participate in the down payment loan to buy NFT and earn double rewards</Typography> */}
    <Typography fontSize={"0.16rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom={"0.5rem"}>Rates shown are estimates, and fluctuate based on many different factors, including collection floor price, trading volume, pool liquidity, token price, etc.</Typography>
    <Typography fontSize={"0.2rem"} fontWeight={700} color={'#000'} marginBottom={"0.2rem"}>Your Rewards</Typography>
    <Box
      background={"rgba(0,0,0,.03)"}
      border={"0.01rem solid rgba(0,0,0,.1)"}
      borderRadius={"0.1rem"}
      padding={"0.4rem 0.4rem 0.46rem 0.4rem"}
      display={"inline-block"}
    >
      <Flex
        flexDirection={"column"}
        gap={"0.2rem"}
      >
        <Flex gap={"0.17rem"} alignItems={"center"}>
          <Icon width="0.4rem" height="0.4rem" src={imgurl.dashboard.rewardBend} />
          <Typography fontSize={"0.18rem"} fontWeight={"500"} color={"#000"}>BEND</Typography>
        </Flex>

        <Flex gap={"1.6rem"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={"0.12rem"}>
            <Typography fontSize={"0.14rem"} fontWeight={"500"} color={"rgba(0,0,0,.5)"}>Reward to be received : </Typography>
            <Typography fontSize={"0.24rem"} fontWeight={"700"} color={"#000"}>{balance && new BigNumber(balance?.toString()).dp(3, 1).div(10 ** 18).toFixed(4, 1)}</Typography>
          </Flex>

          <ButtonDefault padding="0rem 0.5rem" height="0.5rem" minWidth="1.5rem" scale={true} disabled={balance?.toString() === '0'} types={"normal"} onClick={onRewards}>
            Claim
          </ButtonDefault>
        </Flex>
      </Flex>
    </Box>

    <Box
      position={'absolute'}
      right={'0.3rem'}
      top={'0.3rem'}
    >
      <More />
    </Box>
  </Box>
}