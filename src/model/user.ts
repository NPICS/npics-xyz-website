import BigNumber from "bignumber.js";
import { Expose } from "class-transformer";
import TransformBigNumber from "./transform/bigNumber";
import { numberFormat } from "../utils/urls";
import { imgurl } from "../utils/globalimport";
import listIcon from "../assets/images/market/nft_active_list.svg";
import offerIcon from "../assets/images/market/nft_active_offer.svg";
import saleIcon from "../assets/images/market/nft_active_Sale.svg";
import transferIcon from "../assets/images/market/nft_active_Transfer.svg";
import cancelIcon from "../assets/images/market/nft_active_cancel.svg";

export class User {
  id?: number;

  address?: string;

  avatar?: string;

  nickname?: string;

  profile?: string;

  displayMode?: number;

  email?: string;

  instagram?: string;

  nonce?: string;

  riskNoticeStatus?: boolean;

  systemNoticeStatus?: boolean;

  telegram?: string;

  twitter?: string;

  youtube?: string;
}

export class Collections {
  key?: string;
  imageUrl!: string;
  name!: string;
  realTotalSupply!: number;
  activeCollaterals!: string;
  @TransformBigNumber()
  floorPrice!: BigNumber;
  ownerNum!: number;
  @TransformBigNumber()
  dayChange!: BigNumber;
  @TransformBigNumber()
  ltv!: BigNumber;
  address!: string;
  totalShelves!: number;
  dayVolume!: number;
  description?: string;
  bannerImageUrl?: string;

  @Expose()
  sFloorPrice() {
    return this.floorPrice.div(10 ** 18).toFixed(2);
  }

  @Expose()
  get sAdvanceRate() {
    return new BigNumber("100").minus(this.ltv.div(10 ** 2)).toFixed(2);
  }

  @Expose()
  get sPrimePrice() {
    return this.floorPrice
      .div(10 ** 18)
      .multipliedBy(
        new BigNumber("100").minus(this.ltv.div(10 ** 2)).div(10 ** 2)
      )
      .toFixed(2);
  }

  @Expose()
  get vol() {
    return this.floorPrice
      .div(10 ** 18)
      .multipliedBy(this.ltv.div(10 ** 4))
      .toFixed(2);
  }

  @Expose()
  get sDayChange() {
    return this.dayChange.multipliedBy(100).toFixed(2);
    // return this.dayChange;
  }
}

export class CollectionItems {
  rarityScore!: number;
  address!: string;
  @TransformBigNumber()
  currentBasePrice!: BigNumber;
  decimals!: number;
  id!: string;
  imageUrl!: string;
  market!:
    | "opensea"
    | "x2y2"
    | "looksrare"
    | "nftx"
    | "xMarket"
    | "seaport"
    | "sudoswap";
  marketUrl!: string;
  paymentSymbol!: string;
  tokenId!: string;
  collectionName!: string;
  collectionSymbol!: string;
  ltv!: number;

  name?: string;

  @TransformBigNumber()
  floorPrice!: BigNumber;

  @Expose()
  marketIcon() {
    switch (this.market) {
      case "x2y2":
        return imgurl.market.x2y2;
      case "opensea":
        return imgurl.market.opensea;
      case "looksrare":
        return imgurl.market.looksrare;
      case "nftx":
        return imgurl.market.nftx;
      case "xMarket":
        return imgurl.market.xMarket;
      case "seaport":
        return imgurl.market.seaport;
      case "sudoswap":
        return imgurl.market.sudoswap;
    }
  }

  @Expose()
  marketDisplay() {
    switch (this.market) {
      case "x2y2":
        return "X2Y2";
      case "opensea":
        return "OpenSea";
      case "looksrare":
        return "LooksRare";
      case "nftx":
        return "NFTX";
      case "xMarket":
        return "xMarket";
      case "seaport":
        return "Seaport";
      case "sudoswap":
        return "Sudoswap";
    }
  }

  @Expose()
  basePrice() {
    return numberFormat(
      this.currentBasePrice.div(10 ** this.decimals).toFixed()
    );
  }

  @Expose()
  downPaymentPriceFormat() {
    let basePrice = this.currentBasePrice.div(10 ** this.decimals).toNumber();
    const floor = this.floorPrice.toNumber();
    const dowmPaymentPrice = parseFloat(
      (basePrice - this.ltv * floor).toFixed(2)
    );
    return dowmPaymentPrice;
  }

