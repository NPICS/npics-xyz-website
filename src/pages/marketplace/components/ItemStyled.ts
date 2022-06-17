import { font1465 } from 'component/styled';
import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: #191919;
  padding: 1.72rem 2rem 1.62rem;
  .left {
    width: 4.8rem;
    margin-right: .3rem;
    &>div:nth-child(1) {
      img {
        width: 4.8rem;
        height: 4.8rem;
        border-radius: 20px;
        display: inline-block;
        border: 0;
        outline: 0;
      }
    }
    .info {
      margin:.2rem 0;
      .info-content {
        margin: 0;
        padding: 0;
        padding: .15rem .2rem;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        &>li:first-child{
          &>div {
            cursor: pointer;
          }
        }
        li {
          color: #fff;
          display: flex;
          justify-content: space-between;
          /* margin-bottom: .2rem; */
          .address {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
            vertical-align: middle;
            margin-right: .05rem;
          }
        }
      }
    }
    .properties {
      
    }
  }
  .right {
    width: 10.1rem;
    .top-info {
      display: flex;
      margin-bottom: .24rem;
      .backBtn {
        width: .36rem;
        height: .36rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
        border: .01rem solid rgba(255, 255, 255, 0.3);
        border-radius: .05rem;
        margin-right: .15rem;
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
            font-size: .16rem;
            line-height: .22rem;
            display: flex;
            align-items: center;
            color: #FFFFFF;
          }
          &>div:nth-child(2) {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 800;
            font-size: .30rem;
            line-height: .37rem;
            color: #FFFFFF;
            margin-bottom: .1rem;
          }
          &>div:nth-child(3) {
            display: flex;
            &>div {
              height: .28rem;
              background: rgba(255, 255, 255, 0.2);
              border: .01rem solid rgba(255, 255, 255, 0.3);
              border-radius: .2rem;
              color: #fff;
              padding: .08rem .08rem .08rem .08rem;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: .15rem;
              &>img {
                width: .2rem;
                height: .2rem;
                margin-right: .1rem;
              }
            }
          }
        }
        .Owner {
          align-self: end;
          padding: .11rem .19rem;
          background: rgba(255, 255, 255, 0.1);
          border: .01rem solid rgba(255, 255, 255, 0.2);
          border-radius: .1rem;
          color: #fff;
          cursor: pointer;
          &>span {
            font-size: .14rem;
        
            margin-left: .1rem;
          }
          .address {
            &>span {
              display: inline-block;
              white-space: nowrap;
              font-size: .14rem;
              color: rgba(255, 255, 255, 0.5);
              margin-right: .1rem;
              line-height: .14rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .agreement-price {
      display: flex;
      flex-direction: column;
      height: 1.88rem;
      background: rgba(255, 255, 255, 0.1);
      border: .01rem solid rgba(255, 255, 255, 0.2);
      border-radius: .1rem;
      .agreement-price-top {
        padding: 0 .6rem 0 .4rem;
        height: 1.02rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: .01rem solid rgba(255, 255, 255, 0.2);
        &>div {
          display: flex;
          flex-direction: column;
          &>span {
            font-family: 'PingFang HK';
            font-style: normal;
            font-weight: 500;
            font-size: .14rem;
            color: #FFFFFF;
          }
          &>div {
            img {
              vertical-align: middle;
              margin-bottom: 0.1rem;
              margin-right: 0.1rem;
            }
            span {
              display: inline-block;
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 800;
              font-size: .36rem;
              color: #FFFFFF;
            }
          }
        }
      }
      .agreement-price-down {
        display: flex;
        height: 0.86rem;
        .Funds {
          width: 100%;
          padding-left: .4rem;
          display: flex;
          /* justify-content: space-between; */
          align-items: center;
          .minus {
            background: #000000;
            border: .01rem solid rgba(255, 255, 255, 0.3);
            border-radius: .1rem;
            width: .32rem;
            height: .32rem;
            color: #fff;
            display: flex;
            line-height: .3rem;
            justify-content: center;
            margin-right: .46rem;
          }
          .lump {
            display: flex;
            flex-direction: column;
            color: #fff;
            margin-right: .46rem;
            &>div:nth-child(2) {
              color: rgba(255, 255, 255, 0.5);
              &>img {
                margin-left: .05rem;
                width: .19rem;
                height: .19rem;
              }
            }
            .totalPrice {
              display: flex;
              align-items: center;
              &>span:nth-child(2) {
                margin-left: .1rem;
                vertical-align: middle;
              }
              &>div {
                display: flex;
                align-items: center;
                &>span:nth-child(1) {
                  margin-left: .1rem;
                  margin-right: .05rem;
                  vertical-align: middle;
                }
                &>span:nth-child(2) {
                  font-weight: 400;
                  font-size: .14rem;
                  vertical-align: bottom;
                }
              }
              
            }
            .fundsPrice {
              color: #fff;
              font-weight: 600;
              &>span {
                margin-left: .1rem;
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
          width: 2.6rem;
          border-left: .01rem solid rgba(255, 255, 255, 0.2);
          &>span:nth-child(1) {
            color: #fff;
          }
          &>span:nth-child(2) {
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
    .activities {
      margin-top: .2rem;
      .ant-select-arrow {
        color: rgba(255, 255, 255, 0.5);
      }
      .ant-select {
        align-self: end;
        min-width: 1.2rem;
        border: transparent;
        border-radius: 0.1rem;
      .ant-select-selector {
        border: none !important;
        box-shadow: none !important;
        text-align: center;
        display: flex;
        align-items: center;
        ${font1465}
        min-width: 1rem;
        background-color: #1A1a1a;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
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
        top: .3rem ;
        width: 12rem !important;
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
              color: #FFFFFF;
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 800;
              font-size: .3rem;
              line-height: .37rem;
            }
          }
          .ant-modal-body {
            background-color: #191919;
            color: #FFFFFF;
            padding: .3rem .6rem;
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
  padding: .15rem .2rem;
  grid-gap: .1rem;
  & > div {
    background-image: linear-gradient(180deg,#F2BE58,#E84866);
    border-radius: 10px;
    padding: 1px;
    & > div{
      background: rgb(48,48,48);
      border-radius: 10px;
      padding: .1rem .1rem;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      color: #fff;
      height: 100%;
      &>div:nth-child(1) {
        font-weight: 600;
        font-size: .14rem;
        color: #FF8933;
      }
      &>div:nth-child(2) {
        text-transform: capitalize;
        font-weight: 800;
        font-size: .16rem;
        color: #fff;
      }
      &>div:nth-child(3) {
        font-weight: 600;
        font-size: .14rem;
        color: rgba(255, 255, 255, 0.5);
      }
  
    }
  }
  &>div:nth-child(even) {
    margin-right: 0rem;
  }
`
