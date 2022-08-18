import BigNumber from "bignumber.js";
import { Expose } from "class-transformer";
import moment from "moment";
import TransformBigNumber from "./transform/bigNumber";

export enum OFFER_TYPE_ENUM {
  "looksrare" = "looksrare",
  "x2y2" = "x2y2",
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
