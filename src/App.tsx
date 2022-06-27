import React from 'react';
import {updateARP, updateUSDTExchangeRate} from 'store/app';
import {useAppDispatch} from 'store/hooks';
import Layout from './pages/Layout/index'
import {useAsync, useInterval} from "react-use";

function App() {
    const action = useAppDispatch()

    useAsync(async () => {
        action(updateUSDTExchangeRate())
        action(updateARP())
    }, [])

    // update at 30 seconds of exchange rate
    useInterval(() => {
        action(updateUSDTExchangeRate())
    }, 1000 * 30)

    return <Layout />;
}

export default App;
