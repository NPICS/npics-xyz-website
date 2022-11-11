import BigNumber from "bignumber.js";
import { Expose } from "class-transformer";
import { flex } from "component/styled";
import TransformBigNumber from "model/transform/bigNumber";
import styled from "styled-components";
import { BANK_ENUM } from "../../../../../utils/enums";
import { healthyTurnStr } from "../../../../../model/vaults";

export const BgTable = styled.div`
  line-height: normal;
  .items {
    display: flex;
    .avatar {
      width: 0.48rem;
      height: 0.48rem;
      border-radius: 0.1rem;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 0.1rem;
      & > div:nth-child(1) {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        color: #000;
        font-size: 0.14rem;
        & > span:nth-child(1) {
          max-width: 0.7rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }
        & > span:nth-child(2) {
          white-space: nowrap;
        }
      }
      & > div:nth-child(2) {
        display: flex;
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.12rem;
        & > span {
          ${flex}
          &>img {
            margin-left: 0.08rem;
            height: 0.14rem;
          }
        }
      }
    }
  }
  .contract {
    display: flex;
    justify-content: left;
    align-items: center;
    font-weight: 500;
    font-size: 0.14rem;
    color: #000;
    /* align-items: flex-start; */
    & > span {
      max-width: 1.11rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
    & > img {
      //width: 0.16rem;
      //height: 0.16rem;
      margin-left: 0.06rem;
    }
  }
  .imgPrice {
    ${flex}
    align-items: flex-start;
    font-weight: 600;
    font-size: 0.14rem;
    color: #000;
    & > img {
      /* width: 0.14rem;
      height: 0.22rem; */
      margin-right: 0.06rem;
    }
  }
  .healthFactor {
    ${flex}
    justify-content: left;
    font-weight: 500;
    font-size: 0.14rem;
    color: #000;
  }
  .status {
    ${flex}
    justify-content: left;
    font-weight: 500;
    font-size: 0.14rem;
  }
  .actionBtn {
    background: #000000;
    border: 0.01rem solid rgba(255, 255, 255, 0.2);
    border-radius: 0.1rem;
    line-height: 0.48rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.14rem;
    color: #fff;
    cursor: pointer;
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;
export interface Result {
  createTime: string;
  id: number;
  nftAddress: string;
  neoAddress: string;
  tokenId: string;
  userAddress: string;
  imageUrl: string;
  floorPrice: BigNumber;
  ltv: BigNumber;
  purchaseFloorPrice: BigNumber;
  status: number;
}

export interface Record extends Result {
  neoAddress: string;
  collectionName: string;
  debtData: DebtData;
  liquidatePrice: LiquidatePrice;
}

export interface DebtData {
  loanId: number;
  reserveAsset: string;
  totalCollateral: BigNumber;
  totalDebt: BigNumber;
  availableBorrows: BigNumber;
  healthFactor: BigNumber;
}
export interface LiquidatePrice {
  liquidatePrice: BigNumber;
  paybackAmount: BigNumber;
}

export class VaultsItemData {
  key!: string;
  bankId!: BANK_ENUM;
  createdAt!: string;
  @TransformBigNumber()
  debtValue!: BigNumber;
  id!: string;
  nbp!: string;
  neo!: string;
  nft!: string;
  tokenId!: string;
  user!: string;
  value!: string;
  repayValue!: string;
  isAcceptOffer!: boolean;
  repayAll!: boolean;
  acceptOfferValue!: string;
  liquidationThreshold!: string;
  rewardApr!: string;
  borrowApy!: string;
  nftName!: string;

  @TransformBigNumber()
  purchaseFloorPrice!: BigNumber;

  imageUrl!: string;
  collectionName!: string;
  @TransformBigNumber()
  floorPrice!: BigNumber;
  factorStatus!: string;
  @TransformBigNumber()
  ltv!: BigNumber;
  @Expose()
  getHealthFactor(): BigNumber {
    const debtValue = this.debtValue.div(10 ** 18);
    if (debtValue.lte(0)) {
      return new BigNumber(0);
    }
    return this.floorPrice
      .multipliedBy(this.liquidationThreshold)
      .div(debtValue);
  }
  @Expose()
  terminated(): boolean {
    let factor = +this.getHealthFactor().dp(0).toString();
    return this.repayAll || factor <= 0;
  }
  @Expose()
  getFactorStatusString() {
    return healthyTurnStr(
      this.terminated() ? new BigNumber(0) : this.getHealthFactor()
    );
  }
  @Expose()
  singularForName(): string {
    switch (this.collectionName) {
      case "Doodles":
        return "Doodle";
      case "Space Doodles":
        return "Space Doodle";
      case "CryptoPunks":
        return "CryptoPunk";
      case "CLONE X - X TAKASHI MURAKAMI":
        return "Clone X";
      default:
        return this.collectionName;
    }
  }
  @Expose()
  debtString() {
    return this.debtValue.div(10 ** 18).toFixed(4, 1);
  }
  @Expose()
  liquidationPrice() {
    return this.debtValue.div("0.9");
  }
}
export interface VaultsContractCalcData {
  debt: BigNumber;
  debtString: string;
  maxDebt: BigNumber;
  liquidationPrice: string;
}
