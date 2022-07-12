import BigNumber from 'bignumber.js';
import { flex, font1665 } from 'component/styled';
import styled from 'styled-components';


export const BgTable = styled.div`
  overflow: auto;
  height: 470px;
  &::-webkit-scrollbar{
      display:none;
    }
  .items {
    display: flex;
    cursor: pointer;
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 10px;
    }
    .text {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      &>div:nth-child(1) {
        display: flex;
        flex-wrap: nowrap;
        color: #fff;
        font-size: 16px;
        &>span:nth-child(1) {
          max-width: 42px;
          margin-right: 3px;
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
        font-size: 14px;
        &>span {
          ${flex}
          &>img {
            margin: 0 4px 0 8px;
            height: 14px;
          }
        }
      }
    }
  }
  .contract {
    ${flex}
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    &>span {
      max-width: 42px;
      margin-right: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    color: #fff;
    &>img {
      width: 14px;
      height: 22px;
      margin-right: 6px;
    }
  }
  .healthFactor {
    ${flex}
    font-weight: 600;
    font-size: 16px;
    color: #fff;
  }
  .status {
    ${flex}
    font-weight: 500;
    font-size: 16px;
  }


  .ant-table-thead {
    tr {
      th {
        width: 185px !important;
      }
    }
  }
  .ant-table-tbody {
    tr {  
      td {
        width: 185px !important;
        height: 0 !important;
      }
    }
    .actionBtn {
      background: #000000;
      border: 1px solid rgba(255, 255, 255, .2);
      border-radius: 10px;
      width: 120px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, .2);
      font-weight: 600;
      font-size: 14px;
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
  margin-bottom: 20px;
  .total {
    display: flex;
    align-items: end;
    .backBtn {
      width: 36px;
      height: 36px;
      line-height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: rgba(255, 255, 255, .2);
      border: 1px solid rgba(255, 255, 255, .3);
      border-radius: 5px;
      margin-right: 15px;
      cursor: pointer;
    }
    .title {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 800;
      font-size: 30px;
      color: #fff;
    }
    .collection-name {
      ${font1665};
    }
  }
  .checkBtn {
    width: 148px;
    height: 42px;
    padding: 11px 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #000000;
    border: 1px solid rgba(255, 255, 255, .2);
    border-radius: 10px;
    &>div:nth-child(1) {
      margin-right: 10px;
    }
    &>div:nth-child(2) {
      color: #7BD742;
    }
  }
}
.price {
  display: flex;
  width: 1270px;
  /* height: 306px; */
  padding: 20px;
  align-items: center;
  background: rgba(255, 255, 255, .1);
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 10px;
  &>img {
    width: 258px;
    height: 258px;
    border-radius: 10px;
    margin-right: 114px;
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
    grid-gap: 30px;
    &>div {
      display: flex;
      flex-direction: column;
      &>div:nth-child(1) {
        font-weight: 500;
        font-size: 14px;  
        color: rgba(255,255,255,.5);
      }
      &>div:nth-child(2) {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 20px;
        &>:first-child {
          margin-right: 8px;
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
  margin-top: 50px;
  &>div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 108px;
    height: 42px;
    background: #000000;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, .2);
    border-radius: 10px;
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
  }
  .Repay {
    margin-right: 10px;
  }
  .active {
    background: #fff;
    color: #000000;
  }
}
`

export const Repay = styled.div`
  width: 1270px;
  margin-top: 20px;
  .panel {
    background: rgba(255, 255, 255, .1);
    border: 1px solid rgba(255, 255, 255, .2);
    border-radius: 10px;
    overflow: hidden;
    .enough {
      background: #7BD742;
      color: #000;
      height: 88px;
      ${flex}
      font-weight: 600;
    }
    .hint {
      ${flex}
      background: blue;
      color: #fff;
      height: 88px;
      text-align: center;
      font-weight: 600;
    }
    .un-enough {
      background: #D03434;
      color: #fff;
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-weight: 600;
    }
    .repayPrice {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 192px;
      color: #ffffff;
      .space {
        margin-left: 5px;
      }
    }
  }

  .progress {
    margin-top: 35px;
  }

  .confirm {
    margin-top: 100px;
    margin-bottom: 150px;
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
