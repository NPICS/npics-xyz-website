import BigNumber from "bignumber.js";
import {ethers} from "ethers";
import {ContractAddresses} from "../utils/addresses";
import NPICS_ABI from "../abi/npics.json"

export class Npics {
    signer: any

    constructor(signer: any) {
        this.signer = signer
    }

    async downPayBatchBuyWithETH(params:{nft: string, tokenId: string, tradeDetail: string, loadAmt: BigNumber,market:string, payAmount: BigNumber, price: BigNumber}) {
        // pay amount need + 2wei
        debugger
        let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, this.signer)
        return await contract.downPayWithETH(params.nft, params.tokenId, params.market, params.tradeDetail, params.price.dp(0).toFixed(),params.loadAmt.dp(0).toFixed(), {
            value: (params.payAmount.plus(2).dp(0).toFixed())
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

    async getAvailableBorrowsln(nft: string) {
        let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI)
        return await contract.availableBorrowsInETH(nft)
    }
    
}
