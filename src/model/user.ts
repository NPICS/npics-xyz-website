import BigNumber from "bignumber.js";
import { Expose } from "class-transformer";
import { TransformBigNumber } from "./transform";

export class User {
    id?: number

    address?: string

    avatar?: string

    nickname?: string

    profile?: string

    displayMode?: number

    email?: string

    instagram?: string

    nonce?: string

    riskNoticeStatus?: boolean

    systemNoticeStatus?: boolean

    telegram?: string

    twitter?: string

    youtube?: string
}
export class  Collections {
  key? : string
  imageUrl! : string
  name!: string
  realTotalSupply!: number
  activeCollaterals!: number
  @TransformBigNumber()
  floorPrice!: BigNumber
  ownerNum!: number
  @TransformBigNumber()
  dayChange!: BigNumber
  @TransformBigNumber()
  ltv!: BigNumber
  address!: string;
  totalShelves!: number;
  dayVolume!: number;
  description?: string

  @Expose()
  get sFloorPrice() {
    return (this.floorPrice.div(10 ** 18).toFixed(2))
  }
  @Expose()
  get sAdvanceRate() {
    return (this.ltv.div(10 ** 2).toFixed(2))
  }
  @Expose()
  get sPrimePrice() {
    return this.floorPrice.div(10 ** 18).multipliedBy(this.ltv.div(10 ** 4)).toFixed(2)
  }
  @Expose()
  get vol() {
    return (this.floorPrice.div(10 ** 18).multipliedBy(this.ltv.div(10 ** 4)).toFixed(2))
  }
  @Expose()
  get sDayChange() {
    return this.dayChange.multipliedBy(100).toFixed(2)
  }
}

export class CollectionItems {
  rarityScore!: number;
  address!: string;
  @TransformBigNumber()
  currentBasePrice!: BigNumber
  decimals!: string;
  id!: string;
  imageUrl!: string;
  market!: 'opensea' | 'x2y2' | 'looksrare' | 'nftx' | 'xMarket' | 'seaport';
  marketUrl!: string;
  paymentSymbol!: string;
  tokenId!: string;
  collectionName!: string;
}

type Traits = {
  "trait_type": string,
  "trait_value": string | null,
  "trait_count": number,
  "value": string
}

export class CollectionDetail extends CollectionItems {
  collectionSymbol!: string;
  totalShelves!: number
  owner!: string;
  standard!: string;
  traits!: Traits[];
  ltv!: number;
  paymentToken!: any;
  @TransformBigNumber()
  floorPrice!: BigNumber
  @TransformBigNumber()
  apr!: BigNumber
  availableBorrow!: BigNumber
  totalAmount!: BigNumber
  totalSupply!: number;
  @Expose()
  get agreementPrice() {
    return this.currentBasePrice.minus(new BigNumber(this.availableBorrow.toString()))
  }
}

export class Activities {
  eventType!: string
  createdTime!: Date
  fromAccount!: string
  toAccount!: string
  @TransformBigNumber()
  amount!: BigNumber
  @TransformBigNumber()
  startAmount!: BigNumber

  @Expose()
  eventTypeExplain(): string | undefined {
    if (this.eventType === "null") {
      return undefined
    } else if (this.eventType === "transfer") {
      return "Transfer"
    } else if (this.eventType === "offer_entered") {
      return "Offer"
    } else if (this.eventType === "created") {
      return "List"
    } else {
      return undefined
    }
  }
}
