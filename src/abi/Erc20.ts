import {BigNumber} from "bignumber.js";
import { ethers, Contract } from 'ethers';
import ABI from "./erc20.json"

export class Erc20 {
    signer: any
    address: string
    private contract: Contract

    constructor(address: string, signer: any) {
        this.signer = signer
        this.address = address
        this.contract = new ethers.Contract(this.address, ABI, this.signer)
    }

    async balanceOf(address: string): Promise<BigNumber> {
        let balance = await this.contract.balanceOf(address)
        return new BigNumber(balance.toString())
    }

    async approve(address: string,weth:string) {
        let bool = await this.contract.approve(address, weth)
        return bool
    }

}