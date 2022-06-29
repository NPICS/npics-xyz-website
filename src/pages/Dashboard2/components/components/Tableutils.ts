import BigNumber from 'bignumber.js';
import { flex } from 'component/styled';
import styled from 'styled-components';


export const BgTable = styled.div`
  /* overflow: auto;
  height: 4.7rem;
  &::-webkit-scrollbar{
      display:none;
    } */
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
          width: .63rem;
          margin-right: .03rem;
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
    ${flex}
    font-weight: 500;
    font-size: .16rem;
    color: #000;
    &>span {
      width: 1.1rem;
      margin-right: .03rem;
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
      th {
        width: 2.15rem !important;
      }
    }
  }
  .ant-table-tbody {
    tr {  
      td {
        width: 2.15rem !important;
        /* height: 0 !important; */
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
