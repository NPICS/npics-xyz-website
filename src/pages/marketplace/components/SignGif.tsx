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
    img {
      width: .28rem;
      height: .28rem;
    }
  }
`
const list = [
  {
    imgurl: imgurl.market.opensea,
    text: 'OpenSea1',
  },
  {
    imgurl: imgurl.market.opensea,
    text: 'OpenSea2',
  },
  {
    imgurl: imgurl.market.opensea,
    text: 'OpenSea3',
  }
]
interface Iprops {
  setAgreementSign: React.Dispatch<React.SetStateAction<boolean>>
  setSignState: React.Dispatch<React.SetStateAction<string>>
  collectionItemsDetail: CollectionDetail | undefined
}
let interval: NodeJS.Timeout
export default function SignGif(props: Iprops) {
  const { account, library } = useWeb3React()
  const [percent, setPercent] = useState<number>(30)
  const { setAgreementSign, setSignState, collectionItemsDetail } = props
  const action = useAppDispatch()
  useEffect(() => {
    pushAgreement()
    return () => {
      return clearTimeout(interval)
    }
    // eslint-disable-next-line
  }, [])

  const pushAgreement = async() => {
    try {
      const signer = library.getSigner(account)
      const npics = new Npics(signer)
      const url = "/npics-nft/app-api/v2/nft/route"
      const raw = {
        "address": collectionItemsDetail?.address,
        "amount": 1,
        "balanceToken": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        // "balanceToken": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "sender": account,
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
        const params: any = {
          nft: collectionItemsDetail?.address,
          tokenId: collectionItemsDetail?.tokenId,
          tradeDetail: result.data.transaction,
          loadAmt: compute(collectionItemsDetail)?.loanFunds,
          payAmount: compute(collectionItemsDetail)?.agreementPrice,
        }
        action(setIsLoading(true))
        await npics.downPayBatchBuyWithETH(params)
        action(setIsLoading(false))
        setPercent(100)
        setSignState('success')
        setAgreementSign(false)
      }
    } catch (e) {
      setSignState('failure')
      setAgreementSign(false)
      action(setIsLoading(false))
      message.error(JSON.parse(JSON.stringify(e)).reason || 'User rejected the request')
    }
  }


  const sign = () => {
    interval = setTimeout(() => {
      setAgreementSign(false)
    }, 500);
    if ('success') {
      setSignState('failure')
      setPercent(100)
    } else {
      setSignState('success')
    }
  }

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
            <ButtonDefault onClick={sign} types='two' width='1.8rem' height='.52rem' key={item.text}>
              <div>
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
