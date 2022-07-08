import styled, { css } from 'styled-components';
import HomeBg from "../../assets/images/home/head_bg.png"

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
    padding: 1.3rem 0 .2rem;
    ${title};
  }
`
export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${HomeBg});
  background-size: 100% 100%;
`

export const HomeBox = styled.div`
  position: relative;
  width: 16rem;
  height: 100vh;
  margin: 0 auto;
  padding: 1rem 0 .2rem;
`

export const HomeLeft = styled.div`
  position: absolute;
  top: 36%;
  left: 0;
`
export const HomeNFT = styled.div`
  position: absolute;
  width: 26%;
  top: 26%;
  right: 10%;

  .nfts_img {
    width: 100%;
  }

  @media (min-width: 1024px) {
    top: 25% !important;
    right: 12% !important;
    width: 28%;
    // height: 22%;
  }

  @media (min-width: 1280px) {
    top: 25% !important;
    right: 12% !important;
    width: 28%;
  }

  @media (min-width: 1536px) {
    top: 25% !important;
    right: 12% !important;
    width: 28%;
    // height: 22%;
  }
`

export const FirstDiv = styled.div`
  position: relative;
  min-height: 9.8rem;
  padding-top: .9rem;
  padding-bottom: .9rem;
  box-sizing: border-box;
`
export const Projection = styled.div`
  height: 100%;
  position: relative;

  & > img {
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
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* filter: blur(13px); */
    /* backdrop-filter: blur(13px); */
    margin: -30px;
  }

  .text {
    position: absolute;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    box-sizing: border-box;
    margin-left: 1.83rem;
    margin-top: 2.5rem;

    & > div:nth-child(1) {
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

    & > div:nth-child(2) {
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

      & > img {
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

    & > a {
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
  background-color: rgba(255, 255, 255, .1);
  height: 5.4rem;
  padding: .6rem 0 1.06rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  .title {
    ${title};
  }
`

export const DetailBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 16rem;
  height: 88vh;
  margin: 0 auto;
  padding: 1.3rem 0 .2rem;
  color: #fff;
  .title{
    ${title};
    margin-bottom: 1rem;
  }
  .detail_div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .detail_info {
    width: 50%;
    flex: 1;
  }

  .detail_img_box {
    flex: 1;
    width: 50%;

    .detail_img {
      width: 100%;
      height: 100%;
    }
  }

`
export const Partners = styled.div`
  margin: 0 auto;
  padding-bottom: 2rem;

  .title {
    width: 5.3rem;
    margin: 0 auto;
    margin-bottom: .6rem;
    padding: 1.3rem 0 .2rem;
    ${title};
  }

  .partnerGroup {
    width: 14.4rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    gap: .3rem;
  }
`
export const PartnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 20px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.06);
  }

  img {
    width:${(props:{width:string})=>props.width};
  }

  span {
    width: .8rem;
    margin-left: 10px;
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 600;
    white-space: nowrap;
    font-size: .2rem;
  }
`
export const Introduces = styled.div`
  margin: 0 auto;
  /* margin-bottom: 1.6rem; */

  .title {
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    & > span:nth-child(1) {
      ${title}
      padding: 1.3rem 0 .2rem;
      text-align: center;
      margin-bottom: .27rem;
    }

    & > span:nth-child(2) {
      font-family: 'PingFang HK';
      font-style: normal;
      font-weight: 400;
      font-size: .16rem;
      line-height: .22rem;
      text-align: center;
      color: rgba(255, 255, 255, .6);
      margin-bottom: .66rem;
    }
  }

  .IntroduceGroup {
    width: 15.56rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;

    & > :nth-child(3n) {
      margin-right: 0 !important;
    }
  }

  .Introduces_swiper {
    width: 16rem;
    margin: 0 auto;
    /* padding: 1rem 0 .2rem; */
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
  justify-content: end;
  align-items: center;

  & > :nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 4.5rem;
    height: 5rem;
  }

  & > :nth-child(2) {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-size: .3rem;
    line-height: .37rem;
    width: 2.76rem;
    text-align: center;
    color: #FFFFFF;
  }

  & > :nth-child(3) {
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
  width: 16rem;
  /* height: 6rem; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding-top: 1.88rem;
  .borrow_left{
    width: 6.5rem;
    .borrow_title{
    font-size: 0.25rem;
    width: 5.9rem;
    margin-bottom: 0.53rem;
  }
  .borrow_step{
    padding-top: 0.3rem;
    .step_list{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .step_item{
        font-size: 0.2rem;
      }
    }
    .step_text{
      display: block;
      height: 0.76rem;
      font-size: 0.12rem;
      line-height: 0.18rem;
      color: rgba(255,255,255,0.5);
    }
  }
  .borrow_more{
    width: 4.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.2rem;
  }
  }
  .borrow_right{
    width: 9.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .borrow_channel{
    width: 8.5rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 20px;
    .channel_left{
      width: 35%;
      height: 100%;
      border-right: 2px dashed #191919;
      .left_content{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .left_content_apr{
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          & > span:nth-child(1){
          font-size: 0.22rem;
          line-height:0.2rem;
          }
          & > span:nth-child(2){
            font-size: 0.5rem;
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 800;
            line-height: 1rem;
            background: linear-gradient(268.82deg, #FF0000 0.48%, #FEB240 96.5%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
        }
      }
    }
    .channel_right{
      width: 65%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .content{
        width: 4.5rem;
        height: 1.1rem;
        margin: 0 auto;
        .content_apr{
          margin-bottom: 0.1rem;
          & > span:nth-child(1){
            font-size: 0.2rem;
            margin-bottom: 0.18rem;
          }
          & > span:nth-child(2){
            font-size: 0.32rem;
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 800;
            margin-left: 0.2rem;
            background: linear-gradient(268.82deg, #FF0000 0.48%, #FEB240 96.5%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
        }
        & > span{
          width: 3rem;
          color: rgba(255,255,255,0.5);
          font-size: 0.12rem;
        }
      }
    }
  }
  }

`
export const StepProgress = styled.div`
      position: relative;
      height: 2px;
      background: rgba(255,255,255,0.1);
      border-radius: 0.4rem;
      z-index: 2;
      margin:0.18rem auto 0.28rem;
      &::before{
        content: "";
        position: absolute;
        top: 0;
        left: ${(props: { left: string }) => props.left};
        width: 33.33%;
        border-radius: 0.4rem;
        height: 100%;
        background: #FF490F;
        z-index: 1;
        transition: all 0.3s ease-in-out;
      }
`

export const SliderChoose = styled.span`
  display: block;
  width: 3rem;
  padding: 0.1rem;
  text-align: center;
  font-size: .16rem;
  padding-left: 0.1rem;
  color: ${(props: { color: string }) => props.color};;
  cursor: pointer;

  &:hover {
    color: #fff;
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
