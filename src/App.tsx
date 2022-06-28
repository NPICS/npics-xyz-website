import React, { useEffect } from 'react';
import {updateARP, updateUSDTExchangeRate, updateBENDExchangeRate} from 'store/app';
import {useAppDispatch} from 'store/hooks';
import Layout from './pages/Layout/index'
import {useAsync, useInterval} from "react-use";
import moment from "moment";

function App() {
    const action = useAppDispatch()

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
    useEffect(() => {}, [
        moment.updateLocale('en', {
            relativeTime: {
                d: '1 day',
                h: '1 hour',
                m: '1 minutes'
            }
        })
    ])

    return <Layout />;
}

export default App;
