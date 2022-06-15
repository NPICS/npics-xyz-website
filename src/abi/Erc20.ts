import {BigNumber} from "bignumber.js";
import {ethers} from "ethers";
import ABI from "./erc20.json"

export class Erc20 {
    signer: any
    address: string

    constructor(address: string, signer: any) {
        this.signer = signer
        this.address = address
    }

    async balanceOf(address: string): Promise<BigNumber> {
        let c = new ethers.Contract(this.address, ABI, this.signer)
        let balance = await c.balanceOf(address)
        return new BigNumber(balance.toString())
    }

}