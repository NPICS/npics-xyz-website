import BigNumber from "bignumber.js";
import {Contract, ethers} from "ethers";
import DebtTokenABI from "./DebtToken.json"
import {ContractAddresses} from "../utils/addresses";

export class DebtToken {
    signer: any
    private contract: Contract

    constructor(signer: any) {
        this.signer = signer
        this.contract = new ethers.Contract(ContractAddresses.DebtTokenProxy, DebtTokenABI, signer)
    }

    async balanceOf(address: string): Promise<BigNumber> {
        let result = await this.contract.balanceOf(address)
        return new BigNumber(result.toString())
    }
}