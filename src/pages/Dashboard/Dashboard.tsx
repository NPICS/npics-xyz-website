import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { imgurl } from 'utils/globalimport';
// import MyAgreement from './components/MyAgreement';
// import MyAirdrop from './components/MyAirdrop';
// import MyRewards from './components/MyRewards';

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 90px;
  background-color: #191919;
  .dashboard {
    width: 470px;
    color: #fff;
    border-right: 1px solid rgba(255,255,255,.1);
    padding-top: 90px;
    padding-left: 150px;
    .title {
      font-family: 'PingFang HK';
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .nav {
      margin-right: 20px;
      .nav-item {
        padding: 18px 0 20px 41px;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 12px;
        margin-bottom: 10px;
        cursor: pointer;
        span {
          color: #fff;  
          margin-left: 23px;
        }
      }
      .active {
        .nav-item {
          background: #fff;
          border: 0;
          span {
            color: #000;
          }
        }
      }
    }
  }
  .content {
    width: 1433px;
    padding: 60px 120px 30px 26px;
  }
`

const navList = [
  {
    icon: imgurl.dashboard.agreement,
    iconActive: imgurl.dashboard.agreementActive,
    text:"My Vaults",
    key: 'agreement'
  },
  {
    icon: imgurl.dashboard.rewards,
    iconActive: imgurl.dashboard.rewardsActive,
    text:"My Rewards",
    key: 'rewards'
  },
  {
    icon: imgurl.dashboard.airdrop,
    iconActive: imgurl.dashboard.airdropActive,
    text:"My Airdrop",
    key: 'airdrop'
  }
]


function Dashboard() {
  const [active, setActive] = useState<string>('agreement')
  const history = useLocation()
  const onNavChange = (e: { icon: string; iconActive: string; text: string; key: string }) => {
    setActive(e.key)
  }

  useEffect(() => {
    setActive(history.pathname.substring(11))
  },[history.pathname])

  return (
    <Wrap>
      <div className='dashboard'>
        <div className='title'>Dashboard</div>
        <div className='nav'>
          {navList.map((item) => {
            return (
              <NavLink className={({ isActive }) => isActive ? "active" : ""} key={item.key} to={item.key}><div className={`nav-item`} onClick={() => onNavChange(item)}>
                  <img src={ active === item.key ? item.iconActive : item.icon} alt="" />
                  <span>{item.text}</span>
              </div></NavLink>
            )
          })}
        </div>
      </div>

      <div className='content'>
        <Outlet />
      </div>

    </Wrap>
  );
}

export default Dashboard;
