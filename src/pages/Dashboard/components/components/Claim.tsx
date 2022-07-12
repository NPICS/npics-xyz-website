import React, { useState } from 'react'
import Steps from './Steps'
import { font3081, font2051, font1465, font1461, font1455, font1661 } from 'component/styled'
import styled from 'styled-components'
import { imgurl } from 'utils/globalimport'
import { useLocation, useNavigate } from 'react-router-dom'
const MyAidrop = styled.div`
  ${font3081}
  margin-bottom: 20px;
`
const FlashClaim = styled.div`
  display: grid;
  grid-template-rows: repeat(2);
  grid-gap: 20px;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 10px;
  padding: 24px 0 48px 50px;
  color: #fff;
  margin-bottom: 20px;
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
      margin-right: 12px;
      margin-left: 12px;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
`
const Information = styled.div`
  display: flex;
  padding: 60px 46px;
  background: rgba(255, 255, 255, .1);
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 10px;
  &>img {
    width: 180px;
    height: 180px;
    border-radius: 90px;
    margin-right: 100px;
  }
  .info {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(3);
    grid-gap: 50px;
    &>div {
      &>span {
        ${font1455}
        display: inline-block;
        margin-bottom: 12px;
      }
      &>div {
        display: flex;
        align-items: center;
        ${font1661}
        img {
          width: 16px;
          height: 16px;
          margin-left: 12px;
        }
      }
    }
  }

`
const ProgressContent = styled.div`
  background: rgba(255, 255, 255, .1);
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 10px;
  padding: 31px 37px 50px 37px;
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

      <div style={{marginBottom: "50px"}}>
        <button onClick={onBack}>Back</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>

      <Steps status={step}></Steps>
    </ProgressContent>
  </>)
}
