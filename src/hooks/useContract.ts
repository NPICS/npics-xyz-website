import {Contract, Signer} from "ethers";
import {useWeb3React} from "@web3-react/core";
import {useMemo} from "react";
import {Web3Provider, JsonRpcSigner, JsonRpcProvider} from "@ethersproject/providers"
import {getAddress} from "ethers/lib/utils";
import {ContractAddresses} from "../utils/addresses";
import {Erc20, Erc721, LendPool, Npics} from "../abis/types";
import ERC20_ABI from "../abis/erc20.json"
import Npics_ABI from "../abis/npics.json"
import LendPool_ABI from "../abis/lendPool.json"
import ERC721_ABI from "../abis/erc721.json"

function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

function getProviderOrSigner(library: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function getContract(address: string, ABI: any, library: JsonRpcProvider, account?: string): Contract {
  if (!isAddress(address) || address === ContractAddresses.Zero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

/*
* Custom Contract
* */
export function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const {provider, account, chainId} = useWeb3React()
  return useMemo(() => {
    if (!address || !ABI || !provider || !chainId) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      return null
    }
  }, [address, ABI, provider, chainId, withSignerIfPossible, account]) as T
}

export function useERC20Contract(address: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(address, ERC20_ABI, withSignerIfPossible)
}

export function useNpicsContract() {
  return useContract<Npics>(ContractAddresses.NpicsProxy, Npics_ABI, true)
}

export function useLendPoolContract() {
  return useContract<LendPool>(ContractAddresses.LendPoolProxy, LendPool_ABI, true)
}

export function useERC721Contract(address: string) {
  return useContract<Erc721>(address, ERC721_ABI, true)
}

export function useWETHContract() {
  return useERC20Contract(ContractAddresses.WETH, true)
}