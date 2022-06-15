import React, { useState } from 'react'
import Steps from './Steps'
import { font3081, font2051, font1465, font1461, font1455, font1661 } from 'component/styled'
import styled from 'styled-components'
import { imgurl } from 'utils/globalimport'
import { useLocation, useNavigate } from 'react-router-dom'
const MyAidrop = styled.div`
  ${font3081}
  margin-bottom: .2rem;
`
const FlashClaim = styled.div`
  display: grid;
  grid-template-rows: repeat(2);
  grid-gap: .2rem;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: .24rem 0 .48rem .5rem;
  color: #fff;
  margin-bottom: .2rem;
  .title {
    ${font2051}
  }
  .contract {
    display: flex;
    align-items: center;
    &>span:nth-child(1) {
      ${font1465}
    }
    &>span:nth-child(2) {
      ${font1461}
      margin-right: .12rem;
      margin-left: .12rem;
    }
    img {
      width: .16rem;
      height: .16rem;
    }
  }
`
const Information = styled.div`
  display: flex;
  padding: .6rem .46rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  &>img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: .9rem;
    margin-right: 1rem;
  }
  .info {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(3);
    grid-gap: .5rem;
    &>div {
      &>span {
        ${font1455}
        display: inline-block;
        margin-bottom: 0.12rem;
      }
      &>div {
        display: flex;
        align-items: center;
        ${font1661}
        img {
          width: .16rem;
          height: .16rem;
          margin-left: .12rem;
        }
      }
    }
  }

`
const ProgressContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: .31rem .37rem .5rem .37rem;
`
interface DataSource {
  key: string,
  project: string,
  name: string,
  imgUrl: string,
  address: string,
}
export default function Claim() {
  const location: any = useLocation()
  const { claimDetail }: { claimDetail: DataSource } = location.state
  const [step,setStep] = useState<number>(1)
  const navigate = useNavigate();

  const onConfirm = () => {
    let nextStep = step + 1
    if(nextStep >= 3) nextStep = 3
    setStep(nextStep)
  }
  const onBack = () => {
    if(step === 1) {
      navigate(-1)
    }
    if(step === 2) {
      let nextStep = step - 1
      setStep(nextStep)
    }
    if(step === 3) {
      navigate(-1)
    }
  }

  return (<>
    <MyAidrop>
      My Airdrop
    </MyAidrop>
    
    <FlashClaim>
      <span className='title'>NPics Flash Claim</span>
      <div className='contract'>
        <span>Confirm Your Airdrop receiver contract: </span>
        <span>{claimDetail?.address}</span>
        <img src={imgurl.market.exportIcon} alt="" />
      </div>
    </FlashClaim>

    <Information>
      <img src="" alt="" />

      <div className='info'>
        <div>
          <span>Project</span>
          <div>
            <span>Yuga Otherdeeds</span>
            <img src={imgurl.market.exportIcon} alt="" />
          </div>
        </div>
        <div>
          <span>Token Type</span>
          <div>
            ERC721
          </div>
        </div>
        <div>
          <span>Airdrop Contract</span>
          <div>
            <span>{claimDetail?.address}</span>
            <img src={imgurl.market.exportIcon} alt="" />
          </div>
        </div>
        <div>
          <span>Token Contract</span>
          <div>
            <span>{claimDetail?.address}</span>
            <img src={imgurl.market.exportIcon} alt="" />
          </div>
        </div>
        <div>
          <span>Airdrop NFT Token</span>
          <div>
            <span>Bored Ape Yacht Club</span>
            <img src={imgurl.market.exportIcon} alt="" />
          </div>
        </div>
        <div>
          <span>Comoisable Tokens</span>
          <div>
            ----
          </div>
        </div>
      </div>

    </Information>

    <ProgressContent>

      <div style={{marginBottom: ".5rem"}}>
        <button onClick={onBack}>Back</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>

      <Steps status={step}></Steps>
    </ProgressContent>
  </>)
}
