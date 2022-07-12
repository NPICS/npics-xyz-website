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
      width: 48px;
      height: 48px;
      border-radius: 10px;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 10px;
      &>div:nth-child(1) {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        color: #000;
        font-size: 16px;
        &>span:nth-child(1) {
          max-width: 70px;
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
        font-size: 14px;
        &>span {
          ${flex}
          &>img {
            margin-left: 8px;
            height: 14px;
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
    font-size: 16px;
    color: #000;
    margin-left: 25px;
    &>span {
      max-width: 111px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
    &>img {
      width: 16px;
      height: 16px;
      margin-left: 6px;
    }
  }
  .imgPrice {
    ${flex}
    font-weight: 600;
    font-size: 16px;
    color: #000;
    &>img {
      /* width: 14px;
      height: 22px; */
      margin-right: 6px;
    }
  }
  .healthFactor {
    ${flex}
    font-weight: 600;
    font-size: 16px;
    color: #000;
  }
  .status {
    ${flex}
    font-weight: 500;
    font-size: 16px;
  }
  .actionBtn {
    background: #000000;
    border: 1px solid rgba(255, 255, 255, .2);
    border-radius: 10px;
    line-height: 48px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .ant-table-thead {
    tr {
      th:nth-child(2) {
        width: 255px !important;
      } 
      th:nth-child(3) {
        width: 160px !important;
      } 
      th:nth-child(4) {
        width: 180px !important;
      } 
      th:nth-child(5) {
        width: 160px !important;
      }
      th:nth-child(6) {
        width: 180px !important;
      }
      th:nth-child(7) {
        width: 190px !important;
      }
      th {
        width: 350px !important;
        padding: 16px !important;
      }
    }
  }
  .ant-table-tbody {
    tr {
      td:nth-child(2) {
        width: 255px !important;
      }
      td:nth-child(3) {
        width: 160px !important;
      }
      td:nth-child(4) {
        width: 180px !important;
      }
      td:nth-child(5) {
        width: 160px !important;
      }  
      td:nth-child(6) {
        width: 180px !important;
      }
      td:nth-child(7) {
        width: 190px !important;
      }
      td {
        width: 350px !important;
        padding: 16px !important;
      }
    }
    .ant-table-placeholder {
      .ant-empty-description {
        color: #000;
      }
      .ant-empty-normal {
        margin: 0;
      }
    }
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 250px;
      height: 250px;
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

