import styled, { css } from "styled-components";
import HomeBg from "../../assets/images/home/head_bg.png";

export const title = css`
  font-style: normal;
  font-weight: 800;
  font-size: 0.36rem;
  color: #ffffff;
`;

export const HomeWrap = styled.div`
  height: 100%;
  background: #1a1a1a;
  margin: 0 auto;
  min-width: 16rem;
  .collection_box {
    position: relative;
    .collection_bg {
      width: 7rem;
      height: 20rem;
      position: absolute;
      bottom: -12.2rem;
      right: 0;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .collections-title {
    width: 16rem;
    margin: 0 auto;
    padding: 1.3rem 0 0.4rem;
    ${title};
  }
`;
export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 0.9rem;
  background-image: url(${HomeBg});
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
export const NoteBox = styled.div`
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  .note_content {
    width: 16rem;
    height: 40px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.14rem;
    cursor: pointer;
    .note_text {
      display: flex;
      align-items: center;
      & > span {
        margin-left: 0.1rem;
      }
    }
    .note_close {
      .note_close_icon {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
`;
export const HomeBox = styled.div`
  width: 16rem;
  min-height: calc(100vh - 40px - 3rem);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HomeLeft = styled.div`
  flex: 1;
`;
export const HomeNFT = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .nfts_img {
    width: 68%;
  }
`;

