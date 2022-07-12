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
  padding: .1rem 0 .1rem .25rem;
  min-width: 2.6rem;
  min-height: .6rem;
  &:hover {
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid #fff;
  }
`

const WalletTtitle = styled(Typography)`
  font-size: .16rem;
  font-weight: 700;
  color:#000;
  margin-bottom: .2rem;
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
      gridGap='.2rem'
    >
      {types.map(item => (
        <StyledtWallet key={item.name} onClick={() => connect(item)} alignItems="center">
          <Typography marginRight='.2rem'><Icon width='.4rem' height='.4rem' src={item.icon} alt="" /></Typography>
          <Typography fontSize='.16rem' fontWeight='700' color='#000'>{item.name}</Typography>
        </StyledtWallet>
      ))}
    </Grid>
    )
  }
  return (<Box
    background="#fff"
    padding=".22rem .2rem .3rem"
    borderRadius="20px"
  >
    <WalletTtitle>Connect a wallet</WalletTtitle>
    <WalletType />
  </Box>)
}
