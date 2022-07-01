import React,{useState,useEffect} from "react"
import { Box, Flex, Icon, Typography } from "component/Box";
import ButtonDefault from "component/ButtonDefault";
import { useWeb3React } from '@web3-react/core';
import { Npics } from 'abi/Npics'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setIsLoading } from 'store/app';
import { message } from 'antd';
import BigNumber from 'bignumber.js';
import {User} from "../../../model/user";
import {deserialize} from "class-transformer";
import Dashboard from '../../Dashboard/Dashboard';
import { imgurl } from "utils/globalimport";
import { urls } from '../../../utils/urls';

export default function MyRewards() {
  const { account, library } = useWeb3React()
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0))
  const action = useAppDispatch()
  const userInfo = useAppSelector(state => deserialize(User, state.app.currentUser))
  useEffect(() => {
    getBalance()
    // eslint-disable-next-line
  }, [])
  const getBalance = async () => {
    const signer = library.getSigner(account)
    let npics = new Npics(signer)
    const Balance: BigNumber = await npics.getRewardsBalance(userInfo?.address || '')
    setBalance(Balance)
  }

  const onRewards = async () => {
    try {
      const signer = library.getSigner(account)
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
  padding={".6rem .4rem"}
  >
    <Typography fontSize={".3rem"} fontWeight={800} color={'#000'} marginBottom=".08rem">Npics Rewards</Typography>
    <Typography fontSize={".16rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom={".3rem"}>Participate in the down payment loan to buy NFT and earn double rewards</Typography>
    <Typography fontSize={".16rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom={".4rem"}>Rates shown are estimates, and fluctuate based on many different factors, including collection floor price, trading volume, pool liquidity, token price, etc.</Typography>
    <Typography fontSize={".2rem"} fontWeight={700} color={'#000'} marginBottom={".2rem"}>Your rewards</Typography>
    <Box
      background={"rgba(0,0,0,.03)"}
      border={"1px solid rgba(0,0,0,.1)"}
      borderRadius={"10px"}
      padding={".4rem"}
      display={"inline-block"}
    >
      <Flex
        flexDirection={"column"}
        gap={".2rem"}
      >
        <Flex gap={".17rem"} alignItems={"center"}>
          <Icon width=".4rem" height=".4rem" src={imgurl.dashboard.rewardBend}/>
          <Typography fontSize={".18rem"} fontWeight={"500"} color={"#000"}>BEND</Typography>
        </Flex>

        <Flex gap={"1.6rem"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={".12rem"}>
            <Typography fontSize={".14rem"} fontWeight={"500"} color={"rgba(0,0,0,.5)"}>Reward to be received : </Typography>
            <Typography fontSize={".24rem"} fontWeight={"700"} color={"#000"}>{balance && new BigNumber(balance?.toString()).dp(3,1).div(10 ** 18).toFixed(4,1)}</Typography>
          </Flex>
         
          <ButtonDefault scale={true} disabled={balance?.toString() === '0'} types={"normal"} onClick={onRewards}>
            Claim
          </ButtonDefault>

          <ButtonDefault scale={true} types={'normal'} onClick={() => {window.open(urls.gitBookRewards)}}>
            NBP
          </ButtonDefault>

        </Flex>
      </Flex>
    </Box>
    


  </Box>
}