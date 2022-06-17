import { message } from 'antd';
import ButtonDefault from 'component/ButtonDefault'
import React, { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import { Npics } from 'abi/Npics'
import { DataSource } from './Tableutils'
import { Wrap, Repay, Offers } from './Tableutils'
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'store/hooks';
import { setIsLoading } from 'store/app';
import { imgurl } from 'utils/globalimport';
import http from 'utils/http';


interface Iprops {
  detailInfo: DataSource | undefined
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>
}



export default function AgDetail(props: Iprops) {
  const { detailInfo, setIsShowDetail } = props
  const { account, library } = useWeb3React()
  const [progressVal, setProgressVal] = useState<number>(1)
  const [showContent, setShowContent] = useState<string>('repay')
  const [walletBalance, setWalletBalance] = useState<BigNumber>()
  const [payDebt, setPayDebt] = useState<BigNumber>()
  const [remainingDebt, setRemainingDebt] = useState<BigNumber>()
  const [enough, setEnough] = useState<boolean>()
  const [aprData, setAprData] = useState<{ apr: number, rewardApr: number }>({ apr: 0, rewardApr: 0 })
  const action = useAppDispatch()

  useEffect(() => {
    // get thw arp
    http.myPost("/npics-nft/app-api/v2/nfthome/getAprInfo", {}).then((resp) => {
      let _resp = resp as any;
      if (_resp.code === 200) {
        setAprData({
          apr: parseFloat(_resp.data.apr) || 0,
          rewardApr: parseFloat(_resp.data.rewardApr) || 0
        })
      }
    })
  }, [])

  useEffect(() => {
    getBalance()
    // eslint-disable-next-line
  }, [account])

  useEffect(() => {
    if (!walletBalance || !detailInfo) return
    if (new BigNumber(walletBalance.toString()).gt(detailInfo?.debt)) {
      setEnough(true)
    } else {
      setEnough(false)
    }

    // eslint-disable-next-line
  }, [walletBalance])

  useEffect(() => {
    if (!detailInfo) return
    const pDebt = progressVal === 1 ? detailInfo.maxDebt : detailInfo?.debt.times(progressVal)
    const rDebt = progressVal === 1 ? new BigNumber(0) : detailInfo?.debt.times(1 - progressVal)
    setPayDebt(pDebt)
    setRemainingDebt(rDebt)
    // eslint-disable-next-line
  }, [progressVal])


  const getBalance = async () => {
    if (!account) message.error('account is undefined')
    const balance = await library.getBalance(account)
    setWalletBalance(balance)
  }

  const goBack = () => {
    setIsShowDetail(false)
  }
  const onClickChange = (e: string) => {
    setShowContent(e)
  }
  const onRepay = async () => {
    if (!detailInfo || !payDebt) return
    try {
      const signer = library.getSigner(account)
      const npics = new Npics(signer)
      const nft = detailInfo?.address
      const tokenId = detailInfo?.tokenId
      action(setIsLoading(true))
      const tx = await npics.repayETH(nft, tokenId, payDebt)
      action(setIsLoading(false))
      if (tx && tx.hash) {
        message.success('successful repayment')
        goBack()
      }
    } catch (e: any) {
      action(setIsLoading(false))
      message.error(JSON.parse(JSON.stringify(e)).reason || JSON.parse(JSON.stringify(e)).message)
    }
  }

  const onProgressBar = (e: any) => {
    setProgressVal(e)
  }

  const jumpToMarket = () => {
    if (!detailInfo) return
    window.open(`https://x2y2.io/eth/${detailInfo?.address}/${detailInfo?.tokenId}`)
  }


  return (<Wrap>
    <div className='info'>
      <div className='total'>
        <div className='backBtn' onClick={goBack}>←</div>
        <div>
          <div className='title'>
            Contract Detail
          </div>
          <div>
            <span>Collateral Bored Ape Yacht Club</span>
            <span>
              {`#${detailInfo?.tokenId}`}
            </span>
          </div>
        </div>
      </div>
      <div className='checkBtn'>
        <div>Status</div>
        <div>{detailInfo?.statusSrt}</div>
      </div>
    </div>

    <div className='price'>
      <img src={detailInfo?.imageUrl} alt="" />
      <div className='price-item'>

        <div>
          <div>
            Minted NFT
          </div>
          <div onClick={jumpToMarket} style={{ cursor: 'pointer' }}>
            <span>{`${detailInfo?.address.replace(detailInfo?.address.substr(7, 31), '...')} #${detailInfo?.tokenId}`}</span>
            <img src={imgurl.market.exportIcon} alt="" />
          </div>
        </div>

        <div>
          <div>
            Estimated Profit
          </div>
          <div>
            <img src={imgurl.dashboard.catalogue26} alt="" />
            <span>{detailInfo?.liquidationPrice}</span>
          </div>
        </div>

        <div>
          <div>
            Health factor
          </div>
          <div>
            <img src={imgurl.dashboard.catalogue26} alt="" />
            <span>{detailInfo?.healthFactor}</span>
          </div>
        </div>

        <div>
          <div>
            Floor price
          </div>
          <div>
            <img src={imgurl.dashboard.catalogue26} alt="" />
            <span>{detailInfo?.floorPrice}</span>
          </div>
        </div>

        <div>
          <div>
            Debt
          </div>
          <div>
            <img src={imgurl.dashboard.catalogue26} alt="" />
            <span>{detailInfo?.debtString}</span>
          </div>
        </div>

        <div>
          <div>
            Vault APR
          </div>
          <div>
            <img src={imgurl.dashboard.catalogue26} alt="" />
            <span>{`${(aprData.rewardApr*100 - aprData.apr).toFixed(2)}%`}</span>
          </div>
        </div>
        <div>
          <div>
            Liquidation Price
          </div>
          <div>
            <img src={imgurl.dashboard.catalogue26} alt="" />
            <span>{detailInfo && new BigNumber(detailInfo?.debt.toString()).div('0.9').div(10 ** 18).toFixed(2, 1)}</span>
          </div>
        </div>

      </div>
    </div>

    <div className='rotation'>
      <div className={`Repay ${showContent === 'repay' ? 'active' : ''}`} onClick={() => onClickChange('repay')}>Repay</div>
      <div className={`Offers ${showContent === 'offers' ? 'active' : ''}`} onClick={() => onClickChange('offers')}>Offers</div>
    </div>

    {
      showContent === 'repay' ?
        <Repay>
          <div className='panel'>
            <div className={`${enough ? 'enough' : 'un-enough'}`}>
              {enough ? 'Your balance is sufficient, You can repay entire of your loan.' : 'Your balance is insufficient, You can repay just a part of your loan.'}
            </div>
            {progressVal === 1 ? <div className='hint'>
              The default slippage for this transaction is 0.1%. The maximum slippage is 0.01 ETH.<br /> All unused ETH will be send back to your wallet
            </div> : null}
            <div className='repayPrice'>
              <div>
                <div>{detailInfo && payDebt && payDebt.div(10 ** 18).toFixed(4, 1)}</div>
                <span>
                  Remaining debt :
                  <span className='space'>{remainingDebt && remainingDebt.div(10 ** 18).toFixed(4, 1)}</span>
                </span>
              </div>
              <div>
                <div>--</div>
                <span>
                  New health factor :
                  <span className='space'>{
                    detailInfo &&
                    remainingDebt &&
                    (remainingDebt.eq(0) ?
                      '--' :
                      payDebt?.eq(0) ? 
                      detailInfo?.healthFactor :
                      new BigNumber(detailInfo?.floorPrice.toString()).times('0.9').div(remainingDebt?.div(10 ** 18)).toFixed(4, 1))
                  }</span>
                </span>
              </div>
              <div>
                <div>{payDebt && progressVal === 1 ? payDebt.div(10 ** 18).toFixed(4, 1) : detailInfo?.debtString}</div>
                <span>
                  Wallet balance :
                  <span className='space'>{walletBalance && new BigNumber(walletBalance.toString()).div(10 ** 18).dp(4, 1).toFixed()}</span>
                </span>
              </div>
            </div>
          </div>
          <div className='progress'>
            <ProgressBar
              onChange={onProgressBar}
              value={progressVal}
            ></ProgressBar>
          </div>
          <div className='confirm'>
            <ButtonDefault
              types='three'
              onClick={onRepay}
              disabled={progressVal === 0 ? true : false}
            >
              Repay
            </ButtonDefault>
          </div>
        </Repay> :
        <Offers>
          <h2 style={{ "color": "#fff", "margin": ".16rem 0 0 .08rem" }}>Coming soon</h2>
        </Offers>
    }


  </Wrap>)
}