  @Expose()
  singularForName() {
    switch (this.collectionName) {
      case "Doodles":
        return "Doodle";
      case "Space Doodles":
        return "Space Doodle";
      case "CryptoPunks":
        return "CryptoPunk";
      case "Wrapped Cryptopunks":
        return "Wrapped Cryptopunk";
      case "CLONE X - X TAKASHI MURAKAMI":
        return "Clone X";
      default:
        return this.collectionName;
    }
  }

  @Expose()
  neoOneName() {
    switch (this.collectionName) {
      case "Doodles":
        return `NEO Doodle #${this.tokenId}`;

      case "Space Doodles":
        return `NEO SDoodle #${this.tokenId}`;

      case "CryptoPunks":
        return `NEO CryptoPunk #${this.tokenId}`;

      case "Wrapped Cryptopunks":
        return `NEO CryptoPunk #${this.tokenId}`;

      case "CLONE X - X TAKASHI MURAKAMI":
        return `NEO CLONEX #${this.tokenId}`;

      case "Bored Ape Yacht Club":
        return `NEO BAYC #${this.tokenId}`;

      case "Mutant Ape Yacht Club":
        return `NEO MAYC #${this.tokenId}`;

      case "Azuki":
        return `NEO Azuki #${this.tokenId}`;

      default:
        return `NEO ${this.collectionSymbol} #${this.tokenId}`;
    }
  }

  @Expose()
  nftName(): string {
    if (this.isNoName()) {
      return ``;
    } else {
      return this.singularForName();
    }
  }

  @Expose()
  isNoName(): boolean {
    return (
      this.collectionName === `Bored Ape Yacht Club` ||
      this.collectionName === `Mutant Ape Yacht Club`
    );
  }
}

type Traits = {
  trait_type: string;
  trait_value: string | undefined;
  trait_count: number;
  value: string;
};

export class CollectionDetail extends CollectionItems {
  collectionSymbol!: string;
  totalShelves!: number;
  owner!: string;
  standard!: string;
  traits!: Traits[];
  ltv!: number;
  paymentToken!: any;
  @TransformBigNumber()
  floorPrice!: BigNumber;
  @TransformBigNumber()
  apr!: BigNumber;
  @TransformBigNumber()
  availableBorrow!: BigNumber;
  @TransformBigNumber()
  totalAmount!: BigNumber;
  totalSupply!: number;
  bannerImageUrl?: string;
  externalUrl?: string;
  pairAddress?: string; //sudoswap
  vaultApr?: string;
  platform?: string;

  @Expose()
  get agreementPrice() {
    return this.currentBasePrice.minus(
      new BigNumber(this.availableBorrow.toString())
    );
  }

  @Expose()
  basePriceFormat(): string {
    return numberFormat(this.currentBasePrice.div(10 ** 18).toFixed());
  }
}

export class Activities {
  eventType!: string;
  createdTime!: Date;
  fromAccount!: string;
  toAccount!: string;
  @TransformBigNumber()
  amount?: BigNumber;
  @TransformBigNumber()
  startAmount?: BigNumber;
  @TransformBigNumber()
  totalAmount?: BigNumber;
  imageUrl!: string;
  decimals: number = 18;
  symbol?: string;

  @Expose()
  eventTypeExplain(): string | undefined {
    if (this.eventType === "null") {
      return undefined;
    } else if (this.eventType === "transfer") {
      return "Transfer";
    } else if (this.eventType === "offer_entered") {
      return "Offer";
    } else if (this.eventType === "created") {
      return "List";
    } else if (this.eventType === "cancelled") {
      return "Cancelled";
    } else if (this.eventType === "successful") {
      return "Sale";
    } else {
      return this.symbol?.toUpperCase() === "ETH" ? "List" : "Offer";
    }
  }

  @Expose()
  eventTypeIcon(): string | undefined {
    switch (this.eventTypeExplain()) {
      case "Transfer":
        return transferIcon;
      case "Offer":
        return offerIcon;
      case "List":
        return listIcon;
      case "Sale":
        return saleIcon;
      case "Cancelled":
        return cancelIcon;
      default:
        return undefined;
    }
  }

  @Expose()
  amountFormat(): string | undefined {
    if (
      this.eventTypeExplain() === "List" ||
      this.eventTypeExplain() === "Cancelled"
    ) {
      return this.startAmount
        ? numberFormat(this.startAmount.div(10 ** this.decimals).toFixed())
        : undefined;
    } else if (this.eventTypeExplain() === "Sale") {
      return this.totalAmount
        ? numberFormat(this.totalAmount.div(10 ** this.decimals).toFixed())
        : undefined;
    } else {
      return this.amount
        ? numberFormat(this.amount.div(10 ** this.decimals).toFixed())
        : undefined;
    }
  }
}
