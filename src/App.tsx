import React, {useEffect,useRef} from 'react';
import {updateARP, updateUSDTExchangeRate, updateBENDExchangeRate, fetchUser, setIsLogin, clearUserData, fetchUser2} from 'store/app';
import {useAppDispatch} from 'store/hooks';
import Layout from './pages/Layout/index'
import {useAsync, useInterval} from "react-use";
import moment from "moment";
import { useWeb3React } from '@web3-react/core';
import { useUpdateEffect } from 'utils/hook';
import { notification } from 'antd';
import { SessionStorageKey } from 'utils/enums';
import { injected } from 'connectors/hooks';
function App() {
    const action = useAppDispatch()
    const { account } = useWeb3React()
    const oldAccount = useRef<string | undefined | null>()

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

    // Refresh reconnect wallet 
    useAsync(async () => {
        let account = sessionStorage.getItem(SessionStorageKey.WalletAuthorized)
        if (account) {
            await injected.activate(1)
        }
        let token = sessionStorage.getItem(SessionStorageKey.AccessToken)
        action(setIsLogin(token != null))
    }, [])

    // generate data
    useAsync(async () => {
        action(updateUSDTExchangeRate())
        action(updateBENDExchangeRate())
        action(updateARP())
    }, [])

    // update at 30 seconds of exchange rate
    useInterval(() => {
        action(updateUSDTExchangeRate())
        action(updateBENDExchangeRate())
    }, 1000 * 30)

    // moment config
    useEffect(() => {
        moment.updateLocale('en', {
            relativeTime: {
                d: '1 day',
                h: '1 hour',
                m: '1 minutes',
                M: '1 month',
                y: '1 year'
            }
        })
    }, [])

    return <Layout/>;
}

export default App;
