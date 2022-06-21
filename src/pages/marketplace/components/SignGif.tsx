import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { message, Progress } from 'antd';
import { imgurl } from 'utils/globalimport';
import ButtonDefault from 'component/ButtonDefault';
import { Npics } from 'abi/Npics'
import { useWeb3React } from '@web3-react/core';
import { CollectionDetail } from 'model/user';
import http from 'utils/http';
import { compute } from './utils';
import { setIsLoading } from 'store/app';
import { useAppDispatch } from 'store/hooks';
import BigNumber from 'bignumber.js';

const Wrap = styled.div`
  text-align: center;
  width: 8rem;
  margin: 0 auto;
  .progress {
    .progress-text {
      display: flex;
      justify-content: space-between;
      span {
        font-family: 'PingFang HK';
        font-style: normal;
        font-weight: 600;
        font-size: .16rem;
        color: rgba(255,255,255,.5);
      }
    }
  }
  .loading {
    text-align: center;
    margin: .6rem 0;
  }
  .wait-time {
    margin-top: .3rem;
    margin-bottom: .8rem;
    &>span:nth-child(1) {
      font-size: .14rem;
      color: rgba(255,255,255,.5);
      margin-right: .1rem;
    }
  }
  .bottomBtn {
    display: flex;
    justify-content: space-evenly;
    .logo {
      display: flex;
      align-items: center;
      img {
        margin-right: .1rem;
      }
    }
  }
`
const list = [
  {
    imgurl: imgurl.market.OpenseaBuy,
    text: 'OpenSea',
  },
  {
    imgurl: imgurl.market.DYDXBuy,
    text: 'DYDX',
  },
  {
    imgurl: imgurl.market.BendDAOBuy,
    text: 'BendDAO',
  }
]
interface Iprops {
  setAgreementSign: React.Dispatch<React.SetStateAction<boolean>>
  setSignState: React.Dispatch<React.SetStateAction<string>>
  collectionItemsDetail: CollectionDetail | undefined
  payWith: string
  WETHBalance: BigNumber | undefined
  walletBalance: BigNumber | undefined
}
// let interval: NodeJS.Timeout
export default function SignGif(props: Iprops) {
  const { account, library } = useWeb3React()
  const [percent, setPercent] = useState<number>(30)
  const { setAgreementSign, setSignState, collectionItemsDetail, payWith, WETHBalance } = props
  const action = useAppDispatch()
  useEffect(() => {
    pushAgreement()
    // return () => {
    //   return clearTimeout(interval)
    // }
    // eslint-disable-next-line
  }, [])


  const pushAgreement = async() => {
    try {
      const signer = library.getSigner(account)
      const npics = new Npics(signer)
      let balanceToken:string = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      // let sell: any[] | string = ''
      let payWethAmt : BigNumber = new BigNumber(0)
      let payEthAmt : BigNumber = new BigNumber(0)
      let payAmount = compute(collectionItemsDetail)?.agreementPrice as BigNumber
      let loadAmt = compute(collectionItemsDetail)?.loanFunds
      let payWithType = ''

      if(payWith === 'all') {
        // balanceToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        payWithType = 'weth'
        if(WETHBalance?.gt(payAmount)) {
          payWethAmt = WETHBalance
          payEthAmt = new BigNumber(0)
          // sell = ""
        } else {
          payWethAmt = WETHBalance as BigNumber
          payEthAmt = payAmount.minus(payWethAmt) as BigNumber
          // sell = [
          //   {
          //     standard: "ERC20",
          //     address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          //     priceInfo: {
          //       asset: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          //       decimals: 18,
          //       price: {
          //         type: "BigNumber",
          //         hex: "0x11c37937e08000"
          //       }
          //     },
          //     balance: {
          //       type: "BigNumber",
          //       hex: "0x2386f26fc10000"
          //     },
          //     quantity: {
          //       type: "BigNumber",
          //       hex: "0x11c37937e08000"
          //     }
          //   }
          // ]
          // sell = JSON.stringify(sell)
        }
      } else if ( payWith === 'eth' ) {
        // sell = ''
        // balanceToken = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        payWithType = 'eth'
        payWethAmt = new BigNumber(0)
        payEthAmt = payAmount
      } else if ( payWith === 'weth' ) {
        // sell = ''
        // balanceToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        payWethAmt = compute(collectionItemsDetail)?.agreementPrice as BigNumber
        payEthAmt= new BigNumber(0)
        payWithType = 'weth'
      }
      
      const url = "/npics-nft/app-api/v2/nft/route"
      const raw = {
        "address": collectionItemsDetail?.address,
        "amount": 1,
        "balanceToken": balanceToken,
        "sender": account,
        // "sell": sell,
        "standard": collectionItemsDetail?.standard,
        "tokenId": collectionItemsDetail?.tokenId
      }
      const result:any = await http.myPost(url,raw)
      if( result.code === 200 && result.data && collectionItemsDetail ) {
        if (!result.data.transaction) {
          message.warning("item has been sold")
          setSignState('failure')
          setAgreementSign(false)
          return
        }
        const marketAddress = {
          opensea:'0x00000000A50BB64b4BbEcEB18715748DfacE08af',
          seaport:'0x00000000006c3852cbEf3e08E8dF289169EdE581',
          x2y2:'0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2',
          looksrare:'0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2',
          nftx:'0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2',
          xMarket:'',
        }
        const params: any = {
          nft: collectionItemsDetail?.address,
          tokenId: collectionItemsDetail?.tokenId,
          tradeDetail: result.data.transaction,
          loadAmt: loadAmt,
          payEthAmt: payEthAmt,
          price: collectionItemsDetail?.currentBasePrice,
          market:marketAddress[collectionItemsDetail.market],
          wethAmt:payWethAmt,
        }
        // console.log(`tokenId => ${params.tokenId}, nft => ${params.nft}`)
        console.log(params)
        action(setIsLoading(true))
        let tx
        if(payWithType === 'eth') {
          tx = await npics.downPayWithETH(params)
        } else {
          tx = await npics.downPayWithWETH(params)
        }
        await tx.wait()
        action(setIsLoading(false))
        setPercent(100)
        setSignState('success')
        setAgreementSign(false)
      } else {
        setSignState('failure')
        setAgreementSign(false)
        action(setIsLoading(false))
      }
    } catch (e) {
      setSignState('failure')
      setAgreementSign(false)
      action(setIsLoading(false))
      console.log(JSON.parse(JSON.stringify(e)));
      message.error(JSON.parse(JSON.stringify(e)).reason || 'User rejected the request')
    }
  }


  // const sign = () => {
  //   interval = setTimeout(() => {
  //     setAgreementSign(false)
  //   }, 500);
  //   if ('success') {
  //     setSignState('failure')
  //     setPercent(100)
  //   } else {
  //     setSignState('success')
  //   }
  // }

  return (
    <Wrap>
      <div className='progress'>
        <Progress percent={percent} showInfo={false} strokeColor={"linear-gradient(284.2deg, #FF0000 0%, #FEB240 101.06%)"} />
        <div className='progress-text'>
          <span>Authorized Payment</span>
          <span>Sign Done</span>
        </div>
      </div>

      <div className='loading'>
        <img src={imgurl.market.loading} alt="" />
      </div>

      <div>Contract in progress</div>

      <div className='wait-time'>
        <span>Estimated waiting time is</span>
        <span>30s</span>
      </div>

      <div className='bottomBtn'>
        {list.map((item) => {
          return (
            <ButtonDefault types='two' width='1.8rem' height='.52rem' key={item.text}>
              <div className='logo'>
                <img src={item.imgurl} alt="" />
                <span>{item.text}</span>
              </div>
            </ButtonDefault>
          )
        })}
      </div>

    </Wrap>
  )
}
