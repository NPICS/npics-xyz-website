import { Contract, ethers } from "ethers";
import { ContractAddresses } from "../utils/addresses";
import LooksRareExchange_ABI from "./LooksRareExchange.json";
export interface ITakerAsk {
  isOrderAsk: boolean; //   bool isOrderAsk; // true --> ask / false --> bid
  taker: string; //   address taker; // msg.sender
  price: string | number; //   uint256 price; // final price for the purchase
  tokenId: string | number; //   uint256 tokenId;
  minPercentageToAsk: string | number; //   uint256 minPercentageToAsk; // // slippage protection (9000 --> 90% of the final price must return to ask)
  params: string; //   bytes params; // other params (e.g., tokenId)
}

export interface IMakerBid {
  isOrderAsk: boolean; //   bool isOrderAsk; // true --> ask / false --> bid
  signer: string; //   address signer; // signer of the maker order
  collection: string; //   address collection; // collection address
  price: string | number; //   uint256 price; // price (used as )
  tokenId: string | number; //   uint256 tokenId; // id of the token
  amount: string | number; //   uint256 amount; // amount of tokens to sell/purchase (must be 1 for ERC721, 1+ for ERC1155)
  strategy: string; //   address strategy; // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice(0x56244Bb70CbD3EA9Dc8007399F61dFC065190031)}
  currency: string; //   address currency; // currency (e.g., WETH)
  nonce: string | number; //   uint256 nonce; // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
  startTime: string | number; //   uint256 startTime; // startTime in timestamp
  endTime: string | number; //   uint256 endTime; // endTime in timestamp
  minPercentageToAsk: string | number; //   uint256 minPercentageToAsk; // slippage protection (9000 --> 90% of the final price must return to ask)
  params: string; //   bytes params; // additional parameters
  v: number; //   uint8 v; // v: parameter (27 or 28)
  r: string; //   bytes32 r; // r: parameter
  s: string; //   bytes32 s; // s: parameter
}

export class LooksRareExchange {
  signer: any;
  contract: Contract;

  constructor(signer: any) {
    this.contract = new ethers.Contract(
      ContractAddresses.looksRareExchange,
      LooksRareExchange_ABI,
      signer
    );
  }

  getMatchBidWithTakerAskEncodeAbi(takerAsk: ITakerAsk, makerBid: IMakerBid) {
    const iface = new ethers.utils.Interface(LooksRareExchange_ABI);
    const data = iface.encodeFunctionData("matchBidWithTakerAsk", [
      takerAsk,
      makerBid,
    ]);
    // const data = iface.encodeFunctionData("transferOwnership", [
    //   "0x59728544B08AB483533076417FbBB2fD0B17CE3a",
    // ]);
    return data;
  }
}
