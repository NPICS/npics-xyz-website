import styled from 'styled-components';

export const ModalBody = styled.div`
  .content {
    width: 1080px;
    /* height: 638px; */
    margin: 0 auto;
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 10px;
    .content-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,.2);
      height: 60px;
      padding: 18px 100px 22px;
      font-size: 14px;
      color: #fff;
    }
    .content-agreement {
      padding: 20px 30px 35px;
      .info {
        display: flex;
        justify-content: space-between; 
        &>div:nth-child(1) {
          display: flex;
          &>img {
            width: 120px;
            height: 120px;
            border-radius: 20px;
          }
          .nft-name {
            margin-left: 17px;
            &>div:nth-child(1) {
              font-weight: 600;
              font-size: 14px;
              color: rgba(255,255,255,.5);
              margin-bottom: 5px;
            }
            &>div:nth-child(2) {
              font-weight: 600;
              font-size: 16px;
              color: #fff;
              margin-bottom: 16px;
            }
            &>div:nth-child(3) {
              display: flex;
              align-items: center;
              &>span {
                font-weight: 600;
                font-size: 14px;
                color: rgba(255,255,255,.5);
              }
              &>img {
                width: 24px;
                height: 24px;
                margin-right: 10px;
              }
            }
          }
        }
        &>div:nth-child(2) {
          display: flex;
          margin-right: 50px;
          margin-top: 20px;
          &>div:nth-child(1) {
            &>img {
              margin-top: 12px;
              margin-right: 15px;
              width: 26px;
              height: 26px;
            }
          }
          .priceAmount {
            &>div:nth-child(1) {
              font-size: 30px;
              color: #fff;
              font-weight: 800;
            }
            &>div:nth-child(2) {
              font-size: 14px;
              color: rgba(255,255,255,.5);
              font-weight: 400;
              //letter-spacing: .5px;
            }
          }
        }
      }
      .lump {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid rgba(255,255,255,.2) ;
        border-radius: 10px;
        padding: 20px 30px 25px;
        margin: 13px 0;
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
            margin-right: 8px;
            width: 22px;
            height: 22px;
          }
          &>span:nth-child(2) {
            font-weight: 600;
            font-size: 16px;
          }
          &>span:nth-child(3) {
            margin-left: 10px;
            font-size: 14px;
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
        border-radius: 10px;
        height: 98px;
        padding: 20px 40px 20px 30px;
        box-sizing: border-box;
        margin-bottom: 30px;
        &>div:nth-child(1) {
          font-size: 20px;
          color: #fff;
          font-weight: 600;
        }
        &>div:nth-child(2) {
          display: flex;
          img {
            display: inline-block;
            width: 30px;
            height: 30px;
            margin-top: 10px;
            margin-right: 10px;
          }
          .total-price {
            &>div:nth-child(1) {
              font-size: 30px;
              color: #fff;
              font-weight: 800;
              font-style: italic;
            }
            &>div:nth-child(2) {
              font-size: 16px;
              color: #fff;
              font-weight: 600;
            }
          }
        }
      }
      .pay-with {
        margin-bottom: 30px;
      }

      .pay-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .failure {
        width: 100%;
        height: 66px;
        line-height: 66px;
        text-align: center;
        background: #D03434;
        border-radius: 10px;
      }
      .success-content {
        .success {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100px;
          background: #7BD742;
          border-radius: 10px;
          color: #000;
        }
        button {
          margin: 30px auto 0;
        }
      }

    }
  }
  .confirm {
    display: flex;
    align-items: center;
    margin: 30px auto 50px;
    .ant-checkbox-wrapper {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .ant-checkbox {
        top: 0;
      }
      .ant-checkbox-inner {
        background: rgba(255, 255, 255, .2);
        border: 1px solid rgba(255, 255, 255, .3);
        border-radius: 5px;
        width: 24px;
        height: 24px;
        animation: all 0;
        &::after {
          width: 9px;
          height: 15px;
        }
      }
      .ant-checkbox-checked::after {
        border: 0;
      }
    }

    .checkText {
      font-weight: 600;
      font-size: 14px;
      color: #fff;
      a {
        font-weight: 600;
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .footerBtn {
      width: 500px;
      margin:0 auto ;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`

export const PayButton = styled.button<{ active: boolean }>`
  padding: 20px 60px 20px 92px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: ${(props => props.active ? '0' : '1px solid #fff')};
  color: ${(props => props.active ? '#000000' : '#fff')};
  background: ${(props => props.active ? '#7BD742' : '#000000')};
  cursor: pointer;
  position: relative;
  &>div {
    width: 350px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>div:nth-child(1){
      font-weight: 600;
      font-size: 18px;
    }
    &>div:nth-child(2){
      display: flex;
      align-items: center;
      img {
        display: inline-block;
        width: 24px;
        height: 24px;
      }
      font-weight: 600;
      font-size: 20px;
    }
  }
  &>img {
    position: absolute;
    top: 20px;
    left: 60px;
    width: 20px;
    height: 20px;
  }
`