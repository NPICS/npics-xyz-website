import React, { useState, useEffect, useRef } from 'react';
import defaultAvatar from 'assets/images/home/defaultAvatar.svg'
import login from 'assets/images/home/login.svg'
import { imgurl } from 'utils/globalimport';
import { notification, Popover, message } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { connectors } from "utils/connectors";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearUserData, fetchUser, fetchUser2, setIsShowConnect, setShowWalletModalOpen } from 'store/app';
import { FlexDiv, Height, LogoLink, Nav } from './headerStyled';
import WalletBalance from './WalletBalance';
import { deserialize } from "class-transformer";
import { User } from "../../model/user";
import { SessionStorageKey } from "../../utils/enums";
import { urls } from "../../utils/urls";
import { NavLink, useLocation } from 'react-router-dom';
import { Flex, Icon, Typography, Box } from 'component/Box';
import styled from 'styled-components';
import { CHAIN_ID, injected } from 'connectors/hooks';

const StyledtWallet = styled(Flex)`
  cursor: pointer;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 0.01rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.1rem;
  padding: 0.1rem 0 0.1rem 0.25rem;
  min-width: 2.6rem;
  min-height: 0.6rem;
  &:hover {
    background: #FFFFFF;
    box-shadow: 0rem 0rem 0.2rem rgba(0, 0, 0, 0.1);
    border: 0.01rem solid #fff;
  }
`

const StyledHoverA = styled.a`
  &:hover {
    color: #fff !important
  }
`
const StyledHoverSpan = styled.span`
  &:hover {
    color: #fff
  }
`

