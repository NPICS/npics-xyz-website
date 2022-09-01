import {
  ChainId,
  config,
  multicallClient,
  Contract as ClientContract,
  newContract as newClientContract,
} from "@chainstarter/multicall-client.js";
const multicallConfig = config({
  defaultChainId: ChainId.ETH,
  allowFailure: true,
  rpc: {},
});

export {
  ChainId,
  multicallClient,
  ClientContract,
  multicallConfig,
  newClientContract,
};
