import React, {useEffect, useRef} from 'react';
import {
  updateARP,
  updateUSDTExchangeRate,
  updateBENDExchangeRate,
  fetchUser,
  // setIsLogin,
  clearUserData,
  fetchUser2, updateLoginState
} from 'store/app';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {useAsync, useInterval} from "react-use";
import moment from "moment";
import {useWeb3React} from '@web3-react/core';
import {useUpdateEffect} from 'utils/hook';
import {notification} from 'antd';
import {SessionStorageKey} from 'utils/enums';
import {CHAIN_ID, injected} from 'connectors/hooks';
import ContentLoader from "react-content-loader";
import {useContract, useERC20Contract, useLendPoolContract, useWETHContract} from "./hooks/useContract";
// import { Content, Footer } from 'antd/lib/layout/layout';
import Loading from 'component/Loading';
import XHeader from 'pages/Layout/Header';
import Content from 'pages/Layout/Content'
import Footer from 'pages/Layout/Footer'
import styled from 'styled-components';
import TopLevelModals from 'component/TopLevelModals';
const Nav = styled.div`
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2;
`
const FooterBox = styled.div`
  /* height: 2.26rem; */
  text-align: center;
  /* background-color: #1A1A1A; */
  `
const ContentBox = styled.div`
  color: #000;
  /* min-height: 8rem; */
  background-color: #F1F1F1;
  flex: 1;
  margin-top: -0.9rem;
`
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

function App() {
  const action = useAppDispatch()
  const {account} = useWeb3React()
  const oldAccount = useRef<string | undefined | null>()
  const isShowLoading = useAppSelector(state => state.app.data.isShowLoading)
  // const weth = useWETHContract()
  // const npics = useLendPoolContract()


  useEffect(() => {
    console.log(`Account Change => New: ${account}, Old: ${oldAccount.current}`)
    // changed account
    if (account && oldAccount.current) {
      // remove old account data
      localStorage.clear()
      // store new account
      localStorage.setItem(SessionStorageKey.WalletAuthorized, account)
      // fetch new account data
      action(clearUserData())
      action(fetchUser2())
      // make login false
      // action(setIsLogin(false))
      action(updateLoginState())
    }

    /// disconnect
    else if (oldAccount.current && !account) {
      console.log(`?????, ${oldAccount.current}, ${account}`)
      // remove all data
      localStorage.clear()
      // logout
      action(clearUserData())
      // action(setIsLogin(false))
      action(updateLoginState())
    }

    /// first connect
    else if (!oldAccount.current && account) {
      localStorage.setItem(SessionStorageKey.WalletAuthorized, account)
      action(fetchUser2())
    }

    // store old account
    oldAccount.current = account
  }, [account])

  return (
    <>
      {isShowLoading ? <Loading></Loading> : null}
      <TopLevelModals />
      <Flex>
        <Nav>
          <XHeader></XHeader>
        </Nav>
        <ContentBox>
          <Content></Content>
        </ContentBox>
        <FooterBox>
          <Footer></Footer>
        </FooterBox>
      </Flex>
    </>
  );
}

export default App;
