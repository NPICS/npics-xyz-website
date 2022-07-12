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
    margin-bottom: 20px;
    &>div {
      font-size: 30px;
      color: #fff;
      font-weight: 800;
      font-family: 'Montserrat';
      font-style: normal;
    }
    &>span {
      font-family: 'PingFang HK';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: rgba(255,255,255,.5);
    }
  }
  .content-reward {
    width: 1270px;
    //height: 575px;
    background: rgba(255, 255, 255, .1);
    border: 1px solid rgba(255, 255, 255, .2);
    border-radius: 10px;
    padding: 30px 80px 40px 60px;
    display: flex;
    flex-direction: column;
    .content-arp {
      display: flex;
      min-height: 200px;
      &>div:nth-child(1) {
        width: 600px;
        margin-right: 120px;
        .text {
          color: rgba(255,255,255,.5);
          font-size: 14px;
          font-weight: 400;
        }
      }
      &>div:nth-child(2) {
        display: flex;
        align-items: center;
        img{
          width: 56px;
          height: 56px;
          margin-right: 20px;
        }
        &>div {
          &>div {
            
            &>span:nth-child(1) {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 700;
              font-size: 30px;
              color: #fff;
              margin-right: 18px;
            }
            &>span:nth-child(2) {
              display: inline-block;
              width: 218px;
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 800;
              font-size: 40px;
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
            font-size: 14px;
          }
        }
      }
    }
    .reward-button {
      button {
        margin: 30px auto;
      }
    }
    .your-rewards {
      margin-top: 22px;
      .title {
        font-family: 'PingFang HK';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #fff;
        margin-bottom: 10px;
      }
      .NPT,.BEND {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 94px;
        border-bottom: 1px solid rgba(255, 255, 255, .1);
        .text {
          span {
            color: rgba(255,255,255,.5);
            font-size: 14px;
          }
          span:last-child {
            color: #fff;
            margin-left: 25px;
          }
        }
        img {
          height: 44px;
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