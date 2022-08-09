import {
  initializeConnector,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
import { nodeUrl, simpleRpcProvider } from "../utils/rpcUrl";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import NpicsLogo from "../assets/images/home/login.svg";
import { ReactNode, useMemo } from "react";
import { GnosisSafe } from "@web3-react/gnosis-safe";
import { Network } from "@web3-react/network";
import { Connector } from "@web3-react/types";

function onError(error: Error) {
  console.log("asdasdasdsad");
  console.debug(`web-react error => ${error}`);
}

// MetaMask
export const [injected, injectedHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions, onError })
);

// WalletConnect
export const [walletConnect, walletConnectHooks] =
  initializeConnector<WalletConnect>((actions) => {
    return new WalletConnect({
      actions,
      options: {
        rpc: { 1: nodeUrl() },
        qrcode: true,
      },
      onError,
    });
  });

// Coinbase
export const [coinbase, coinbaseHooks] = initializeConnector<CoinbaseWallet>(
  (actions) => {
    return new CoinbaseWallet({
      actions,
      options: {
        url: nodeUrl(),
        appName: "Npics",
        appLogoUrl: NpicsLogo,
      },
      onError,
    });
  }
);

// GnosisSafe
export const [gnosisSafe, gnosisSafeHooks] = initializeConnector<GnosisSafe>(
  (actions) => new GnosisSafe({ actions })
);

// network, view on nodeUrl()
export const [network, networkHooks] = initializeConnector<Network>(
  (actions) => {
    return new Network({
      actions,
      urlMap: { 1: nodeUrl() },
      defaultChainId: 1,
    });
  }
);

// all support wallet
// @warning: NETWORK is not a wallet
export enum Wallet {
  INJECTED = "INJECTED",
  COINBASE_WALLET = "COINBASE_WALLET",
  WALLET_CONNECT = "WALLET_CONNECT",
  NETWORK = "NETWORK",
}

export const WALLETS = [
  Wallet.COINBASE_WALLET,
  Wallet.WALLET_CONNECT,
  Wallet.INJECTED,
];

export const CHAIN_ID = 1;

export function getWalletForConnector(connector: Connector) {
  switch (connector) {
    case injected:
      return Wallet.INJECTED;
    case coinbase:
      return Wallet.COINBASE_WALLET;
    case walletConnect:
      return Wallet.WALLET_CONNECT;
    case network:
      return Wallet.NETWORK;
    default:
      throw Error("unsupported connector");
  }
}

export function getConnectorForWallet(wallet: Wallet) {
  switch (wallet) {
    case Wallet.INJECTED:
      return injected;
    case Wallet.COINBASE_WALLET:
      return coinbase;
    case Wallet.WALLET_CONNECT:
      return walletConnect;
    case Wallet.NETWORK:
      return network;
  }
}

function getHooksForWallet(wallet: Wallet) {
  switch (wallet) {
    case Wallet.INJECTED:
      return injectedHooks;
    case Wallet.COINBASE_WALLET:
      return coinbaseHooks;
    case Wallet.WALLET_CONNECT:
      return walletConnectHooks;
    case Wallet.NETWORK:
      return networkHooks;
  }
}

interface ConnectorListItem {
  connector: Connector;
  hooks: Web3ReactHooks;
}

function getConnectorListItemForWallet(wallet: Wallet) {
  return {
    connector: getConnectorForWallet(wallet),
    hooks: getHooksForWallet(wallet),
  };
}

export function useConnectors(selectedWallet: Wallet | undefined) {
  return useMemo(() => {
    const connectors: ConnectorListItem[] = [
      { connector: gnosisSafe, hooks: gnosisSafeHooks },
    ];
    if (selectedWallet) {
      connectors.push(getConnectorListItemForWallet(selectedWallet));
    }
    connectors.push(
      ...WALLETS.filter((wallet) => wallet !== selectedWallet).map(
        getConnectorListItemForWallet
      )
    );
    connectors.push({ connector: network, hooks: networkHooks });
    const web3ReactConnectors: [Connector, Web3ReactHooks][] = connectors.map(
      ({ connector, hooks }) => [connector, hooks]
    );
    return web3ReactConnectors;
  }, [selectedWallet]);
}