export const FirstDiv = styled.div`
  position: relative;
  min-height: 9.8rem;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
  box-sizing: border-box;
`;
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
`;
export const Glass = styled.div`
  height: 100%;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* filter: blur(0.13rem); */
    /* backdrop-filter: blur(0.13rem); */
    margin: -0.3rem;
  }

  .text {
    position: absolute;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    box-sizing: border-box;
    margin-left: 1.83rem;
    margin-top: 2.5rem;

    & > div:nth-child(1) {
      font-style: italic;
      font-weight: 900;
      font-size: 0.4rem;
      line-height: 0.49rem;
      text-transform: uppercase;
      color: #ffffff;
      width: 5.83rem;
      margin-bottom: 0.1rem;
    }

    & > div:nth-child(2) {
      font-style: normal;
      font-weight: 300;
      font-size: 0.16rem;
      line-height: 0.32rem;
      letter-spacing: 0.05em;
      color: rgba(255, 255, 255, 0.5);
      width: 5.41rem;
      margin-bottom: 0.47rem;
    }

    .jumpBtn {
      display: flex;

      button {
        margin-right: 0.2rem;
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
        margin-top: 0.3rem;
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
    bottom: 0.9rem;
    width: 100%;
    display: flex;
    justify-content: center;

    & > a {
      margin: 0 0.15rem;
      cursor: pointer;

      img {
        width: 0.22rem;
        height: 0.22rem;
      }
    }
  }
`;

export const SwiperBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  height: 5.4rem;
  padding: 0.6rem 0 1.06rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  .title {
    ${title};
  }
`;
export const FrameWarp = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  margin: 1.3rem auto;
`;
export const FrameBox = styled.div`
  width: 16rem;
  margin: 0 auto;
  padding: 0.6rem 0 1.6rem;
  color: #fff;
  .frame_title {
    ${title};
    margin-bottom: 0.28rem;
  }

  .detail_img_box {
    width: 100%;
    margin: 0.8rem 0 1.5rem;
    .detail_img {
      width: 100%;
      height: 100%;
    }
  }
`;
export const Partners = styled.div`
  margin: 0 auto;
  padding-bottom: 2rem;

  .title {
    width: 5.3rem;
    margin: 0 auto;
    margin-bottom: 0.2rem;
    padding: 1.3rem 0 0.2rem;
    ${title};
  }

  .partnerGroup {
    width: 14.4rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    gap: 0.3rem;
  }
`;
export const PartnerBox = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: 0.01rem solid rgba(255, 255, 255, 0.2);
  border-radius: 0.06rem;
  padding: 0.2rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.06);
  }

  img {
    width: ${(props: { width: string }) => props.width};
  }

  span {
    width: 0.8rem;
    margin-left: 0.1rem;
    font-family: "PingFang HK";
    font-style: normal;
    font-weight: 600;
    white-space: nowrap;
    font-size: 0.2rem;
  }
`;
export const Introduces = styled.div`
  margin: 0 auto;
  position: relative;
  .title {
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    & > span:nth-child(1) {
      ${title}
      /* padding: 1.3rem 0 0.2rem; */
      text-align: center;
      margin-bottom: 0.27rem;
    }

    & > span:nth-child(2) {
      font-family: "PingFang HK";
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 0.22rem;
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 0.66rem;
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
    /* padding: 1rem 0 0.2rem; */
  }
  .Introduces_bg {
    position: absolute;
    bottom: -7.5rem;
    left: -2rem;
    width: 10rem;
    height: 15rem;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;
export const IntroduceBox = styled.div`
  position: relative;
  width: 4.5rem;
  height: 5rem;
  border: 0.01rem solid rgba(255, 255, 255, 0.2);
  border-radius: 0.1rem;
  margin-right: 1.03rem;
  box-sizing: border-box;
  padding-bottom: 0.87rem;
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
    font-style: normal;
    font-weight: 800;
    font-size: 0.3rem;
    line-height: 0.37rem;
    width: 2.76rem;
    text-align: center;
    color: #ffffff;
  }

  & > :nth-child(3) {
    font-family: "PingFang HK";
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 0.24rem;
    width: 3.28rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const BorrowBox = styled.div`
  width: 16rem;
  /* height: 6rem; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .borrow_left {
    width: 6.5rem;
    .borrow_title {
      font-size: 0.2rem;
      font-weight: 700;
      width: 5.9rem;
      margin-bottom: 0.42rem;
    }
    .borrow_step {
      padding-top: 0.3rem;
      .step_list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .step_item {
          font-size: 0.2rem;
        }
      }
      .step_text {
        display: block;
        height: 0.76rem;
        font-size: 0.12rem;
        line-height: 0.18rem;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .borrow_more {
      width: 4.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.2rem;
    }
  }
  .borrow_right {
    width: 9.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .borrow_channel {
      width: 8.5rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      border-radius: 0.2rem;
      .channel_left {
        width: 35%;
        height: 100%;
        border-right: 0.02rem dashed #191919;
        .left_content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .left_content_apr {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            .apr_text_box {
              display: flex;
              justify-content: center;
              align-items: center;
              .apr_text {
                margin-left: 0.1rem;
                font-size: 0.16rem;
              }
            }
            & > span:nth-child(2) {
              font-size: 0.5rem;
              font-style: normal;
              font-weight: 800;
              line-height: 1rem;
              background: linear-gradient(
                268.82deg,
                #ff0000 0.48%,
                #feb240 96.5%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-fill-color: transparent;
            }
          }
        }
      }
      .channel_right {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .content {
          width: 4.5rem;
          height: 1.1rem;
          margin: 0 auto;
          .content_apr {
            margin-bottom: 0.1rem;
            & > span:nth-child(1) {
              font-size: 0.2rem;
              margin-bottom: 0.18rem;
            }
            & > span:nth-child(2) {
              font-size: 0.32rem;

              font-style: normal;
              font-weight: 800;
              margin-left: 0.2rem;
              background: linear-gradient(
                268.82deg,
                #ff0000 0.48%,
                #feb240 96.5%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-fill-color: transparent;
            }
          }
          & > span {
            width: 3rem;
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.12rem;
          }
        }
      }
    }
  }
`;
export const StepProgress = styled.div`
  position: relative;
  height: 0.02rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.4rem;
  z-index: 2;
  margin: 0.18rem auto 0.28rem;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: ${(props: { left: string }) => props.left};
    width: 33.33%;
    border-radius: 0.4rem;
    height: 100%;
    background: #ff490f;
    z-index: 1;
    transition: all 0.3s ease-in-out;
  }
`;

export const SliderChoose = styled.span`
  display: block;
  width: 3rem;
  padding: 0.1rem;
  text-align: center;
  font-size: 0.16rem;
  padding-left: 0.1rem;
  color: ${(props: { color: string }) => props.color};
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

export const BorrowBtn = styled.div`
  width: 6.3rem;
  padding-top: 0.4rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;
