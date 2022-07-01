import {InjectedConnector} from "@web3-react/injected-connector";
// import {MetaMask} from "@web3-react/metamask";
// import {initializeConnector} from "@web3-react/core"
// import {initializeConnect} from "react-redux/es/components/connect";
// import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import QRCodeModal from "@walletconnect/qrcode-modal"

export const connectors = {
  injected: new InjectedConnector({
    supportedChainIds: [1]
  }),
  coinbase: new WalletLinkConnector({
    url: "https://mainnet.infura.io/v3/c9a7c383d1c24d30b899a72282f4e436",
    appName: "Npics",
    supportedChainIds: [1]
  }),
  walletConnect: new WalletConnectConnector({
    rpc: { [1]: "https://mainnet.infura.io/v3/c9a7c383d1c24d30b899a72282f4e436" },
    qrcode: true,
    supportedChainIds: [1],
    qrcodeModalOptions: QRCodeModal.open
  })
}