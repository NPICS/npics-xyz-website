import BigNumber from 'bignumber.js';
import { flex, font1665 } from 'component/styled';
import styled from 'styled-components';


export const BgTable = styled.div`
  overflow: auto;
  height: 4.7rem;
  &::-webkit-scrollbar{
      display:none;
    }
  .items {
    display: flex;
    cursor: pointer;
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
        color: #fff;
        font-size: .16rem;
        &>span:nth-child(1) {
          max-width: .42rem;
          margin-right: .03rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

        }
        &>span:nth-child(2) {
          white-space: nowrap;
        }
      }
      &>div:nth-child(2) {
        display: flex;
        color: rgba(255, 255, 255, .5);
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
    color: #fff;
    cursor: pointer;
    &>span {
      max-width: .42rem;
      margin-right: .03rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    color: #fff;
    &>img {
      width: .14rem;
      height: .22rem;
      margin-right: .06rem;
    }
  }
  .healthFactor {
    ${flex}
    font-weight: 600;
    font-size: .16rem;
    color: #fff;
  }
  .status {
    ${flex}
    font-weight: 500;
    font-size: .16rem;
  }


  .ant-table-thead {
    tr {
      th {
        width: 1.85rem !important;
      }
    }
  }
  .ant-table-tbody {
    tr {  
      td {
        width: 1.85rem !important;
        height: 0 !important;
      }
      &>td:last-child {
        border-bottom-right-radius: 0 !important;
        border-top-right-radius: 0 !important;
      }
    }
    .actionBtn {
      background: #000000;
      border: 1px solid rgba(255, 255, 255, .2);
      border-radius: 10px;
      width: 1.2rem;
      height: .48rem;
      line-height: .48rem;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, .2);
      font-weight: 600;
      font-size: .14rem;
      cursor: pointer;
    }
    .ant-table-placeholder {
  
      .ant-empty-description {
        color: #fff;
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
  }
`

export const Wrap = styled.div`
.info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: .2rem;
  .total {
    display: flex;
    align-items: end;
    .backBtn {
      width: .36rem;
      height: .36rem;
      line-height: .36rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: rgba(255, 255, 255, .2);
      border: .01rem solid rgba(255, 255, 255, .3);
      border-radius: .05rem;
      margin-right: .15rem;
      cursor: pointer;
    }
    .title {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 800;
      font-size: .3rem;
      color: #fff;
    }
    .collection-name {
      ${font1665};
    }
  }
  .checkBtn {
    width: 1.48rem;
    height: .42rem;
    padding: .11rem .18rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #000000;
    border: 1px solid rgba(255, 255, 255, .2);
    border-radius: 10px;
    &>div:nth-child(1) {
      margin-right: .1rem;
    }
    &>div:nth-child(2) {
      color: #7BD742;
    }
  }
}
.price {
  display: flex;
  width: 12.7rem;
  /* height: 3.06rem; */
  padding: .2rem;
  align-items: center;
  background: rgba(255, 255, 255, .1);
  border: .01rem solid rgba(255, 255, 255, .2);
  border-radius: .1rem;
  &>img {
    width: 2.58rem;
    height: 2.58rem;
    border-radius: 10px;
    margin-right: 1.14rem;
  }
  .price-item {
    color: #fff;
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap; */
    display: grid;
    grid-template-columns: repeat(3,auto);
    flex: 1;
    grid-gap: .3rem;
    &>div {
      display: flex;
      flex-direction: column;
      &>div:nth-child(1) {
        font-weight: 500;
        font-size: .14rem;  
        color: rgba(255,255,255,.5);
      }
      &>div:nth-child(2) {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: .2rem;
        &>:first-child {
          margin-right: .08rem;
        }
      }
      &>div {
        white-space: nowrap;
      }
    }
  }
}
.rotation {
  display: flex;
  margin-top: .5rem;
  &>div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.08rem;
    height: .42rem;
    background: #000000;
    color: #fff;
    border: .01rem solid rgba(255, 255, 255, .2);
    border-radius: .1rem;
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 600;
    font-size: .16rem;
    cursor: pointer;
  }
  .Repay {
    margin-right: .1rem;
  }
  .active {
    background: #fff;
    color: #000000;
  }
}
`

export const Repay = styled.div`
  width: 12.7rem;
  margin-top: .2rem;
  .panel {
    background: rgba(255, 255, 255, .1);
    border: .01rem solid rgba(255, 255, 255, .2);
    border-radius: .1rem;
    overflow: hidden;
    .enough {
      background: #7BD742;
      color: #000;
      height: .88rem;
      ${flex}
      font-weight: 600;
    }
    .hint {
      ${flex}
      background: blue;
      color: #fff;
      height: .88rem;
      text-align: center;
      font-weight: 600;
    }
    .un-enough {
      background: #D03434;
      color: #fff;
      height: .88rem;
      line-height: .88rem;
      text-align: center;
      font-weight: 600;
    }
    .repayPrice {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 1.92rem;
      color: #ffffff;
      .space {
        margin-left: .05rem;
      }
    }
  }

  .progress {
    margin-top: .35rem;
  }

  .confirm {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    button {
      margin: 0 auto;
    }
  }
`

export const Offers = styled.div`
`
export interface Result {
  createTime: string,
  id: number,
  nftAddress: string,
  tokenId: string,
  userAddress: string,
  imageUrl: string
  floorPrice: string;
}

export interface Record extends Result {
  collectionName: string;
  debtData:DebtData,
  liquidatePrice: LiquidatePrice
}

export interface DebtData{
  loanId: number,
  reserveAsset: string,
  totalCollateral: BigNumber,
  totalDebt: BigNumber,
  availableBorrows: BigNumber,
  healthFactor: BigNumber
}
export interface LiquidatePrice{
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
  status: string;
  statusSrt: string;
  address: string;
  tokenId: string;
  imageUrl: string;
  floorPrice: string;
  collectionName: string;
}
