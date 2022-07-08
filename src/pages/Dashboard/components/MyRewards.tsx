import React, { useState, useEffect } from 'react'
import ButtonDefault from 'component/ButtonDefault'
import { useWeb3React } from '@web3-react/core';
import { Npics } from 'abis/Npics'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setIsLoading } from 'store/app';
import { message } from 'antd';
import Segmented from 'component/Segmented'
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { imgurl } from 'utils/globalimport';
import {User} from "../../../model/user";
import {deserialize} from "class-transformer";

const Rewards = styled.div`
  color: #fff;
  .title {
    margin-bottom: .2rem;
    &>div {
      font-size: .3rem;
      color: #fff;
      font-weight: 800;
      font-family: 'Montserrat';
      font-style: normal;
    }
    &>span {
      font-family: 'PingFang HK';
      font-style: normal;
      font-weight: 600;
      font-size: .16rem;
      color: rgba(255,255,255,.5);
    }
  }
  .content-reward {
    width: 12.7rem;
    //height: 5.75rem;
    background: rgba(255, 255, 255, .1);
    border: .01rem solid rgba(255, 255, 255, .2);
    border-radius: .1rem;
    padding: .3rem .8rem .4rem .6rem;
    display: flex;
    flex-direction: column;
    .content-arp {
      display: flex;
      min-height: 2rem;
      &>div:nth-child(1) {
        width: 6rem;
        margin-right: 1.2rem;
        .text {
          color: rgba(255,255,255,.5);
          font-size: .14rem;
          font-weight: 400;
        }
      }
      &>div:nth-child(2) {
        display: flex;
        align-items: center;
        img{
          width: .56rem;
          height: .56rem;
          margin-right: .2rem;
        }
        &>div {
          &>div {
            
            &>span:nth-child(1) {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 700;
              font-size: .3rem;
              color: #fff;
              margin-right: .18rem;
            }
            &>span:nth-child(2) {
              display: inline-block;
              width: 2.18rem;
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 800;
              font-size: .4rem;
              background: linear-gradient(265.23deg,#FF0F0F 0%,#FF820F 97.96%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              text-fill-color: transparent;
            }
          }
          &>span {
            white-space: nowrap;
            color: rgba(255,255,255,.5);
            font-weight: 400;
            font-size: .14rem;
          }
        }
      }
    }
    .reward-button {
      button {
        margin: .3rem auto;
      }
    }
    .your-rewards {
      margin-top: 22px;
      .title {
        font-family: 'PingFang HK';
        font-style: normal;
        font-weight: 600;
        font-size: .16rem;
        color: #fff;
        margin-bottom: .1rem;
      }
      .NPT,.BEND {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .94rem;
        border-bottom: .01rem solid rgba(255, 255, 255, .1);
        .text {
          span {
            color: rgba(255,255,255,.5);
            font-size: .14rem;
          }
          span:last-child {
            color: #fff;
            margin-left: .25rem;
          }
        }
        img {
          height: .44rem;
        }
      }
    }
  }
`

function MyRewards() {
  const { account, provider } = useWeb3React()
  const action = useAppDispatch()
  const userInfo = useAppSelector(state => deserialize(User, state.app.currentUser))
  const [option, setOption] = useState<string | number>("Npics Compounder")
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0))
  useEffect(() => {
    getBalance()
    // eslint-disable-next-line
  }, [])
  const getBalance = async () => {
    const signer = provider!.getSigner(account)
    let npics = new Npics(signer)
    const Balance: BigNumber = await npics.getRewardsBalance(userInfo?.address || '')
    console.log(Balance.toString())
    setBalance(Balance)
  }

  const onRewards = async () => {
    try {
      const signer = provider!.getSigner(account)
      let npics = new Npics(signer)
      action(setIsLoading(true))
      await npics.claimRewards()
      action(setIsLoading(false))
    } catch (e) {
      action(setIsLoading(false))
      message.error(JSON.parse(JSON.stringify(e)).message)
    }

  }


  return (<Rewards>
    <div className='title'>
      <div>Npics Rewards</div>
      <span>Participate in the down payment loan to buy NFT and earn double rewards</span>
    </div>
    <div className='content-reward'>

      <div className='content-arp'>
        <div>
          <Segmented
            options={["Npics Compounder", "NFTs-BlindBox", "Staking"]}
            onChange={setOption}
          ></Segmented>
          <div className='text'>
            {(() => {
              switch (option) {
                case 'Npics Compounder':
                  return <span>The revenue rates shown are estimated and will fluctuate based on many different factors, including token price, trading volume, liquidity, pledge volume, etc.
                  Transaction fees collected by NPics are distributed as rewards to platform loan purchasers. Eco-partner rewards are rewards adjusted approximately every 24 hours based on the last 24 hours of trading activity.</span>
                case 'NFTs-BlindBox':
                  return <span>Coming soon</span>
                case 'Staking':
                  return <span>Coming soon</span>
                default:
                  break;
              }
            })()}
          </div>
        </div>
        <div style={{display:"none"}}>
          <img src={imgurl.dashboard.ARP} alt="" />
          <div>
            <div>
              <span>ARP</span>
              <span>---</span>
            </div>
            <span>NPics APR + BendDAO Reward APR - Loan Interest</span>
          </div>
        </div>
      </div>

      <div className='your-rewards'>
          <div className='title'>
            Your rewards
          </div>
          <div className='NPT' style={{display:"none"}}>
            <div><img src={imgurl.dashboard.NPT} alt="" /></div>
            <div className='text'>
              <span>Reward to be received : </span>
              <span>--</span>
              <span>MAX</span>
            </div>
          </div>
          <div className='BEND'>
            <div><img src={imgurl.dashboard.BEND} alt="" /></div>
            <div className='text'>
              <span>Reward to be received : </span>
              <span>{balance && new BigNumber(balance?.toString()).dp(4).div(10 ** 18).toFixed()}</span>
              <span>MAX</span>
            </div>
          </div>
      </div>

      <div className='reward-button'>
        <ButtonDefault disabled={balance?.toString() === '0'} types={`${balance?.toString() === '0' ? 'disabled' : 'three' }`} onClick={onRewards}>
          Claim
        </ButtonDefault>
      </div>
    </div>
  </Rewards>)

}

export default MyRewards