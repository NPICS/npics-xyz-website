import {InjectedConnector} from "@web3-react/injected-connector";
// import {MetaMask} from "@web3-react/metamask";
// import {initializeConnector} from "@web3-react/core"
// import {initializeConnect} from "react-redux/es/components/connect";
// import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";

export const connectors = {
  injected: new InjectedConnector({
    supportedChainIds: [1]
  }),
  coinbase: new WalletLinkConnector({
    url: "",
    appName: "Npics",
    supportedChainIds: [1]
  }),
  walletConnect: new WalletConnectConnector({
    rpc: "",
    bridge: "https://bridge.walletconnect.org",
    qrcode: true
  })
}