import { useWeb3React } from '@web3-react/core'
import { message } from 'antd'
import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import { imgurl } from 'utils/globalimport';
import styled from 'styled-components';
import { Erc20 } from 'abi/Erc20';
import { ContractAddresses } from 'utils/addresses';
import { useEthPrice } from 'utils/hook';

interface wallet {
  icon: string,
  text: string,
  amount: BigNumber,
  dollar: BigNumber,
}
const Wrap = styled.div`
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: .14rem;
      font-weight: 600;
      img {
        width: .36rem;
        height: .36rem;
        margin-right: .1rem;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      &>span:nth-child(1) {
        font-weight: 600;
        font-size: .18rem;
        color: #fff;
      }
      &>span:nth-child(2) {
        font-weight: 600;
        font-size: .12rem;
        color: rgba(255,255,255,.5);
        text-align: right;
      }
    }
  }
`
export default function WalletBalance () {
  const { library, account } = useWeb3React()
  const [ETHBalance, setETHBalance] = useState<BigNumber>()
  const [WETHBalance, setWETHBalance] = useState<BigNumber>()
  const [list, setList] = useState<wallet[]>()
  const ETHdollar =  useEthPrice(ETHBalance)
  const WETHdollar =  useEthPrice(WETHBalance)
  useEffect(() => {
    getBalance()
    // eslint-disable-next-line
  },[account])

  const getBalance = async() => {
    if(!account) {
      message.error('account is undefined')
      return
    }
    const balance = await library.getBalance(account)
    setETHBalance(balance)
    let signer = library.getSigner(account)
    let weth = new Erc20(ContractAddresses.WETH, signer)
    const WETHBalance = await weth.balanceOf(account)
    setWETHBalance(WETHBalance)
  }

  useEffect(() => {
    if(!ETHBalance || !ETHdollar || !WETHBalance || !WETHdollar) return
    const data = [
      {
        icon: imgurl.ETH36,
        text: 'ETH',
        amount: ETHBalance,
        dollar: ETHdollar,
      },
      {
        icon: imgurl.WETH36,
        text: 'WETH',
        amount: WETHBalance,
        dollar: WETHdollar,
      }
    ]
    setList(data)
  },[ETHBalance,ETHdollar,WETHBalance,WETHdollar])


  return (<Wrap>
    {list?.map((item) => {
      return (<div key={item.text} className="item">
        <div className='left'>
          <img src={item.icon} alt="" />
          <span>{item.text}</span>
        </div>
        <div className='right'>
            <span>{new BigNumber(item.amount.toString()).div(10 ** 18).dp(4).toFixed()}</span>
            <span>${item.dollar.dp(0).toFixed()}</span>
        </div>
      </div>)
    })}
  </Wrap>)
}
