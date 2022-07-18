import { imgurl } from 'utils/globalimport'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { font01671 } from 'component/styled'
export const accountNav = [
  {
    icon: imgurl.dashboard.agreement,
    text: 'Agreement',
    path: '/dashboard/agreement'
  },
  {
    icon: imgurl.dashboard.rewards,
    text: 'Rewards',
    path: '/dashboard/rewards'
  },
  {
    icon: imgurl.dashboard.airdrop,
    text: 'Airdop',
    path: '/dashboard/airdrop'
  },
  {
    icon: imgurl.dashboard.notify,
    text: 'Notification',
    path: ''
  },
  {
    icon: imgurl.dashboard.setting,
    text: 'Settings',
    path: ''
  }
]

export const Nav = styled.div`
  width: 100%;
  height: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0.2rem 1.5rem;
  /* background: transparent; */
  background: ${props => props.theme.headerBg};
  & > div {
    text-align: center;
  }
  .accountPopover {
    .ant-popover-content {
      .ant-popover-arrow {
        display: none;
      }
      .ant-popover-inner {
        background: #fff;
        box-shadow: 0rem 0.04rem 0.3rem rgba(0, 0, 0, 0.1);
        border-radius: 0.2rem;
        margin-top: 0.2rem;
        .ant-popover-title {
          border-bottom: 0;
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 0.01rem;
            background-color: rgba(0, 0, 0, .1);
          }
          .account-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.1rem 0;
            span {
              color: #000;
              font-weight: 700;
              font-size: 0.16rem;
            }
          }
        }
        .account-content {
          & > div:nth-child(1) {
            display: flex;
            justify-content: space-between;
            color: #000;
            font-size: 0.14rem;
            font-weight: 600;
            margin-bottom: 0.22rem;
            & > div:nth-child(2) {
              color: #ff490f;
              cursor: pointer;
            }
          }
          .account-address {
            display: flex;
            flex-direction: row;
            .address-icon {
              margin-right: 0.1rem;
            }
            img {
              width: 0.24rem;
              height: 0.24rem;
            }
            .copy-icon {
              margin-left: 0.1rem;
              cursor: pointer;
            }
            .address-text {
              color: #000;
              font-weight: 600;
              font-size: 0.16rem;
              .connected {
                font-size: 0.14rem;
                color: rgba(0, 0, 0, .5);
              }
            }
          }
          .account-wallet {
            margin-top: 0.4rem;
            .wallet-title {
              ${font01671} &::after {
                content: '';
                display: inline-block;
                width: 100%;
                height: 0.01rem;
                background-color: rgba(0, 0, 0, .1);
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
        box-shadow: 0rem 0.04rem 0.3rem rgba(0, 0, 0, 0.1);
        border-radius: 0.2rem;
        margin-top: 0.2rem;
        padding: 0.2rem 0.2rem 0.3rem 0.2rem;
        .ant-popover-title {
          min-height: 0;
          font-weight: 700;
          font-size: 0.16rem;
          color: #000;
          margin-left: 0.1rem;
          margin-bottom: 0.1rem;
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
  font-size: 0.16rem;
  text-decoration: none;
  margin-right: 1.3rem;
  &:hover {
    color: #fff;
  }
`
export const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-right: 1.2rem;
  img{
    width: 1.8rem;
  }
`
export const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .tools {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tools_bg {
    .tools_icon {
      transition: transform 0.3s;
      margin-right: 0.22rem;
      &:hover {
        transform: scale(1.4);
      }
    }
    /* display: flex;
    justify-content: center;
    align-items: center;
    width: 0.28rem;
    height: 0.28rem;
    background: rgba(255,255,255,0.5);
    margin-right: 0.2rem;
    border-radius: 0.07rem; */
  }
`
export const ThemeImg = styled.img`
  width: 0.34rem;
  height: 0.34rem;
  cursor: pointer;
  margin-left: 0.2rem;
`
