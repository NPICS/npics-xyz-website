import styled, { css } from 'styled-components';
import HomeBg from "../../assets/images/home/head_bg.png"

export const title = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  color: #FFFFFF;
`

export const HomeWrap = styled.div`
  height: 100%;
  background: #1A1A1A;
  margin: 0 auto;
  min-width: 1600px;
  .collections-title {
    width: 1600px;
    margin: 0 auto;
    padding: 130px 0 40px;
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
  width: 1600px;
  height: 100vh;
  margin: 0 auto;
  padding: 100px 0 20px;
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
  min-height: 980px;
  padding-top: 90px;
  padding-bottom: 90px;
  box-sizing: border-box;
`
export const Projection = styled.div`
  height: 100%;
  position: relative;

  & > img {
    position: absolute;
    left: 1000px;
    top: 200px;
    width: 545px;
    height: 540px;
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
    padding-top: 90px;
    padding-bottom: 90px;
    box-sizing: border-box;
    margin-left: 183px;
    margin-top: 250px;

    & > div:nth-child(1) {
      font-family: 'Montserrat';
      font-style: italic;
      font-weight: 900;
      font-size: 40px;
      line-height: 49px;
      text-transform: uppercase;
      color: #FFFFFF;
      width: 583px;
      margin-bottom: 10px;
    }

    & > div:nth-child(2) {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 32px;
      letter-spacing: 0.05em;
      color: rgba(255, 255, 255, 0.5);
      width: 541px;
      margin-bottom: 47px;
    }

    .jumpBtn {
      display: flex;

      button {
        margin-right: 20px;
      }
    }
  }

  .imgUrl {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 424px;
    height: 420px;
    /* padding-top: 90px;
    padding-bottom: 90px; */
    box-sizing: border-box;
    margin-left: 1100px;
    margin-top: 250px;

    img {
      display: block;
      width: 120px;
      height: 120px;
    }

    .col1 {
      display: flex;
      flex-direction: column;
      align-self: end;

      & > img {
        margin-top: 30px;
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
    bottom: 90px;
    width: 100%;
    display: flex;
    justify-content: center;

    & > a {
      margin: 0 15px;
      cursor: pointer;

      img {
        width: 22px;
        height: 22px;
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
  height: 540px;
  padding: 60px 0 106px;
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
  width: 1600px;
  height: 88vh;
  margin: 0 auto;
  padding: 130px 0 20px;
  color: #fff;
  .title{
    ${title};
    margin-bottom: 100px;
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
  padding-bottom: 200px;

  .title {
    width: 530px;
    margin: 0 auto;
    margin-bottom: 60px;
    padding: 130px 0 20px;
    ${title};
  }

  .partnerGroup {
    width: 1440px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    gap: 30px;
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
    width: 80px;
    margin-left: 10px;
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 600;
    white-space: nowrap;
    font-size: 20px;
  }
`
export const Introduces = styled.div`
  margin: 0 auto;
  /* margin-bottom: 160px; */

  .title {
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    & > span:nth-child(1) {
      ${title}
      padding: 130px 0 20px;
      text-align: center;
      margin-bottom: 27px;
    }

    & > span:nth-child(2) {
      font-family: 'PingFang HK';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: rgba(255, 255, 255, .6);
      margin-bottom: 66px;
    }
  }

  .IntroduceGroup {
    width: 1556px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;

    & > :nth-child(3n) {
      margin-right: 0 !important;
    }
  }

  .Introduces_swiper {
    width: 1600px;
    margin: 0 auto;
    /* padding: 100px 0 20px; */
  }
`
export const IntroduceBox = styled.div`
  position: relative;
  width: 450px;
  height: 500px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-right: 103px;
  box-sizing: border-box;
  padding-bottom: 87px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  & > :nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 450px;
    height: 500px;
  }

  & > :nth-child(2) {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 37px;
    width: 276px;
    text-align: center;
    color: #FFFFFF;
  }

  & > :nth-child(3) {
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    width: 328px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
  }
`

export const BorrowBox = styled.div`
  width: 1600px;
  /* height: 600px; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding-top: 188px;
  .borrow_left{
    width: 650px;
    .borrow_title{
    font-size: 25px;
    width: 590px;
    margin-bottom: 53px;
  }
  .borrow_step{
    padding-top: 30px;
    .step_list{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .step_item{
        font-size: 20px;
      }
    }
    .step_text{
      display: block;
      height: 76px;
      font-size: 12px;
      line-height: 18px;
      color: rgba(255,255,255,0.5);
    }
  }
  .borrow_more{
    width: 410px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 120px;
  }
  }
  .borrow_right{
    width: 950px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .borrow_channel{
    width: 850px;
    height: 300px;
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
          font-size: 22px;
          line-height:20px;
          }
          & > span:nth-child(2){
            font-size: 50px;
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 800;
            line-height: 100px;
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
        width: 450px;
        height: 110px;
        margin: 0 auto;
        .content_apr{
          margin-bottom: 10px;
          & > span:nth-child(1){
            font-size: 20px;
            margin-bottom: 18px;
          }
          & > span:nth-child(2){
            font-size: 32px;
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 800;
            margin-left: 20px;
            background: linear-gradient(268.82deg, #FF0000 0.48%, #FEB240 96.5%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
        }
        & > span{
          width: 300px;
          color: rgba(255,255,255,0.5);
          font-size: 12px;
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
      border-radius: 40px;
      z-index: 2;
      margin:18px auto 28px;
      &::before{
        content: "";
        position: absolute;
        top: 0;
        left: ${(props: { left: string }) => props.left};
        width: 33.33%;
        border-radius: 40px;
        height: 100%;
        background: #FF490F;
        z-index: 1;
        transition: all 0.3s ease-in-out;
      }
`

export const SliderChoose = styled.span`
  display: block;
  width: 300px;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  padding-left: 10px;
  color: ${(props: { color: string }) => props.color};;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`

export const BorrowBtn = styled.div`
  width: 630px;
  padding-top: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`
