import { ContractAddresses } from "../utils/addresses";
import { ethers } from "ethers";
import TurboABI from "./Turbo.json";
export class Turbo {
  signer: any

  constructor(signer: any) {
    this.signer = signer
  }

  async allowlistMint() {
    // const TurboContract = new ethers.Contract(ContractAddresses.TurboProxy, TurboABI, this.signer);
    const TurboContract = new ethers.Contract(ContractAddresses.TurboTestProxy, TurboABI, this.signer);
    // const TurboContract = new ethers.Contract("0xf15304428ab7d85938baa103fb82e90eed887315", TurboABI, this.signer);
    return await TurboContract.allowlistMint({ value: 0 });

  }
}