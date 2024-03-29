import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { ContractAddresses } from "../utils/addresses";
import NPICS_ABI from ".//npics.json";
import { Erc20 } from "./Erc20";
import { BANK_ENUM } from "../utils/enums";
import {
  ChainId,
  multicallClient,
  newClientContract,
} from "../utils/multicall";

export class Npics {
  signer: any;

  constructor(signer: any) {
    this.signer = signer;
  }
  //downPayWithETH
  async downPayWithETH(params: {
    nft: string;
    tokenId: string;
    tradeDetail: string;
    market: string;
    price: BigNumber;
    loadAmt: BigNumber;
    payEthAmt: BigNumber;
    platform: BANK_ENUM;
  }) {
    // pay amount need + 2wei
    let contract = new ethers.Contract(
      ContractAddresses.NpicsProxy,
      NPICS_ABI,
      this.signer
    );
    console.log(
      "params ETH",
      params.nft,
      params.tokenId,
      params.market,
      params.tradeDetail,
      params.price.dp(0).toFixed(),
      params.loadAmt.dp(0).toFixed(),
      BANK_ENUM[params.platform],
      {
        value: params.payEthAmt.plus(2).dp(0).toFixed(),
      }
    );
    return await contract[
      "downPayWithETH(address,uint256,address,bytes,uint256,uint256,uint256)"
    ](
      params.nft,
      params.tokenId,
      params.market,
      params.tradeDetail,
      params.price.dp(0).toFixed(),
      params.loadAmt.dp(0).toFixed(),
      BANK_ENUM[params.platform],
      {
        value: params.payEthAmt.plus(2).dp(0).toFixed(),
      }
    );
  }
  //downPayWithWETH
  async downPayWithWETH(params: {
    nft: string;
    tokenId: string;
    tradeDetail: string;
    market: string;
    price: BigNumber;
    loadAmt: BigNumber;
    payEthAmt: BigNumber;
    wethAmt: BigNumber;
    platform: BANK_ENUM;
  }) {
    // weth authorization

    console.log(
      "params WETH",
      params.nft,
      params.tokenId,
      params.market,
      params.tradeDetail,
      params.price.dp(0).toFixed(),
      params.loadAmt.dp(0).toFixed(),
      params.wethAmt.dp(0).toFixed(),
      BANK_ENUM[params.platform],
      {
        value: params.payEthAmt.plus(2).dp(0).toFixed(),
      }
    );

    let weth = new Erc20(ContractAddresses.WETH, this.signer);
    const tx = await weth.approve(
      ContractAddresses.NpicsProxy,
      params.wethAmt.dp(0).toFixed()
    );
    await tx.wait();
    // pay amount need + 2wei
    let contract = new ethers.Contract(
      ContractAddresses.NpicsProxy,
      NPICS_ABI,
      this.signer
    );
    return await contract[
      "downPayWithWETH(address,uint256,address,bytes,uint256,uint256,uint256,uint256)"
    ](
      params.nft,
      params.tokenId,
      params.market,
      params.tradeDetail,
      params.price.dp(0).toFixed(),
      params.loadAmt.dp(0).toFixed(),
      params.wethAmt.dp(0).toFixed(),
      BANK_ENUM[params.platform],
      {
        value: params.payEthAmt.plus(2).dp(0).toFixed(),
      }
    );
  }

  async getLoanReserveBorrowAmount(
    nft: string,
    tokenId: number | string
  ): Promise<{
    reserveAsset: string;
    repayDebtAmount: BigNumber;
  }> {
    let contract = newClientContract(
      NPICS_ABI,
      ContractAddresses.NpicsProxy,
      ChainId.ETH
    );
    return multicallClient([
      contract.getLoanReserveBorrowAmount(nft, tokenId),
    ]).then((res) => {
      return {
        reserveAsset: res[0].returnData[0],
        repayDebtAmount: res[0].returnData[1],
      };
    });
  }

  async repayETH(nft: string, tokenId: string, amount: BigNumber) {
    let contract = new ethers.Contract(
      ContractAddresses.NpicsProxy,
      NPICS_ABI,
      this.signer
    );
    return await contract.repayETH(nft, tokenId, amount.dp(0).toFixed(), {
      value: amount.dp(0).toFixed(),
    });
  }

  async getRewardsBalance(nft: string, bank: BANK_ENUM) {
    let contract = new ethers.Contract(
      ContractAddresses.NpicsProxy,
      NPICS_ABI,
      this.signer
    );
    return await contract["getRewardsBalance(address,uint256)"](nft, bank);
  }

  async claimRewards(bank: BANK_ENUM) {
    let contract = new ethers.Contract(
      ContractAddresses.NpicsProxy,
      NPICS_ABI,
      this.signer
    );
    return await contract["claimRewards(uint256)"](bank);
  }

  async getAvailableBorrowsln(
    nft: string,
    bank: BANK_ENUM
  ): Promise<BigNumber> {
    let contract = new ethers.Contract(
      ContractAddresses.NpicsProxy,
      NPICS_ABI,
      this.signer
    );
    const price = await contract["availableBorrowsInETH(address,uint256)"](
      nft,
      BANK_ENUM[bank]
    );
    let result = new BigNumber(price.toString()).minus(
      new BigNumber("0.0001").times(10 ** 18)
    );
    return BigNumber.max(result, 0);
  }

  async getNbpFor(nft: string, tokenId: number | string): Promise<string> {
    let contract = new ethers.Contract(
      ContractAddresses.NpicsProxy,
      NPICS_ABI,
      this.signer
    );
    return await contract.getNbpFor(nft, tokenId);
  }

  async neoFor(nft: string): Promise<string> {
    let contract = new ethers.Contract(
      ContractAddresses.NpicsProxy,
      NPICS_ABI,
      this.signer
    );
    return await contract.neoFor(nft);
  }

  async getNeoFor(nft: string): Promise<string> {
    let contract = new ethers.Contract(
      ContractAddresses.NpicsProxy,
      NPICS_ABI,
      this.signer
    );
    return await contract.getNeoFor(nft);
  }
  getDebtWEthOf(account: string): Promise<BigNumber> {
    let contract = newClientContract(
      NPICS_ABI,
      ContractAddresses.NpicsProxy,
      ChainId.ETH
    );
    return multicallClient([contract.getDebtWEthOf(account)]).then(
      (res) => new BigNumber(res[0].returnData || "0")
    );
  }
}
