import BigNumber from "bignumber.js";
import {Contract, ethers} from "ethers";
import {ContractAddresses} from "../utils/addresses";
import LendPool_ABI from "../abi/lendPool.json"

export class LendPool {
    signer: any
    private contract: Contract

    constructor(signer: any) {
        this.signer = signer
        this.contract = new ethers.Contract(ContractAddresses.LendPoolProxy, LendPool_ABI, signer)
    }

    async getNftDebtData(address: string, tokenId: string): Promise<{
        loanId: number,
        reserveAsset: string,
        totalCollateral: BigNumber,
        totalDebt: BigNumber,
        availableBorrows: BigNumber,
        healthFactor: BigNumber
    }> {
        let c = new ethers.Contract(ContractAddresses.LendPoolProxy, LendPool_ABI, this.signer)
        let result = await c.getNftDebtData(address, tokenId)
        return {
            loanId: result[0],
            reserveAsset: result[1],
            totalCollateral: result[2],
            totalDebt: result[3],
            availableBorrows: result[4],
            healthFactor: result[5]
        }
    }

    async getNftLiquidatePrice(address: string, tokenId: string): Promise<{
        liquidatePrice: BigNumber,
        paybackAmount: BigNumber
    }> {
        let c = new ethers.Contract(ContractAddresses.LendPoolProxy, LendPool_ABI, this.signer)
        let result = await c.getNftLiquidatePrice(address, tokenId)
        return {
            liquidatePrice: result[0],
            paybackAmount: result[1]
        }
    }

    async getReserveData(address: string): Promise<{
        liquidityIndex: BigNumber,
        variableBorrowIndex: BigNumber,
        currentLiquidityRate: BigNumber,
        currentVariableBorrowRate: BigNumber,
        lastUpdateTimestamp: number,
        bTokenAddress: string,
        debtTokenAddress: string,
        interestRateAddress: string,
        id: number
    }> {
        let result = await this.contract.getReserveData(address)
        return {
            liquidityIndex: result[0],
            variableBorrowIndex: result[1],
            currentLiquidityRate: result[2],
            currentVariableBorrowRate: result[3],
            lastUpdateTimestamp: result[4],
            bTokenAddress: result[5],
            debtTokenAddress: result[6],
            interestRateAddress: result[7],
            id: result[8]
        }
    }
}