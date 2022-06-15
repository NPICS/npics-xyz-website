import {InjectedConnector} from "@web3-react/injected-connector";
// import {MetaMask} from "@web3-react/metamask";
// import {initializeConnector} from "@web3-react/core"
// import {initializeConnect} from "react-redux/es/components/connect";
// import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
// import {WalletLinkConnector} from "@web3-react/walletlink-connector";

export const connectors = {
    injected: new InjectedConnector({
        supportedChainIds: [1]
    }),
    // walletConnect: new WalletConnectConnector({
    //     qrcode: true,
    //     bridge: "https://bridge.walletconnect.org",
    //     rpc: {
    //         1337: "http://127.0.0.1:8545"
    //     }
    // }),
    // coinbase: new WalletLinkConnector({
    //     url: "",
    //     appName: "NPICS"
    // })
}

// export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions))
