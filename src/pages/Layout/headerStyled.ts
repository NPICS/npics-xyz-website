import { imgurl } from "utils/globalimport";
import { Link } from 'react-router-dom';
import styled from "styled-components";
export const accountNav = [
  {
    icon: imgurl.dashboard.agreement,
    text: 'Agreement',
    path: '/dashboard/agreement',
  },
  {
    icon: imgurl.dashboard.rewards,
    text: 'Rewards',
    path: '/dashboard/rewards',
  },
  {
    icon: imgurl.dashboard.airdrop,
    text: 'Airdop',
    path: '/dashboard/airdrop',
  },
  {
    icon: imgurl.dashboard.notify,
    text: 'Notification',
    path: '',
  },
  {
    icon: imgurl.dashboard.setting,
    text: 'Settings',
    path: '',
  },
]

export const Nav = styled.div`
  width: 100%;
  height: .9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: .2rem 1.5rem;
  /* background: transparent; */
  background: ${(props:{bgColor:boolean}) => props.bgColor ? 'transparent' : 'rgba(255,255,255,.1)'};
  &>div {
    text-align: center;
  }
  .ant-popover-content {
    .ant-popover-arrow {
        display: none;
      }
    .ant-popover-inner {
      background: rgba(0, 0, 0, 0.4);
      border: .01rem solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(50px);
      border-radius: 20px;
      margin-top: .2rem;
      .ant-popover-title{
        border-bottom: 0;
        &::after {
          content: '';
          display: inline-block;
          width: 100%;
          height: .01rem;
          background-color: rgba(255,255,255,.1);
        }
        .account-title {
          color: #fff;
          font-size: .16rem;
        }
      }
      .account-content {
        &>div:nth-child(1) {
          display: flex;
          justify-content: space-between;
          color: #fff;
          font-size: .14rem;
          font-weight: 600;
          margin-bottom: .22rem;
          &>div:nth-child(2){
            color: #FF490F;
            cursor: pointer;
          }
        }
        .account-address {
          display: flex;
          flex-direction: row;
          .address-icon {
            margin-right: .1rem;
          }
          img {
            width: .24rem;
            height: .24rem;
          }
          .copy-icon {
            margin-left: .1rem;
            cursor: pointer;
          }
          .address-text {
            color: #fff;
            font-weight: 600;
            font-size: .16rem;
            .connected {
              font-size: .14rem;
              color:rgba(255, 255, 255, 0.5);
            }
          }
        }
        .account-item {
          margin: .3rem 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 0.1rem;
          .account-nav {
            height: .68rem;
            padding: 0 .27rem;
            display: flex;
            gap: .06rem;
            align-items: center;
            text-align: left;
            background: rgba(255, 255, 255, 0.1);
            border: .01rem solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(50px);
            border-radius: .1rem;
            color: #fff;
            cursor: pointer;
            & > img {
              display: inline-block;
              width: .3rem;
              height: .3rem;
            }
          }
        }
        .account-wallet {
          .wallet-title {
            font-size: .16rem;
            font-weight: 600;
            color: #fff;
            &::after {
              content: '';
              display: inline-block;
              width: 100%;
              height: .01rem;
              background-color: rgba(255,255,255,.1);
            }
          }
        }
      }
    }
  }
`
export const BtnLink = styled(Link)`
  color: ${(props) => props.theme.color};
  font-weight: 700;
  font-size: .16rem;
  text-decoration: none;
  margin-right: 1.3rem;
`
export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 1.2rem;
`
export const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ThemeImg = styled.img`
  width: .34rem;
  height: .34rem;
  cursor: pointer;
  margin-left: .2rem;
`;
