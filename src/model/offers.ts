import BigNumber from "bignumber.js";
import { Expose } from "class-transformer";
import moment from "moment";
import TransformBigNumber from "./transform/bigNumber";
import looksrare from "../assets/images/market/looksrare.svg";
import nftx from "../assets/images/market/nftx.svg";
import x2y2 from "../assets/images/market/x2y2.svg";

export enum OFFER_TYPE_ENUM {
  "looksrare" = "looksrare",
  "x2y2" = "x2y2",
}
export enum OFFER_TYPE_NAME_ENUM {
  "looksrare" = "Looksrare",
  "x2y2" = "X2Y2",
}

export class Offers {
  created_at!: number;

  currency!: string;

  end_at!: number;

  id!: number;

  is_collection_offer!: boolean;

  maker!: string;

  offerRaw!: any;

  @TransformBigNumber()
  price!: BigNumber;

  status!: string;

  type!: string;

  collection!: string;

  updated_at!: number;

  offerSource!: OFFER_TYPE_ENUM;

  @Expose()
  OfferPriceDisplay() {
    return this.price.div(10 ** 18).toFixed(2, 1);
  }

  @Expose()
  createdTime() {
    return moment(this.created_at, "X").fromNow();
  }

  @Expose()
  ExpiresTime() {
    return moment(this.end_at, "X").fromNow();
  }
}
