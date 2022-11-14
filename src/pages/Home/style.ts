import styled from "styled-components";
export const HomeWarp = styled.div`
  width: 100%;
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
    width: 16rem;
    margin: 0 auto;
    .chipSwapBox_bg{
        position: absolute;
        right: 0;
        top: 0;
        width: 500px;
    }
`