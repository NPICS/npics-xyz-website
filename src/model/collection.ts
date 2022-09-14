import BigNumber from "bignumber.js";
import { Expose } from "class-transformer";
import TransformBigNumber from "./transform/bigNumber";

export class CollectionList {
  key?: string;
  imageUrl!: string;
  name!: string;
  realTotalSupply!: number;
  activeCollaterals!: string;
  floorPrice!: string;
  ownerNum!: number;
  dayChange!: string;
  ltv!: string;
  address!: string;
  totalShelves!: number;
  dayVolume!: number;
  description?: string;
  bannerImageUrl?: string;

  @Expose()
  get sAdvanceRate() {
    return 100 - parseFloat(this.ltv) * 100;
  }

  @Expose()
  get sFloorPrice() {
    return parseFloat(this.floorPrice).toFixed(2);
  }

  @Expose()
  get sPrimePrice() {
    const floor = parseFloat(this.floorPrice);
    const ltv = parseFloat(this.ltv);
    return (floor - floor * ltv).toFixed(2);
  }

  // @Expose()
  // get vol() {
  //   return this.floorPrice
  //     .div(10 ** 18)
  //     .multipliedBy(this.ltv.div(10 ** 4))
  //     .toFixed(2);
  // }

  @Expose()
  get sDayChange() {
    const dayChange = parseFloat(this.dayChange);
    return (dayChange * 100).toFixed(2);
  }
}
