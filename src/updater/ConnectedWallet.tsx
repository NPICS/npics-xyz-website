import { Connector } from '@web3-react/types';
import { Typography, Box, Icon, Flex, Grid } from 'component/Box';
import React from 'react'
import styled from 'styled-components'
import { imgurl } from 'utils/globalimport'
import MetaMask from 'assets/images/MetaMask.svg'
import Walletconnect from 'assets/images/Walletconnect.svg'
import CoinbaseWallet from 'assets/images/CoinbaseWallet.svg'
import { useWeb3React } from '@web3-react/core';
import { CHAIN_ID, injected } from 'connectors/hooks';
import { SUPPORTED_WALLETS, WalletInfo } from './wallet';
import { setShowWalletModalOpen } from 'store/app';
import { useAppDispatch } from '../store/hooks';

export enum Wallet {
  METAMASK = 'MetaMask',
  WALLETCONNECT = 'Walletconnect',
  COINBASEWALLET = 'Coinbase Wallet',
}

const StyledtWallet = styled(Flex)`
  cursor: pointer;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 0 10px 25px;
  min-width: 260px;
  min-height: 60px;
  &:hover {
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid #fff;
  }
`

const WalletTtitle = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  color:#000;
  margin-bottom: 20px;
`



export default function ConnectedWallet () {
  const {account, provider, connector} = useWeb3React()
  const action = useAppDispatch()
  const WalletType = () => {
  
    const types = [
      {
        icon: MetaMask,
        name: Wallet.METAMASK,
      },
      {
        icon: Walletconnect,
        name: Wallet.WALLETCONNECT,
      },
      {
        icon: CoinbaseWallet,
        name: Wallet.COINBASEWALLET,
      }
    ]
  
    const connect = async (item: { icon: string; name: string }) => {
      let option: WalletInfo
      Object.keys(SUPPORTED_WALLETS).map(async (key) => {
        if(SUPPORTED_WALLETS[key].name === item.name) {
          option = SUPPORTED_WALLETS[key]
          console.log(option);
          await option?.connector?.activate(CHAIN_ID)
          action(setShowWalletModalOpen(false))
        }
      })
    }
  
  
    return (<Grid
      gridGap='20px'
    >
      {types.map(item => (
        <StyledtWallet key={item.name} onClick={() => connect(item)} alignItems="center">
          <Typography marginRight='20px'><Icon width='40px' height='40px' src={item.icon} alt="" /></Typography>
          <Typography fontSize='16px' fontWeight='700' color='#000'>{item.name}</Typography>
        </StyledtWallet>
      ))}
    </Grid>
    )
  }
  return (<Box
    background="#fff"
    padding="22px 20px 30px"
    borderRadius="20px"
  >
    <WalletTtitle>Connect a wallet</WalletTtitle>
    <WalletType />
  </Box>)
}
