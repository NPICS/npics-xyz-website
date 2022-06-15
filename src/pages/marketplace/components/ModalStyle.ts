import styled from 'styled-components';

export const ModalBody = styled.div`
  .content {
    width: 10.8rem;
    /* height: 6.38rem; */
    margin: 0 auto;
    border: .01rem solid rgba(255,255,255,.2);
    border-radius: .1rem;
    .content-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: .01rem solid rgba(255,255,255,.2);
      height: .6rem;
      padding: .18rem 1rem .22rem;
      font-size: .14rem;
      color: #fff;
    }
    .content-agreement {
      padding: .2rem .3rem .35rem;
      .info {
        display: flex;
        justify-content: space-between; 
        &>div:nth-child(1) {
          display: flex;
          &>img {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: .2rem;
          }
          .nft-name {
            margin-left: .17rem;
            &>div:nth-child(1) {
              font-weight: 600;
              font-size: .14rem;
              color: rgba(255,255,255,.5);
              margin-bottom: .05rem;
            }
            &>div:nth-child(2) {
              font-weight: 600;
              font-size: .16rem;
              color: #fff;
              margin-bottom: .16rem;
            }
            &>div:nth-child(3) {
              display: flex;
              align-items: center;
              &>span {
                font-weight: 600;
                font-size: .14rem;
                color: rgba(255,255,255,.5);
              }
              &>img {
                width: .24rem;
                height: .24rem;
                margin-right: .1rem;
              }
            }
          }
        }
        &>div:nth-child(2) {
          display: flex;
          margin-right: .5rem;
          margin-top: .2rem;
          &>div:nth-child(1) {
            &>img {
              margin-top: 0.12rem;
              margin-right: 0.15rem;
              width: .26rem;
              height: .26rem;
            }
          }
          .priceAmount {
            &>div:nth-child(1) {
              font-size: .3rem;
              color: #fff;
              font-weight: 800;
            }
            &>div:nth-child(2) {
              font-size: .14rem;
              color: rgba(255,255,255,.5);
              font-weight: 400;
              //letter-spacing: 0.5px;
            }
          }
        }
      }
      .lump {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: .01rem solid rgba(255,255,255,.2) ;
        border-radius: .1rem;
        padding: .2rem .3rem .25rem;
        margin: .13rem 0;
        &>div {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .funds-Amount {
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            margin-right: 0.08rem;
            width: .22rem;
            height: .22rem;
          }
          &>span:nth-child(2) {
            font-weight: 600;
            font-size: .16rem;
          }
          &>span:nth-child(3) {
            margin-left: .1rem;
            font-size: .14rem;
            color:rgba(255,255,255,.5);
            //letter-spacing: 1px;
          }
        }
      }
      .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255,255,255,.2);
        border-radius: .1rem;
        height: .98rem;
        padding: .2rem .4rem .2rem .3rem;
        box-sizing: border-box;
        margin-bottom: .3rem;
        &>div:nth-child(1) {
          font-size: .2rem;
          color: #fff;
          font-weight: 600;
        }
        &>div:nth-child(2) {
          display: flex;
          img {
            display: inline-block;
            width: .3rem;
            height: .3rem;
            margin-top: 0.1rem;
            margin-right: 0.1rem;
          }
          .total-price {
            &>div:nth-child(1) {
              font-size: .3rem;
              color: #fff;
              font-weight: 800;
              font-style: italic;
            }
            &>div:nth-child(2) {
              font-size: .16rem;
              color: #fff;
              font-weight: 600;
            }
          }
        }
      }
      .pay-with {
        margin-bottom: .3rem;
      }

      .pay-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .failure {
        width: 100%;
        height: .66rem;
        line-height: .66rem;
        text-align: center;
        background: #D03434;
        border-radius: .1rem;
      }
      .success-content {
        .success {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 1rem;
          background: #7BD742;
          border-radius: .1rem;
          color: #000;
        }
        button {
          margin: .3rem auto 0;
        }
      }

    }
  }
  .confirm {
    display: flex;
    align-items: center;
    margin: .3rem auto .5rem;
    .ant-checkbox-wrapper {
      display: flex;
      align-items: center;
      margin-right: .1rem;
      .ant-checkbox {
        top: 0;
      }
      .ant-checkbox-inner {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 5px;
        width: 0.24rem;
        height: 0.24rem;
        animation: all 0;
        &::after {
          width: 0.09rem;
          height: 0.15rem;
        }
      }
      .ant-checkbox-checked::after {
        border: 0;
      }
    }

    .checkText {
      font-weight: 600;
      font-size: .14rem;
      color: #fff;
      a {
        font-weight: 600;
        font-size: .14rem;
        color: #fff;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .2rem;
    .footerBtn {
      width: 5rem;
      margin:0 auto ;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`

export const PayButton = styled.button<{ active: boolean }>`
  padding: .2rem .6rem .2rem .92rem;
  display: flex;
  align-items: center;
  border-radius: .1rem;
  border: ${(props => props.active ? '0' : '.01rem solid #FFFFFF')};
  color: ${(props => props.active ? '#000000' : '#FFFFFF')};
  background: ${(props => props.active ? '#7BD742' : '#000000')};
  cursor: pointer;
  position: relative;
  &>div {
    width: 3.5rem;
    height: .2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>div:nth-child(1){
      font-weight: 600;
      font-size: .18rem;
    }
    &>div:nth-child(2){
      display: flex;
      align-items: center;
      img {
        display: inline-block;
        width: .24rem;
        height: .24rem;
      }
      font-weight: 600;
      font-size: .2rem;
    }
  }
  &>img {
    position: absolute;
    top: .2rem;
    left: .6rem;
    width: .2rem;
    height: .2rem;
  }
`