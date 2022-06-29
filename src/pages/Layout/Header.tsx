import React, { useState, useEffect, useRef } from 'react';
import { imgurl } from 'utils/globalimport';
import { Modal, notification, Popover, message } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { connectors } from "utils/connectors";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearUserData, fetchUser, fetchUser2, setIsLogin, setIsShowConnect } from 'store/app';
import { BtnLink, FlexDiv, LogoLink, Nav, ThemeImg } from './headerStyled';
import WalletBalance from './WalletBalance';
import { deserialize } from "class-transformer";
import { User } from "../../model/user";
import { SessionStorageKey } from "../../utils/enums";
import { urls } from "../../utils/urls";
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from 'component/Box';

function XHeader() {
  const { activate, account, error } = useWeb3React()
  const oldAccount = useRef<string | undefined | null>()
  const [accountPop, setAccountPop] = useState<boolean>(false)
  const action = useAppDispatch()
  const userInfo = useAppSelector(state => deserialize(User, state.app.currentUser))
  const showConnect = useAppSelector(state => state.app.data.isShowConnect)

  useEffect(() => {
    console.log(`Account Change => New: ${account}, Old: ${oldAccount.current}`)
    // changed account
    if (account && oldAccount.current) {
      // remove old account data
      sessionStorage.clear()
      // save new account
      sessionStorage.setItem(SessionStorageKey.WalletAuthorized, account)
      // fetch new account data
      action(clearUserData())
      action(fetchUser2())
      // make islogin false
      action(setIsLogin(false))
    }

    /// disconnect
    else if (oldAccount.current && !account) {
      console.log(`?????, ${oldAccount.current}, ${account}`)
      // remove all data
      sessionStorage.clear()
      // make unlogin
      action(clearUserData())
      action(setIsLogin(false))
    }

    /// first connect
    else if (!oldAccount.current && account) {
      sessionStorage.setItem(SessionStorageKey.WalletAuthorized, account)
      action(fetchUser2())
    }

    // store old account
    oldAccount.current = account
    // eslint-disable-next-line
  }, [account])

  // active wallet connect
  useEffect(() => {
    // check account, auto connect wallet
    let account = sessionStorage.getItem(SessionStorageKey.WalletAuthorized)
    if (account) {
      activate(connectors.injected).then(() => { })
    }
    // check token
    let token = sessionStorage.getItem(SessionStorageKey.AccessToken)
    action(setIsLogin(token != null))
    // eslint-disable-next-line
  }, [])


  const connect = async () => {
    try {
      if (error) {
        const Error = JSON.parse(JSON.stringify(error))
        if (Error.name === "UnsupportedChainIdError") {
          sessionStorage.removeItem(SessionStorageKey.WalletAuthorized)
          action(fetchUser(`{}`))
          notification.error({ message: "Prompt connection failed, please use the Ethereum network" })
        } else {
          notification.error({ message: "Please authorize to access your account" })
        }
        return
      }
      await activate(connectors.injected, (e) => {
        if (e.name === "UnsupportedChainIdError") {
          sessionStorage.removeItem(SessionStorageKey.WalletAuthorized)
          action(fetchUser(`{}`))
          notification.error({ message: "Prompt connection failed, please use the Ethereum network" })
        }
      })
      action(fetchUser2())
    } catch (e) {
      console.error('error:', e)
    } finally {
      action(setIsShowConnect(false))
    }
  }

  const walletPop = () => {
    if (userInfo.address) {
      setAccountPop(true)
    } else {
      action(setIsShowConnect(true))
    }
  }

  const onQuit = () => {
    setAccountPop(false)
    // sessionStorage.removeItem("ACCESS_TOKEN")
    action(fetchUser(`{}`))
    console.log('quit');
  }

  const onCopy = () => {
    if (!userInfo?.address) return
    const text = `${userInfo?.address}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.style.position = 'fixed';
      textarea.style.clip = 'rect(0 0 0 0)';
      textarea.style.top = '10px';
      textarea.value = text;
      textarea.select();
      document.execCommand('copy', true);
      document.body.removeChild(textarea);
    }
    message.success('Copy successfully', 0.5)
  }

  const AccountHTML = () => {
    return (<div className='account-content'>
      <div>
        <div>Connected Wallet</div>
        <div onClick={onQuit}>Change Provider</div>
      </div>
      <div className='account-address'>
        <img className='address-icon' src={imgurl.address} alt="" />
        <div className='address-text'>
          <span>{userInfo?.address && userInfo?.address.replace(userInfo?.address.substr(11, 15), '...')}</span>
          <div className='connected'>
            Connected with MetaMask
          </div>
        </div>
        <img className='copy-icon' src={imgurl.copy} alt="" onClick={onCopy} />
      </div>
      <div className='account-wallet'>
        <div className='wallet-title'>Wallet Balance</div>
        <WalletBalance></WalletBalance>
      </div>

    </div>)
  }
  const AccountTitle = () => {
    return (<div className='account-title'>
      <span>Account</span>
      <span style={{ cursor: 'pointer' }}>
        {/* <img src={imgurl.home.gearIcon} alt="" /> */}
      </span>
    </div>)
  }

  document.addEventListener("click", event => {
    if (!accountPop) return
    var cDom = document.getElementById("baseAccount") || document.body;
    var tDom: any = event.target;
    if (cDom === tDom || cDom.contains(tDom)) {
    } else {
      setAccountPop(false)
    }
  });

  let normal = {
    color: 'rgba(255,255,255,.5)',
    fontWeight: '700',
    fontSize: '.16rem',
    textDecoration: 'none',
    marginRight: '1.3rem',
  };
  let active = {
    color: '#fff',
    fontWeight: '700',
    fontSize: '.16rem',
    textDecoration: 'none',
    marginRight: '1.3rem',
  };
  return (
    <Nav>
      <FlexDiv>
        <LogoLink to={"/"}>
          <img src={imgurl.logoBeta} alt="" />
        </LogoLink>
        <NavLink 
          to={"marketPlace"}
          style={({ isActive }) =>
          isActive ? active : normal
          }
        >
          Marketplace
        </NavLink>
        <NavLink to={"/dashboard"}
         style={({ isActive }) =>
         isActive ? active : normal
         }
        >
          Dashboard
        </NavLink>
        <a style={{
          "fontSize": ".16rem",
          "fontWeight": "600",
          "color": "rgba(255,255,255,.5)"
        }} target="_blank" rel="noreferrer" href={urls.resource}>Resources</a>
      </FlexDiv>

      <FlexDiv>
        {/* <ThemeImg src={imgurl.worldwideIcon} /> */}
        {/* <ThemeImg src={imgurl.gas_icon}/> */}
        {/* <ThemeImg src={imgurl.notificationIcon} /> */}
        {/* <ThemeImg src={imgurl.withoutNoticeIcon} /> */}
        <div id="baseAccount" style={{ position: 'relative' }}>
          {userInfo.address ?
            <Icon style={{ cursor: 'pointer' }} width='.34rem' height='.34rem' src={imgurl.home.defaultAvatar} onClick={walletPop} /> :
            <Icon style={{cursor: 'pointer'}} width='.2rem' height='.2rem' src={imgurl.home.login} onClick={walletPop} />}
        </div>
        <Popover
          content={AccountHTML}
          title={AccountTitle}
          trigger="click"
          visible={accountPop}
          getPopupContainer={(triggerNode: any) => document.getElementById("baseAccount") || document.body}
          placement={'bottomRight'}
        >
        </Popover>
      </FlexDiv>
      <Modal
        footer={false}
        title='Connect a wallet'
        onCancel={() => action(setIsShowConnect(false))}
        visible={showConnect}
        className="ant-modal-reset"
      >
        <div onClick={connect}><img src={imgurl.metamaskLogo} alt=""></img>MetaMask</div>
      </Modal>
    </Nav>
  );
}

export default XHeader;
