import {ethers} from "ethers";
import ABI from "./erc721.json"

export class Erc721 {
    address: string
    signerOrProvider: any

    constructor(address: string, signerOrProvider: any) {
        this.address = address
        this.signerOrProvider = signerOrProvider
    }

    async OwnerOf(tokenId: string): Promise<string> {
        let c = new ethers.Contract(this.address, ABI,this.signerOrProvider)
        let balance = await c.ownerOf(tokenId)
        return balance
    }

}