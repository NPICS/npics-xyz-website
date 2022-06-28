import BigNumber from "bignumber.js";
import {ethers} from "ethers";
import {ContractAddresses} from "../utils/addresses";
import NPICS_ABI from "../abi/npics.json"
import {Erc20} from "./Erc20";

export class Npics {
  signer: any

  constructor(signer: any) {
    this.signer = signer
  }

  async downPayWithETH(params: { nft: string, tokenId: string, tradeDetail: string, market: string, price: BigNumber, loadAmt: BigNumber, payEthAmt: BigNumber }) {
    // pay amount need + 2wei
    console.log("params", params)
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
    return await contract.downPayWithETH(params.nft, params.tokenId, params.market, params.tradeDetail, params.price.dp(0).toFixed(), params.loadAmt.dp(0).toFixed(), {
      value: (params.payEthAmt.plus(2).dp(0).toFixed())
    })
  }

  async downPayWithWETH(params: { nft: string, tokenId: string, tradeDetail: string, market: string, price: BigNumber, loadAmt: BigNumber, payEthAmt: BigNumber, wethAmt: BigNumber }) {
    // weth authorization
    console.log("params", params)
    let weth = new Erc20(ContractAddresses.WETH, this.signer)
    const tx = await weth.approve(ContractAddresses.NpicsProxy, params.wethAmt.dp(0).toFixed())
    await tx.wait()
    // pay amount need + 2wei
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
    return await contract.downPayWithWETH(params.nft, params.tokenId, params.market, params.tradeDetail, params.price.dp(0).toFixed(), params.loadAmt.dp(0).toFixed(), params.wethAmt.dp(0).toFixed(), {
      value: (params.payEthAmt.plus(2).dp(0).toFixed())
    })
  }

  async getLoanReserveBorrowAmount(nft: string, tokenId: number): Promise<{
    reserveAsset: string,
    repayDebtAmount: BigNumber
  }> {
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
    let result = await contract.getLoanReserveBorrowAmount(nft, tokenId)
    return {
      reserveAsset: result[0],
      repayDebtAmount: result[1]
    }
  }

  async repayETH(nft: string, tokenId: string, amount: BigNumber) {
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
    return await contract.repayETH(nft, tokenId, amount.dp(0).toFixed(), {
      value: amount.dp(0).toFixed()
    })
  }

  async getRewardsBalance(nft: string) {
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
    return await contract.getRewardsBalance(nft)
  }

  async claimRewards() {
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
    return await contract.claimRewards()
  }

  async getAvailableBorrowsln(nft: string): Promise<BigNumber> {
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
    const price = await contract.availableBorrowsInETH(nft)
    let result = new BigNumber(price.toString()).minus(new BigNumber('0.0001').times(10 ** 18))
    return BigNumber.max(result, 0);
  }

  async getNbpFor(nft: string, tokenId: number): Promise<string> {
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
    return await contract.getNbpFor(nft, tokenId)
  }

  async neoFor(nft: string): Promise<string> {
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
    return await contract.neoFor(nft)
  }
}