function XHeader() {
  const isFixed = useAppSelector(state => state.app.isFixed)
  const { account, connector } = useWeb3React()
  const oldAccount = useRef<string | undefined | null>()
  const [accountPop, setAccountPop] = useState<boolean>(false)
  const action = useAppDispatch()
  const userInfo = useAppSelector(state => deserialize(User, state.app.currentUser))
  const showConnect = useAppSelector(state => state.app.data.isShowConnect)

  const terms = [
    {
      darkIcon: imgurl.footer.darkT,
      lightIcon: imgurl.footer.lightT,
      link: urls.twitter,
      name: "Twitter"
    },
    {
      darkIcon: imgurl.footer.darkG,
      lightIcon: imgurl.footer.lightG,
      link: urls.discord,
      name: "Game"
    }
  ]

  // useEffect(() => {
  //   console.log(`Account Change => New: ${account}, Old: ${oldAccount.current}`)
  //   // changed account
  //   if (account && oldAccount.current) {
  //     // remove old account data
  //     localStorage.clear()
  //     // save new account
  //     localStorage.setItem(SessionStorageKey.WalletAuthorized, account)
  //     // fetch new account data
  //     action(clearUserData())
  //     action(fetchUser2())
  //     // make islogin false
  //     action(setIsLogin(false))
  //   }

  //   /// disconnect
  //   else if (oldAccount.current && !account) {
  //     console.log(`?????, ${oldAccount.current}, ${account}`)
  //     // remove all data
  //     localStorage.clear()
  //     // make unlogin
  //     action(clearUserData())
  //     action(setIsLogin(false))
  //   }

  //   /// first connect
  //   else if (!oldAccount.current && account) {
  //     localStorage.setItem(SessionStorageKey.WalletAuthorized, account)
  //     action(fetchUser2())
  //   }

  //   // store old account
  //   oldAccount.current = account
  //   // eslint-disable-next-line
  // }, [account])

  // active wallet connect
  useEffect(() => {
    // check account, auto connect wallet
    // let account = localStorage.getItem(SessionStorageKey.WalletAuthorized)
    // if (account) {
    //   activate(connectors.injected).then(() => { })
    // }
    // check token
    // let token = localStorage.getItem(SessionStorageKey.AccessToken)
    // action(setIsLogin(token != null))
    // eslint-disable-next-line
  }, [])


  const connect = async () => {
    try {
      // TODO: wallet connect
      await injected.activate(CHAIN_ID)
      // await activate(connectors.injected, (error) => {
      //   const Error = JSON.parse(JSON.stringify(error))
      //   if (Error.name === "UnsupportedChainIdError") {
      //     localStorage.removeItem(SessionStorageKey.WalletAuthorized)
      //     action(fetchUser(`{}`))
      //     notification.error({ message: "Prompt connection failed, please use the Ethereum network" })
      //   } else {
      //     notification.error({ message: "Please authorize to access your account" })
      //   }
      // })
      action(fetchUser2())
    } catch (e: any) {
      notification.error({ message: e.message })
    } finally {
      action(setIsShowConnect(false))
    }
  }

  const walletPop = () => {
    if (account) {
      setAccountPop(true)
    } else {
      action(setIsShowConnect(true))
    }
  }

  const onQuit = () => {
    setAccountPop(false)
    localStorage.removeItem(SessionStorageKey.WalletAuthorized)
    // connector.deActivate()
    console.log(injected)
    injected.resetState()
    // deactivate.destroy()
    // console.log();
    console.log(account);
    action(fetchUser(`{}`))
    console.log('quit');
  }

  const onCopy = () => {
    if (!account) return
    const text = `${account}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.style.position = 'fixed';
      textarea.style.clip = 'rect(0 0 0 0)';
      textarea.style.top = '0.1rem';
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
          <span>{account && account.replace(account.substring(11, 30), '...')}</span>
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
  const ConnectWallet = () => {
    return (<StyledtWallet onClick={connect} alignItems="center">
      <Typography marginRight='0.2rem'><Icon width='0.4rem' height='0.4rem' src={imgurl.metamaskLogo} alt="" /></Typography>
      <Typography fontSize='0.16rem' fontWeight='700' color='#000'>MetaMask</Typography>
    </StyledtWallet>)
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
  document.addEventListener("click", event => {
    if (!showConnect) return
    var cDom = document.getElementById("baseAccount") || document.body;
    var tDom: any = event.target;
    if (cDom === tDom || cDom.contains(tDom)) {
    } else {
      action(setIsShowConnect(false))
    }
  });

  let normal = {
    color: 'rgba(255,255,255,.5)',
    fontWeight: '700',
    fontSize: '0.16rem',
    textDecoration: 'none',
    marginRight: '1.3rem',
  };
  let active = {
    color: '#fff',
    fontWeight: '700',
    fontSize: '0.16rem',
    textDecoration: 'none',
    marginRight: '1.3rem',
  };
  const history = useLocation()
  const [activiRoute, setActiviRoute] = useState<string>('')
  useEffect(() => {
    console.log(history.pathname.substring(1, 4));
    console.log(history.pathname.substring(1, 13));
    if (history.pathname === '/') {
      console.log("home");
      setActiviRoute('home')
    } else if (history.pathname.substring(1, 4) === 'nft') {
      setActiviRoute('nft')
      return
    } else if (history.pathname.substring(1, 13) === 'vaultsDetail') {
      setActiviRoute('vaultsDetail')
      return
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0)
    setActiviRoute('')
    // eslint-disable-next-line
  }, [history.pathname])

  return (
    <>
      <Nav fixed={isFixed}>
        {/* <Flex
        position="absolute"
        // width="100%"
        justifyContent="space-between"
      > */}
        <FlexDiv>
          <LogoLink to={"/"}>
            <img src={imgurl.logoBeta} alt="" />
          </LogoLink>
          <NavLink
            to={"marketplace"}
            style={({ isActive }) =>
              isActive ? active : normal}
          >
            <StyledHoverSpan style={{ color: `${activiRoute === 'nft' || activiRoute === 'home' ? '#fff' : ''}` }}>Marketplace</StyledHoverSpan>
          </NavLink>
          <NavLink to={"/dashboard"}
            style={({ isActive }) =>
              isActive ? active : normal}
          >
            <StyledHoverSpan style={{ color: `${activiRoute === 'vaultsDetail' || activiRoute === 'home' ? '#fff' : ''}` }}>Dashboard</StyledHoverSpan>
          </NavLink>

          <StyledHoverA style={{
            fontSize: "0.16rem",
            fontWeight: "600",
            color: activiRoute === 'home' ? '#fff' : 'rgba(255,255,255,.5)'
          }} target="_blank" rel="noreferrer" href={urls.resource}>Resources</StyledHoverA>
        </FlexDiv>

        <FlexDiv>
          <div className='tools'>
            {/* <button onClick={() => action(setShowWalletModalOpen(true))}>connect</button> */}
            {
              terms.map((item) => {
                return (
                  <a href={item.link} key={item.name} target="_blank" >
                    <div className='tools_bg'>
                      <Icon className='tools_icon' style={{ cursor: 'pointer' }} width='0.22rem' height='0.22rem' src={item.darkIcon} />
                    </div>
                  </a>
                )
              })
            }
          </div>
          {/* <ThemeImg src={imgurl.worldwideIcon} /> */}
          {/* <ThemeImg src={imgurl.gas_icon}/> */}
          {/* <ThemeImg src={imgurl.notificationIcon} /> */}
          {/* <ThemeImg src={imgurl.withoutNoticeIcon} /> */}
          <Flex
            alignItems='center'
            justifyContent='center'
            background={`${showConnect ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.2)"}`}
            borderRadius="0.1rem"
            width='0.34rem'
            height='0.34rem'
            id="baseAccount"
            style={{ cursor: 'pointer' }}
            onClick={walletPop}
          >
            {/* <Icon width={`${account ? '0.34rem' : '0.14rem' } `} height={`${account ? '0.34rem' : '0.16rem' } `} src={account ? defaultAvatar : login} /> */}
            {
              account ?
                <Icon width='0.34rem' height='0.34rem' src={defaultAvatar} /> :
                <Flex
                  alignItems='center'
                  justifyContent='center'
                  width='0.34rem'
                  height='0.34rem'
                  borderRadius="0.1rem"
                >
                  <Icon width='0.14rem' height='0.16rem' src={login} />
                </Flex>
            }

          </Flex>
          <Popover
            content={AccountHTML}
            title={AccountTitle}
            trigger="click"
            visible={accountPop}
            getPopupContainer={(triggerNode: any) => document.getElementById("baseAccount") || document.body}
            placement={'bottomRight'}
            overlayClassName="accountPopover"
          >
          </Popover>

          <Popover
            content={ConnectWallet}
            title={<Typography
              fontSize="0.16rem"
              fontWeight="700"
              color="#000"
            >Connect a wallet</Typography>}
            trigger="click"
            visible={showConnect}
            getPopupContainer={(triggerNode: any) => document.getElementById("baseAccount") || document.body}
            placement={'bottomRight'}
            overlayClassName="walletPopover"
          >
          </Popover>
        </FlexDiv>
        {/* <Modal
        footer={false}
        title='Connect a wallet'
        onCancel={() => action(setIsShowConnect(false))}
        visible={showConnect}
        className="ant-modal-reset"
      >
        <div onClick={connect}><img src={imgurl.metamaskLogo} alt=""></img>MetaMask</div>
      </Modal> */}
        {/* </Flex> */}
      </Nav>
      <Height></Height>
    </>

  );
}

export default XHeader;
