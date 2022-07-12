import { Connector } from "@web3-react/types";
import { injected, walletConnect, coinbase } from "connectors/hooks"
import { Wallet } from './ConnectedWallet';

export interface WalletInfo {
  connector?: Connector
  name: string
  description: string
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    description: 'Easy-to-use browser extension.',
  },
  WALLETCONNECT: {
    connector: walletConnect,
    name: 'Walletconnect',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  },
  COINBASEWALLET: {
    connector: coinbase,
    name: 'Coinbase Wallet',
    description: 'Use Coinbase Wallet app on mobile device',
  },
}