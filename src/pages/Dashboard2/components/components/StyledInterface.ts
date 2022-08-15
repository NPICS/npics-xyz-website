import BigNumber from 'bignumber.js';
import { Expose } from 'class-transformer';
import { flex } from 'component/styled';
import TransformBigNumber from 'model/transform/bigNumber';
import styled from 'styled-components';


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
      &>div:nth-child(1) {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        color: #000;
        font-size: 0.14rem;
        &>span:nth-child(1) {
          max-width: 0.7rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }
        &>span:nth-child(2) {
          white-space: nowrap;
        }
      }
      &>div:nth-child(2) {
        display: flex;
        color: rgba(0, 0, 0, .5);
        font-size: 0.12rem;
        &>span {
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
    &>span {
      max-width: 1.11rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
    &>img {
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
    &>img {
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
    border: 0.01rem solid rgba(255, 255, 255, .2);
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
`
export interface Result {
  createTime: string,
  id: number,
  nftAddress: string,
  neoAddress: string,
  tokenId: string,
  userAddress: string,
  imageUrl: string
  floorPrice: BigNumber
  ltv: BigNumber
  purchaseFloorPrice: BigNumber
  status: number
}

export interface Record extends Result {
  neoAddress: string;
  collectionName: string;
  debtData: DebtData,
  liquidatePrice: LiquidatePrice
}

export interface DebtData {
  loanId: number,
  reserveAsset: string,
  totalCollateral: BigNumber,
  totalDebt: BigNumber,
  availableBorrows: BigNumber,
  healthFactor: BigNumber
}
export interface LiquidatePrice {
  liquidatePrice: BigNumber,
  paybackAmount: BigNumber
}

export interface DataSource {
  key: string,
  items: string;
  contract: string;
  debt: BigNumber;
  maxDebt: BigNumber;
  debtString: string;
  liquidationPrice: string;
  healthFactor: string;
  status: number;
  statusSrt: string;
  address: string;
  neoAddress: string;
  tokenId: string;
  imageUrl: string;
  floorPrice: BigNumber;
  collectionName: string;
  ltv: BigNumber;
  purchaseFloorPrice: BigNumber;
}

export class DataSource2 {
  key!: string
  
  id!: string

  createTime!: string

  nftAddress!: string
  
  neoAddress!: string

  tokenId!: number

  userAddress!: string

  imageUrl!: string

  @TransformBigNumber()
  floorPrice!: BigNumber
  
  @TransformBigNumber()
  ltv!: BigNumber
  
  @TransformBigNumber()
  purchaseFloorPrice!: BigNumber

  status!: number

  collectionName!: string
  
  @TransformBigNumber()
  liquidatePrice!: BigNumber

  @TransformBigNumber()
  paybackAmount!: BigNumber

  loanId!: number

  reserveAsset!: string
  
  factorStatus!: string

  @TransformBigNumber()
  totalCollateral!: BigNumber

  @TransformBigNumber()
  totalDebt!: BigNumber

  @TransformBigNumber()
  availableBorrows!: BigNumber

  @TransformBigNumber()
  healthFactor!: BigNumber

  @Expose()
  maxTotalDebt() {
    return BigNumber.minimum(this.totalDebt.multipliedBy(new BigNumber('0.001')), new BigNumber('0.01').multipliedBy(10 ** 18))
  }

  @Expose()
  liquidationPrice() {
    return this.totalDebt.div('0.9')
  }

  @Expose()
  debtString() {
    return this.totalDebt.div(10 ** 18).toFixed(4, 1)
  }
  
  @Expose()
  terminated(): boolean {
    return this.status === 1 ? true : false
  }

  @Expose()
  singularForName() {
    switch (this.collectionName) {
      case "Doodles":
        return "Doodle"
      case "Space Doodles":
        return "Space Doodle"
      case "CryptoPunks":
        return "CryptoPunk"
      case "CLONE X - X TAKASHI MURAKAMI":
        return "Clone X"
      default:
        return this.collectionName
    }
  }
}

