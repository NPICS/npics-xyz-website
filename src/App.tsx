import React from 'react';
import {updateARP, updateUSDTExchangeRate, updateBENDExchangeRate} from 'store/app';
import {useAppDispatch} from 'store/hooks';
import Layout from './pages/Layout/index'
import {useAsync, useInterval} from "react-use";

function App() {
    const action = useAppDispatch()

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

    return <Layout />;
}

export default App;
