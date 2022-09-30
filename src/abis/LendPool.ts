import BigNumber from "bignumber.js";
import { Contract, ethers } from "ethers";
import { ContractAddresses } from "../utils/addresses";
import LendPool_ABI from ".//lendPool.json";
import NPICS_ABI from "./npics.json";
import {
  ChainId,
  multicallClient,
  newClientContract,
} from "../utils/multicall";

export class LendPool {
  signer: any;
  private contract: Contract;

  constructor(signer: any) {
    this.signer = signer;
    this.contract = new ethers.Contract(
      ContractAddresses.LendPoolProxy,
      LendPool_ABI,
      signer
    );
  }

  async getNftDebtData(
    address: string,
    tokenId: string
  ): Promise<{
    reserveAsset: string;
    repayDebtAmount: BigNumber;
  }> {
    let c = newClientContract(
      NPICS_ABI,
      ContractAddresses.NpicsProxy,
      ChainId.ETH
    );
    let result = await multicallClient([
      c.getLoanReserveBorrowAmount(address, tokenId),
    ]).then((res) => {
      console.log("res", res);
      return res[0].returnData;
    });
    return {
      reserveAsset: result[0],
      repayDebtAmount: new BigNumber(result[1]),
    };
  }

  async getNftLiquidatePrice(
    address: string,
    tokenId: string
  ): Promise<{
    liquidatePrice: BigNumber;
    paybackAmount: BigNumber;
  }> {
    let c = newClientContract(
      LendPool_ABI,
      ContractAddresses.LendPoolProxy,
      ChainId.ETH
    );
    let result = await multicallClient([
      c.getNftLiquidatePrice(address, tokenId),
    ]).then((res) => res[0].returnData);

    return {
      liquidatePrice: result[0],
      paybackAmount: result[1],
    };
  }

  async getReserveData(address: string): Promise<{
    liquidityIndex: BigNumber;
    variableBorrowIndex: BigNumber;
    currentLiquidityRate: BigNumber;
    currentVariableBorrowRate: BigNumber;
    lastUpdateTimestamp: number;
    bTokenAddress: string;
    debtTokenAddress: string;
    interestRateAddress: string;
    id: number;
  }> {
    let result = await this.contract.getReserveData(address);
    return {
      liquidityIndex: result[0],
      variableBorrowIndex: result[1],
      currentLiquidityRate: result[2],
      currentVariableBorrowRate: result[3],
      lastUpdateTimestamp: result[4],
      bTokenAddress: result[5],
      debtTokenAddress: result[6],
      interestRateAddress: result[7],
      id: result[8],
    };
  }
}
