import { font1455, font1651, font2071 } from 'component/styled';
import styled, { css } from 'styled-components';

export const title = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  font-size: .36rem;
  color: #FFFFFF;
`

export const HomeWrap = styled.div`
  height: 100%;
  background: #1A1A1A;
  margin: 0 auto;
  .collections-title {
    width: 16rem;
    margin: 0 auto;
    padding: 1rem 0 .2rem;
    ${title};
  }
`
export const FirstDiv = styled.div`
  position: relative;
  min-height: 9.8rem;
  padding-top: .9rem;
  padding-bottom: .9rem;
  box-sizing: border-box;
`
export const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  background: linear-gradient(284.6deg, #712EFF 0%, rgba(255, 191, 145, 0) 48.96%, #FF2626 100%);
  &>img:nth-child(1) {
    position: absolute;
    bottom: 0rem;
    left: -.49rem;
    width: 5.44rem;
    height: 4.53rem;
    object-fit: cover;
  }
  &>img:nth-child(2) {
    position: absolute;
    right: 0.64rem;
    top: -3.41rem;
    width: 5.44rem;
    height: 5.44rem;
    object-fit: cover;
  }
`
export const Projection = styled.div`
  height: 100%;
  &>img {
    position: absolute;
    left: 10rem;
    top: 2rem;
    width: 5.45rem;
    height: 5.4rem;
  }
`
export const Glass = styled.div`
  height: 100%;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    filter: blur(13px);
    backdrop-filter: blur(13px);
    margin: -30px;
  }
  .text {
    position: absolute;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    box-sizing: border-box;
    margin-left: 1.83rem;
    margin-top: 2.5rem;
    &>div:nth-child(1) {
      font-family: 'Montserrat';
      font-style: italic;
      font-weight: 900;
      font-size: .4rem;
      line-height: .49rem;
      text-transform: uppercase;
      color: #FFFFFF;
      width: 5.83rem;
      margin-bottom: .1rem;
    }
    &>div:nth-child(2) {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 300;
      font-size: .16rem;
      line-height: .32rem;
      letter-spacing: 0.05em;
      color: rgba(255, 255, 255, 0.5);
      width: 5.41rem;
      margin-bottom: .47rem;
    }
    .jumpBtn {
      display: flex;
      button {
        margin-right: .2rem;
      }
    }
  }
  .imgUrl {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 4.24rem;
    height: 4.2rem;
    /* padding-top: 0.9rem;
    padding-bottom: 0.9rem; */
    box-sizing: border-box;
    margin-left: 11rem;
    margin-top: 2.5rem;
    img {
      display: block;
      width: 1.2rem;
      height: 1.2rem;
    }
    .col1 {
      display: flex;
      flex-direction: column;
      align-self: end;
      &>img {
        margin-top: .3rem;
      }
    }
    .col2 {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    .col3 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .socialityIcon {
    display: flex;
    position: absolute;
    bottom: .9rem;
    width: 100%;
    display: flex;
    justify-content: center;
    &>a {
      margin: 0 .15rem;
      cursor: pointer;
      img {
        width: .22rem;
        height: .22rem;
      }
    }
  }
`

export const SwiperBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: rgba(255,255,255,.1);
  height: 5.4rem;
  padding: .6rem 0 1.06rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .title {
    ${title};
  }
`
export const Partners = styled.div`
  margin: 0 auto;
  padding-bottom: 2.21rem;
  .title {
    width: 5.3rem;
    margin: 0 auto;
    margin-bottom: .6rem;
    ${title};
  }
  .partnerGroup {
    width: 14.4rem;
    margin: 0 auto;
    &>:nth-child(3n) {
      margin-right: 0 !important;
    }
    display: flex;
    flex-wrap: wrap;
  }
`
export const PartnerBox = styled.div`
  position: relative;
  width: 4.6rem;
  height: 2.1rem;
  border: .01rem solid rgba(255,255,255,.2);
  border-radius: .1rem;
  padding: .2rem .3rem .32rem .3rem;
  margin-right: .3rem;
  margin-bottom: .3rem;
  box-sizing: border-box;
  &>:nth-child(1) {
    width: .8rem;
    height: .8rem;
    background-color: #000;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &>:nth-child(2) {
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 600;
    font-size: .22rem;
    color: #FFFFFF;
    margin: .2rem 0 .1rem ;
  }
  &>:nth-child(3) {
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 600;
    white-space: nowrap;
    font-size: .14rem;
    color: rgba(255, 255, 255, 0.6);
  }
  &::before {
    content:  '${(props:{content:string}) => props.content}';
    color: #FFFFFF;
    font-weight: 600;
    font-size: .16rem;;
    position: absolute;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 1.1rem;
    height: .44rem;
    line-height: .44rem;
    text-align: center;
    background: rgba(255,255,255,.1);
    top: 0;
    right: 0;
  }
