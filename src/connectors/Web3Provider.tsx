import {Web3ReactHooks, Web3ReactProvider} from "@web3-react/core";
import {ReactNode} from "react";
import {
  coinbase,
  coinbaseHooks, getConnectorForWallet,
  injected,
  injectedHooks,
  network,
  useConnectors,
  walletConnect,
  walletConnectHooks
} from "./hooks";
import {Connector} from "@web3-react/types";
import {useAsync} from "react-use";
import {useAppSelector} from "../store/hooks";

const connect = async (connector: Connector) => {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

export default function Web3Provider({children}: { children: ReactNode }) {
  const selectedWallet = useAppSelector(state => state.user.selectedWallet)
  // const connectors: [Connector, Web3ReactHooks][] = [
  //   [injected, injectedHooks],
  //   [coinbase, coinbaseHooks],
  //   [walletConnect, walletConnectHooks]
  // ]
  const connectors = useConnectors(selectedWallet)

  useAsync(async () => {
    // default connect `nodeUrl()` provider
    await connect(network)
    // check selected wallet
    if (selectedWallet) {
      await connect(getConnectorForWallet(selectedWallet))
    }
  }, [])

  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}