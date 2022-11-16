import styled from "styled-components";
export const HomeWarp = styled.div`
  background: #1a1a1a;
`
export const BackgroundBox = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding-top: 0.9rem;
    z-index: 1;
    .background_left{
        z-index: -1;
        position: absolute;
        left: 0;
        width: 600px;
        bottom: -400px;
    }
    .background_right{
        z-index: -1;
        position: absolute;
        right: 0;
        top: 0;
    }
`
export const HomeBox = styled.div`
    width: 100%;
    height: calc(100vh - 1.4rem);
    .home_content{
        width: 16rem;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding-bottom:0.5rem;
    }
`
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
`
export const HomeLeft = styled.div`
  flex: 1;
`;
export const HomeNFT = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .nfts_img {
    width: 100%;
  }
`

export const DownPaymentBox = styled.div`
    position: relative;
    width: 16rem;
    z-index: 1;
    margin: 0 auto;
    .downPayment_content{
        padding: 0.6rem 0 2.2rem;
        .detail_img_box {
            width: 100%;
            margin-bottom: 0.4rem;
            .detail_img {
                width: 100%;
                height: 100%;
            }
        }
    }
`

export const ChipSwapBox = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 1.7rem;
    .chipSwapBox_bg{
        position: absolute;
        right: 0;
        top: -900px;
    }
    .chipSwap_content{
        width: 16rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        .chipSwap_swiper_box{
            display: flex;
        }
        .chipSwap_btn{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 0.4rem;
        }
    }
`

export const NFTHedgingBox = styled.div`
    width: 16rem;
    margin: 0 auto;
    .nftHedg_content{
        padding:1rem 0 0;
        display: flex;
        flex-direction: column;
        .nftHedg_content_top{
            width: 100%;
            display: flex;
            .nftHedg_left{
            width: 50%;
            display: flex;
            flex-direction: column;
            color: #fff;
            font-size: 0.2rem;
            font-weight: 700;
            padding-top: 0.4rem;
            .hedg_item{
                margin-bottom: 0.7rem;
            }
        }
        .nftHedg_right{
            width: 50%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .right_img_one{
                width: 3.45rem;
                height: 3.45rem;
                background: #fff;
                border-radius: 0.1rem;
                margin-right: 0.2rem;
            }
            .right_img_two{
                width: 3.45rem;
                height: 3.45rem;
                background: #fff;
                border-radius: 0.1rem;
                margin-bottom: 0.5rem;
            }
        }
        }
        .nftHedg_btn{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top:1.4rem;
        }

    }
`
export const Partners = styled.div`
  position: relative;
  margin: 0 auto;
  padding-bottom: 2rem;
  .partners_bg{
    position: absolute;
    top: -450px;
    left: 0;
    img{
        width: 550px;
    }
  }
  .title {
    width: 5.3rem;
    margin: 0 auto;
    margin-bottom: 0.2rem;
    padding: 1.3rem 0 0.2rem;
    font-style: normal;
  font-weight: 800;
  font-size: 0.36rem;
  color: #ffffff;
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