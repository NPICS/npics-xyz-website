import { font1465 } from 'component/styled';
import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: #191919;
  padding: 172px 200px 162px;
  .left {
    width: 480px;
    margin-right: 30px;
    &>div:nth-child(1) {
      img {
        width: 480px;
        height: 480px;
        border-radius: 20px;
        display: inline-block;
        border: 0;
        outline: 0;
      }
    }
    .info {
      margin:20px 0;
      .info-content {
        margin: 0;
        padding: 0;
        padding: 15px 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        &>li:first-child{
          &>div {
            cursor: pointer;
          }
        }
        li {
          color: #fff;
          display: flex;
          justify-content: space-between;
          /* margin-bottom: 20px; */
          .address {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
    }
    .properties {
      
    }
  }
  .right {
    width: 1010px;
    .top-info {
      display: flex;
      margin-bottom: 24px;
      .backBtn {
        width: 36px;
        height: 36px;
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
      .cardId {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .collectionName {
          display: flex;
          flex-direction: column;
          &>div:nth-child(1) {
            font-family: 'PingFang HK';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
            display: flex;
            align-items: center;
            color: #fff;
          }
          &>div:nth-child(2) {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 800;
            font-size: 30px;
            line-height: 37px;
            color: #fff;
            margin-bottom: 10px;
          }
          &>div:nth-child(3) {
            display: flex;
            &>div {
              height: 28px;
              background: rgba(255, 255, 255, .2);
              border: 1px solid rgba(255, 255, 255, .3);
              border-radius: 20px;
              color: #fff;
              padding: 8px 8px 8px 8px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 15px;
              &>img {
                width: 20px;
                height: 20px;
                margin-right: 10px;
              }
            }
          }
        }
        .Owner {
          align-self: end;
          padding: 11px 19px;
          background: rgba(255, 255, 255, .1);
          border: 1px solid rgba(255, 255, 255, .2);
          border-radius: 10px;
          color: #fff;
          cursor: pointer;
          &>span {
            font-size: 14px;
        
            margin-left: 10px;
          }
          .address {
            &>span {
              display: inline-block;
              white-space: nowrap;
              font-size: 14px;
              color: rgba(255, 255, 255, .5);
              margin-right: 10px;
              line-height: 14px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .agreement-price {
      display: flex;
      flex-direction: column;
      height: 188px;
      background: rgba(255, 255, 255, .1);
      border: 1px solid rgba(255, 255, 255, .2);
      border-radius: 10px;
      .agreement-price-top {
        padding: 0 60px 0 40px;
        height: 102px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, .2);
        &>div {
          display: flex;
          flex-direction: column;
          &>span {
            font-family: 'PingFang HK';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: #fff;
          }
          &>div {
            img {
              vertical-align: middle;
              margin-bottom: 10px;
              margin-right: 10px;
            }
            span {
              display: inline-block;
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 800;
              font-size: 36px;
              color: #fff;
            }
          }
        }
      }
      .agreement-price-down {
        display: flex;
        height: 86px;
        .Funds {
          width: 100%;
          padding-left: 40px;
          display: flex;
          /* justify-content: space-between; */
          align-items: center;
          .minus {
            background: #000000;
            border: 1px solid rgba(255, 255, 255, .3);
            border-radius: 10px;
            width: 32px;
            height: 32px;
            color: #fff;
            display: flex;
            line-height: 30px;
            justify-content: center;
            margin-right: 46px;
          }
          .lump {
            display: flex;
            flex-direction: column;
            color: #fff;
            margin-right: 46px;
            &>div:nth-child(2) {
              color: rgba(255, 255, 255, .5);
              &>img {
                margin-left: 5px;
                width: 19px;
                height: 19px;
              }
            }
            .totalPrice {
              display: flex;
              align-items: center;
              &>span:nth-child(2) {
                margin-left: 10px;
                vertical-align: middle;
              }
              &>div {
                display: flex;
                align-items: center;
                &>span:nth-child(1) {
                  margin-left: 10px;
                  margin-right: 5px;
                  vertical-align: middle;
                }
                &>span:nth-child(2) {
                  font-weight: 400;
                  font-size: 14px;
                  vertical-align: bottom;
                }
              }
              
            }
            .fundsPrice {
              color: #fff;
              font-weight: 600;
              &>span {
                margin-left: 10px;
                vertical-align: middle;
              }
            }
          }
        }
        .ARP {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 260px;
          border-left: 1px solid rgba(255, 255, 255, .2);
          &>span:nth-child(1) {
            color: #fff;
          }
          &>span:nth-child(2) {
            color: rgba(255, 255, 255, .5);
          }
        }
      }
    }
    .activities {
      margin-top: 20px;
      .ant-select-arrow {
        color: rgba(255, 255, 255, .5);
      }
      .ant-select {
        align-self: end;
        min-width: 120px;
        border: transparent;
        border-radius: 10px;
      .ant-select-selector {
        border: none !important;
        box-shadow: none !important;
        text-align: center;
        display: flex;
        align-items: center;
        ${font1465}
        min-width: 100px;
        background-color: #1A1a1a;
        border: 1px solid rgba(255, 255, 255, .3) !important;
        border-radius: 10px;
      }
    }
    }
  }
`
export const MyModal = styled.div`
  .ant-modal-root {
    .ant-modal-wrap {
      overflow: hidden !important;
      .ant-modal{
        top: 30px ;
        width: 1200px !important;
        .ant-modal-content {
          .ant-modal-close {
            display: none;
          }
          .ant-modal-header {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #191919;
            border-bottom: none;
            .ant-modal-title {
              color: #fff;
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 800;
              font-size: 30px;
              line-height: 37px;
            }
          }
          .ant-modal-body {
            background-color: #191919;
            color: #fff;
            padding: 30px 60px;
          }
        }
      }
    }
  }
`

export const Properties = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  flex-wrap: wrap;
  padding: 15px 20px;
  grid-gap: 10px;
  & > div {
    background-image: linear-gradient(180deg,#F2BE58,#E84866);
    border-radius: 10px;
    padding: 1px;
    & > div{
      background: rgb(48,48,48);
      border-radius: 10px;
      padding: 10px 10px;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      color: #fff;
      height: 100%;
      &>div:nth-child(1) {
        font-weight: 600;
        font-size: 14px;
        color: #FF8933;
      }
      &>div:nth-child(2) {
        text-transform: capitalize;
        font-weight: 800;
        font-size: 16px;
        color: #fff;
      }
      &>div:nth-child(3) {
        font-weight: 600;
        font-size: 14px;
        color: rgba(255, 255, 255, .5);
      }
  
    }
  }
  &>div:nth-child(even) {
    margin-right: 0px;
  }
`
