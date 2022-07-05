import {Web3ContextType} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {useWeb3React} from "@web3-react/core";
import {useEffect, useRef, useState} from "react";
import {nodeUrl, simpleRpcProvider} from "../utils/rpcUrl";
import {CHAIN_ID} from "../config/constants/networks";

const useActiveWeb3React = (): Web3ContextType<Web3Provider> => {
  const {provider, chainId, ...web3React} = useWeb3React()
  // const refEth = useRef(provider)
  // const [provider, setProvider] = useState(provider || simpleRpcProvider())

  // useEffect(() => {
  //   if (provider !== refEth.current) {
  //     setProvider(provider || simpleRpcProvider)
  //     refEth.current = provider
  //   }
  // }, [provider])

  return {provider: provider, chainId: chainId ?? CHAIN_ID, ...web3React}
}

export default useActiveWeb3React;