`
export const Introduces = styled.div`
  margin: 0 auto;
  margin-bottom: 1.6rem;
  .title {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    &>span:nth-child(1) {
      ${title}
      text-align: center;
      margin-bottom: .27rem;
    }
    &>span:nth-child(2) {
      font-family: 'PingFang HK';
      font-style: normal;
      font-weight: 400;
      font-size: .16rem;
      line-height: .22rem;
      text-align: center;
      color: rgba(255,255,255,.6);
      margin-bottom: .66rem;
    }
  }
  .IntroduceGroup {
    width: 15.56rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    &>:nth-child(3n) {
      margin-right: 0 !important;
    }
  }
`
export const IntroduceBox = styled.div`
  position: relative;
  width: 4.5rem;
  height: 5rem;
  border: .01rem solid rgba(255, 255, 255, 0.2);
  border-radius: .1rem;
  margin-right: 1.03rem;
  box-sizing: border-box;
  padding-bottom: .87rem;
  display: flex;
  flex-direction: column;
  justify-content:end ;
  align-items: center;
  &>:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 4.5rem;
    height: 5rem;
  }
  &>:nth-child(2) {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-size: .3rem;
    line-height: .37rem;
    width: 2.76rem;
    text-align: center;
    color: #FFFFFF;
  }
  &>:nth-child(3) {
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 400;
    font-size: .16rem;
    line-height: .24rem;
    width: 3.28rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
  }
`

export const BorrowBox = styled.div`
  position: relative;
  height: 10.5rem;
  &>img:nth-child(1) {
    position: absolute;
    top: -1.44rem;
    left: 0;
    width: 5.44rem;
    height: 5.44rem;
    object-fit: cover;
  }
  &>img:nth-child(2) {
    position: absolute;
    right: 0;
    bottom: 1.44rem;
    width: 5.44rem;
    height: 5.44rem;
    object-fit: cover;
  }

` 
export const BorrowGlass = styled.div`
  width: 14.7rem;
  min-height: 8.62rem;
  margin: 0 auto;
  margin-top: 1.44rem;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: .2rem;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    filter: blur(30px);
    backdrop-filter: blur(30px);
    margin: -30px;
  }
`

export const BorrowContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0.84rem 0 .6rem;
  box-sizing: border-box;
  .title {
    width: 9.82rem;
    margin: 0 auto;
    margin-bottom: .6rem;
    text-align: center;
    white-space: pre-wrap;
    ${title};
  }
  .sliderBox {
    width: 10rem;
    margin: 0 auto;
    .sliderItem {
      display: flex;
      width: 10rem;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      span {
        display: inline-block;
        width: 2rem;
        text-align: center;
        font-family: 'PingFang HK';
        font-style: normal;
        font-weight: 600;
        font-size: .16rem;
        text-align: center;
        color: rgba(255,255,255,.6);
        cursor: pointer;
      }
    }
    .slider {
      width: 8rem;
      height: .1rem;
      background: #FFFFFF;
      border-radius: .3rem;
      position: relative;
      margin: .18rem auto .24rem;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: ${(props:{left:string}) => props.left};
        height: .1rem;
        background: #FF490F;
        border-radius: .3rem;
        transition: width 500ms;
      }
    }
    .text {
      text-align: center;
      max-width: 6.94rem;
      height: .3rem;
      margin: 0 auto;
      font-family: 'PingFang HK';
      font-style: normal;
      font-weight: 300;
      font-size: .16rem;
      color: #FFFFFF;
    }
  }
  .BorrowChannel {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 11rem;
    margin: 0 auto;
    margin-top: .78rem;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    .left {
      display: flex;
      flex-direction: column;
      padding: .77rem .81rem .77rem .91rem;
      &>span:nth-child(1) {
        ${font2071}
      }
      &>span:nth-child(2) {
        display: inline-block;
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 800;
        font-size: .6rem;
        background: linear-gradient(268.82deg, #FF0000 0.48%, #FEB240 96.5%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      padding: .45rem 0 .45rem 1rem;
      gap: .6rem;
      .content {
        display: flex;
        align-items: center;
        .text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: .3rem;
          &>div {
            display: flex;
            flex-direction: row;
            align-items: center;
            &>span:nth-child(1) {
              ${font1651}
              font-family: 'Montserrat';
              font-style: normal;
              margin-right: .3rem;
            }
            &>span:nth-child(2) {
              display: inline-block;
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 700;
              font-size: .3rem;
              background: linear-gradient(268.82deg, #FF0000 0.48%, #FEB240 96.5%); 
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              text-fill-color: transparent;
            }
          }
          &>span {
            ${font1455}
            font-family: 'PingFang HK';
            font-style: normal;
            line-height: .17rem;
          }
        }
      }
    }
  }

`

export const BorrowBtn = styled.div`
  width: 6.3rem;
  padding-top: .4rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`
