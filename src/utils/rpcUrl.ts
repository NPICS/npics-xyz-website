import {StaticJsonRpcProvider} from "@ethersproject/providers";

export const nodeUrl = () => {
  return `https://mainnet.infura.io/v3/7d0afe54dc294b0685539de9451894a2`
}

export const simpleRpcProvider = () => {
  return new StaticJsonRpcProvider(nodeUrl())
}