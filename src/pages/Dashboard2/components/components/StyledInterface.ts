import BigNumber from 'bignumber.js';
import { Expose } from 'class-transformer';
import { flex } from 'component/styled';
import TransformBigNumber from 'model/transform/bigNumber';
import styled from 'styled-components';


export const BgTable = styled.div`
  .items {
    display: flex;
    .avatar {
      width: .48rem;
      height: .48rem;
      border-radius: 10px;
    }
    .text {
      display: flex;
      flex-direction: column;
      margin-left: .1rem;
      &>div:nth-child(1) {
        display: flex;
        flex-wrap: nowrap;
        color: #000;
        font-size: .16rem;
        &>span:nth-child(1) {
          max-width: .67rem;
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
        font-size: .14rem;
        &>span {
          ${flex}
          &>img {
            margin: 0 .04rem 0 .08rem;
            height: .14rem;
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
    font-size: .16rem;
    color: #000;
    margin-left: .25rem;
    &>span {
      max-width: 1.11rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
    &>img {
      width: .16rem;
      height: .16rem;
      margin-left: .06rem;
    }
  }
  .imgPrice {
    ${flex}
    font-weight: 600;
    font-size: .16rem;
    color: #000;
    &>img {
      /* width: .14rem;
      height: .22rem; */
      margin-right: .06rem;
    }
  }
  .healthFactor {
    ${flex}
    font-weight: 600;
    font-size: .16rem;
    color: #000;
  }
  .status {
    ${flex}
    font-weight: 500;
    font-size: .16rem;
  }
  .actionBtn {
    background: #000000;
    border: 1px solid rgba(255, 255, 255, .2);
    border-radius: 10px;
    line-height: .48rem;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, .2);
    font-weight: 600;
    font-size: .14rem;
    color: #fff;
    cursor: pointer;
    &:hover {
      color: #FF490F;
    }
  }
  .ant-table-thead {
    tr {
      th:nth-child(2) {
        width: 2.3rem !important;
      } 
      th:nth-child(3) {
        width: 1.7rem !important;
      } 
      th:nth-child(4) {
        width: 1.9rem !important;
      } 
      th:nth-child(5) {
        width: 1.6rem !important;
      }
      th:nth-child(6) {
        width: 1.8rem !important;
      }
      th:nth-child(7) {
        width: 1.9rem !important;
      }
      th {
        width: 3.5rem !important;
        padding: .16rem !important;
      }
    }
  }
  .ant-table-tbody {
    tr {
      td:nth-child(2) {
        width: 2.3rem !important;
      }
      td:nth-child(3) {
        width: 1.7rem !important;
      }
      td:nth-child(4) {
        width: 1.9rem !important;
      }
      td:nth-child(5) {
        width: 1.6rem !important;
      }  
      td:nth-child(6) {
        width: 1.8rem !important;
      }
      td:nth-child(7) {
        width: 1.9rem !important;
      }
      td {
        width: 3.5rem !important;
        padding: .16rem !important;
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
}

