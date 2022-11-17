import styled from 'styled-components';
import OverviewBg from "../../assets/images/head_bg.png"
export const OverviewWarp = styled.div`
  width: 100%;
  height: 4.5rem;
  background-image: url(${OverviewBg});
  background-repeat: no-repeat;
  background-size: cover;
`;
export const OverviewBox = styled.div`
  width: 16rem;
  height: 100%;
  margin: 0 auto;
  padding: 0.7rem;
  display: flex;
  align-items: flex-end;
  .overview_left{
    display: flex;
    flex-direction: column;
    .left_title{
      font-size: 0.6rem;
      color: #fff;
    }
    .left_btn{
      display: flex;
    }
  }
  .overview_right{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .right_data_box{
      width: 85%;
      display: flex;
      justify-content:space-around;
      .data_item{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .data_count{
          font-size: 0.3rem;
          font-weight: 700;
        }
        .available_box{
          display: flex;
          justify-content: center;
          align-items: center;
          .available_icon {
            width: 0.28rem;
            height: 0.28rem;
            margin-right: 8px;
          }
        }
        .data_title{
          font-size: 0.14rem;
          margin-top: 0.1rem;
        }
      }
    }
  }
`
