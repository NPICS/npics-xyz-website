import { useWeb3React } from '@web3-react/core'
import { message } from 'antd'
import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import { imgurl } from 'utils/globalimport';
import styled from 'styled-components';
import { Erc20 } from 'abi/Erc20';
import { ContractAddresses } from 'utils/addresses';
import { useEthPrice } from 'utils/hook';
import { font01651, font01455 } from 'component/styled';

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
      ${font01651}
      img {
        width: .22rem;
        height: .22rem;
        margin-right: .1rem;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      &>span:nth-child(1) {
        ${font01651}
        text-align: right;
      }
      &>span:nth-child(2) {
        ${font01455}
        text-align: right;
      }
    }
  }
`
export default function WalletBalance () {
  const { library, account } = useWeb3React()
  const [ETHBalance, setETHBalance] = useState<BigNumber>()
  const [WETHBalance, setWETHBalance] = useState<BigNumber>()
  const [BDBalance, setBDBalance] = useState<BigNumber>()
  const [list, setList] = useState<wallet[]>()
  const ETHdollar =  useEthPrice(ETHBalance)
  const WETHdollar =  useEthPrice(WETHBalance)
  const BDdollar =  useEthPrice(BDBalance)
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

    let bendDao = new Erc20(ContractAddresses.BendDaoProxy, signer)
    const bendDaoBalance = await bendDao.balanceOf(account)
    setBDBalance(bendDaoBalance)
  }

  useEffect(() => {
    if(!ETHBalance || !ETHdollar || !WETHBalance || !WETHdollar || !BDBalance || !BDdollar) return
    const data = [
      {
        icon: imgurl.home.ethBlack22,
        text: 'ETH',
        amount: ETHBalance,
        dollar: ETHdollar,
      },
      {
        icon: imgurl.home.ethOrange22,
        text: 'WETH',
        amount: WETHBalance,
        dollar: WETHdollar,
      },
      {
        icon: imgurl.home.band22,
        text: 'BEND',
        amount: BDBalance,
        dollar: BDdollar,
      }
    ]
    setList(data)
  },[ETHBalance,ETHdollar,WETHBalance,WETHdollar,BDBalance,BDdollar])


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
