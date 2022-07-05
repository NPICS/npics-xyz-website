import styled, {css} from 'styled-components';
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
    padding: 1rem 0 .2rem;
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
  justify-content: space-between;
  align-items: center;
  width: 16rem;
  height: 100vh;
  margin: 0 auto;
  padding: 1rem 0 .2rem;
  color: #fff;

  .detail_info {
    width: 50%;
    flex: 1;

    .info_item_title {
      ${title};
    }

    .info_item_text {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 300;
      font-size: .16rem;
      line-height: .32rem;
      -webkit-letter-spacing: 0.05em;
      -moz-letter-spacing: 0.05em;
      -ms-letter-spacing: 0.05em;
      letter-spacing: 0.05em;
      color: rgba(255, 255, 255, 0.5);
      width: 90%;
      margin-bottom: .47rem;
    }
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
    width: 1.9rem;
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
    height: 86vh;
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
  position: relative;
  height: 10.5rem;

  & > img:nth-child(1) {
    position: absolute;
    top: -1.44rem;
    left: 0;
    width: 5.44rem;
    height: 5.44rem;
    object-fit: cover;
  }

  & > img:nth-child(2) {
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
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(30px);
    backdrop-filter: blur(30px);
    margin: -30px;
  }
`

export const BorrowContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0.84rem 0 1.12rem;
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
    width: 12rem;
    margin: 0 auto;

    .sliderItem {
      display: flex;
      width: 12rem;
      flex-direction: row;
      justify-content: center;
      align-items: center;
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
        width: ${(props: { left: string }) => props.left};
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
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 300;
      font-size: .16rem;
      color: rgba(255, 255, 255, .6);
    }
  }

  .BorrowChannel {
    display: flex;
    flex-direction: row;
    width: 11rem;
    box-sizing: border-box;
    margin: 0.78rem auto 0px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;

    .brrow_left {
      display: flex;
      flex-direction: column;
      padding: 0.77rem 0.81rem 0.77rem 0.91rem;
      border-right: 2px dashed rgba(255, 255, 255, 0.1);

      & > span:first-child {
        font-weight: 700;
        font-size: 0.2rem;
        color: rgb(255, 255, 255);
      }

      & > span:last-child {
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

    .brrow_right {
      display: flex;
      flex-direction: column;
      padding: 0.45rem 0px 0.45rem 1rem;
      gap: 0.6rem;

      .content {
        display: flex;
        -webkit-box-align: center;
        align-items: center;

        .text {
          display: flex;
          flex-direction: column;
          -webkit-box-pack: justify;
          justify-content: space-between;
          margin-left: 0.3rem;

          & > div {
            display: flex;
            flex-direction: row;
            -webkit-box-align: center;
            align-items: center;

            & > span:nth-child(1) {
              font-weight: 500;
              font-size: 0.16rem;
              color: rgb(255, 255, 255);
              font-family: Montserrat;
              font-style: normal;
              margin-right: 0.3rem;
            }

            & > span:nth-child(2) {
              display: inline-block;
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 800;
              font-size: .3rem;
              background: linear-gradient(265.23deg, #FF0F0F 0%, #FF820F 97.96%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              text-fill-color: transparent;
            }
          }

          & > span {
            font-weight: 500;
            font-size: 0.14rem;
            color: rgba(255, 255, 255, 0.5);
            font-family: "PingFang HK";
            font-style: normal;
            line-height: 0.17rem;
          }
        }
      }
    }
  }

`

export const SliderChoose = styled.span`
  display: inline-block;
  width: 3rem;
  text-align: center;
  font-family: 'PingFang HK';
  font-style: normal;
  font-weight: 600;
  font-size: .16rem;
  text-align: center;
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
