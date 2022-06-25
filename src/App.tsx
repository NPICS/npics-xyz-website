import React, { useEffect } from 'react';
import {setEthPrice, updateARP, updateUSDTExchangeRate} from 'store/app';
import { useAppDispatch } from 'store/hooks';
import http from 'utils/http';
import Layout from './pages/Layout/index'
import {useAsync, useHarmonicIntervalFn, useIntersection, useInterval} from "react-use";

function App() {
  
  const action = useAppDispatch()

  useEffect(() => {
    getEthPrice()
    const timer = setInterval(() => {
      getEthPrice()
    }, 1000 * 30);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  const getEthPrice = async() => {
    const url = "/npics-nft/app-api/v2/currencyPrice/getEthPrice"
    const exchangeRate: any = await http.myPost(url,{})
    if (exchangeRate.code === 200 && exchangeRate.data) {
      action(setEthPrice(exchangeRate.data))
    }
  }

  // useEffect(() => {
  //
  // }, [])
  //
  // useInterval(() => {
  //   action(updateUSDTExchangeRate())
  // }, 1000 * 10)



  return (
    <div>
      <Layout></Layout>
    </div>
  );
}

export default App;
