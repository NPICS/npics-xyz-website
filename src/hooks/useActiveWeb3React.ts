import {Web3ReactContextInterface} from "@web3-react/core/dist/types";
import {Web3Provider, StaticJsonRpcProvider} from "@ethersproject/providers";
import {useWeb3React} from "@web3-react/core";
import {useEffect, useRef, useState} from "react";
import {nodeUrl, simpleRpcProvider} from "../utils/rpcUrl";
import {CHAIN_ID} from "../config/constants/networks";

const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const {library, chainId, ...web3React} = useWeb3React()
  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || simpleRpcProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library])

  return {library: provider, chainId: chainId ?? CHAIN_ID, ...web3React}
}

export default useActiveWeb3React;