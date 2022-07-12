import { imgurl } from "utils/globalimport";
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { font01671 } from "component/styled";
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
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 20px 150px;
  /* background: transparent; */
  background: ${(props) => props.theme.headerBg};
  &>div {
    text-align: center;
  }
  .accountPopover {
    .ant-popover-content {
      .ant-popover-arrow {
          display: none;
        }
      .ant-popover-inner {
        background: #fff;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        margin-top: 20px;
        .ant-popover-title{
          border-bottom: 0;
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: rgba(0,0,0,.1);
          }
          .account-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            span {
              color: #000;
              font-weight: 700;
              font-size: 16px;
            }
          }
        }
        .account-content {
          &>div:nth-child(1) {
            display: flex;
            justify-content: space-between;
            color: #000;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 22px;
            &>div:nth-child(2){
              color: #FF490F;
              cursor: pointer;
            }
          }
          .account-address {
            display: flex;
            flex-direction: row;
            .address-icon {
              margin-right: 10px;
            }
            img {
              width: 24px;
              height: 24px;
            }
            .copy-icon {
              margin-left: 10px;
              cursor: pointer;
            }
            .address-text {
              color: #000;
              font-weight: 600;
              font-size: 16px;
              .connected {
                font-size: 14px;
                color:rgba(0, 0, 0, .5);
              }
            }
          }
          .account-wallet {
            margin-top: 40px;
            .wallet-title {
              ${font01671}
              &::after {
                content: '';
                display: inline-block;
                width: 100%;
                height: 1px;
                background-color: rgba(0,0,0,.1);
              }
            }
          }
        }
      }
    }
  }

  .walletPopover {
    .ant-popover-content {
      .ant-popover-arrow {
          display: none;
        }
      .ant-popover-inner {
        background: #fff;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        margin-top: 20px;
        padding: 20px 20px 30px 20px;
        .ant-popover-title{
          min-height: 0;
          font-weight: 700;
          font-size: 16px;
          color: #000;
          margin-left: 10px;
          margin-bottom: 10px;
          border-bottom: 0;
          padding: 0;
        }
        .ant-popover-inner-content {
          padding: 0;
        }
      }
    }
  }
`
export const BtnLink = styled(NavLink)`
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  margin-right: 130px;
  &:hover {
    color: #fff;
  }
`
export const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-right: 120px;
  img{
    width: 180px;
  }
`
export const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .tools{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tools_bg{
    /* display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    background: rgba(255,255,255,0.5);
    margin-right: 20px;
    border-radius: 7px; */
  }
`
export const ThemeImg = styled.img`
  width: 34px;
  height: 34px;
  cursor: pointer;
  margin-left: 20px;
`;
