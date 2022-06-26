import React, { useState, useEffect } from 'react';
import Swiper from './components/Swiper'
import {
  HomeWrap, FirstDiv, SwiperBox, DetailBox, Partners, Background,
  Projection, Glass, PartnerBox, Introduces, IntroduceBox,
  BorrowBox, BorrowGlass, BorrowContent, BorrowBtn, HomeBox, HomeLeft, HomeNFT
} from './HomeStyled';
import { imgurl } from 'utils/globalimport';
import ButtonDefault from 'component/ButtonDefault';
import Button from 'component/Button';
import Table from './components/Table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { urls } from "../../utils/urls";
import http from "../../utils/http";
import Npics from './components/Npics';
import Title from './components/Title';
const MyTable: any = styled(Table)`
  width: 16rem;
  height: 7.47rem;
  margin: 0 auto;
`

function Home() {
  const [checkText, setCheckText] = useState<number>(1)
  const [textContent, setTextContent] = useState<string>('')
  const [aprData, setAprData] = useState<{ apr: number, rewardApr: number }>({ apr: 0, rewardApr: 0 })

  const PartnerData = [
    {
      url: imgurl.home.MetaMask,
      title: "MetaMask",
      text: "The most trusted & secure crypto wallet",
      content: "Wallet"
    },
    {
      url: imgurl.home.BendDAO,
      title: "BendDAO",
      text: "The first NFTs collateral to borrow ETH app.",
      content: "Dapp"
    },
    {
      url: imgurl.home.gem,
      title: "gem",
      text: "The NFTs best aggregate marketplace",
      content: "Makerplace"
    },
    {
      url: imgurl.home.X2Y2,
      title: "X2Y2",
      text: "The community NFTs marketplace",
      content: "Makerplace"
    },
    {
      url: imgurl.home.Opensea2,
      title: "OpenSea",
      text: "The largest NFTs marketplace",
      content: "Makerplace"
    },
    {
      url: imgurl.home.Looksrare,
      title: "Looksrare",
      text: "The people NFTs marketplace",
      content: "Makerplace"
    },
    {
      url: imgurl.home.DYDX,
      title: "DYDX",
      text: "An open platform for advanced cryptofinancial products",
      content: "Protocol"
    },
    {
      url: imgurl.home.Trustwallet,
      title: "Trustwallet",
      text: "Best Cryptocurrency Wallet",
      content: "Makerplace"
    },
  ]
  const StepsList = ['Choose', 'Checkout', 'Payment']

  const checkProgress = (e: any) => {
    setCheckText(e + 1)
  }

  useEffect(() => {
    switch (checkText) {
      case 1:
        return setTextContent('Without tedious comparisons, Npics delivers all vaild listings among NFT markets and executes each transaction at the best price and optimal financing.');
      case 2:
        return setTextContent('Pay part of funds, get and deposite your NFT to generate a vault outright. A NEO-NFT will be minted as synthetic version of the purchased NFT. All claimable airdrops and rewards will be fully reserved for you. ');
      case 3:
        return setTextContent('The collateralized NFT can be redeemed upon repayment at anytime you want, which means your relevant vault will be closed out.');
      default:
        break;
    }
  }, [checkText])

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


  return (
    <HomeWrap>
      <Background>
        <HomeBox>
          <HomeLeft>
            <Title />
          </HomeLeft>
          <HomeNFT>
            <img className='nfts_img' src={imgurl.home.NftsIcon} alt="" />
          </HomeNFT>
        </HomeBox>
      </Background>
      <SwiperBox>
        <div className='title'>
          NPicser Sweeps
        </div>
        <Swiper />
      </SwiperBox>
      <div>
        <div className='collections-title'>
          Collections
        </div>
        <MyTable></MyTable>
      </div>

      <DetailBox>
        <div className='detail_info'>
          <div className='detail_info_item'>
            <div className='info_item_title'>Advanced mortgage to buy NFTs</div>
            <div className='info_item_text'>One-click down payment to purchase a Blue-chip with optimal financing, which achieved through NBP Protocol, stands for NFT-backed Position. </div>
          </div>
          <div className='detail_info_item'>
            <div className='info_item_title'>Flexible Repayment to redeem NFTs</div>
            <div className='info_item_text'>Repay at your own pace as long as vault is generated.</div>
          </div>
          <div className='detail_info_item'>
            <div className='info_item_title'>Sell NFT outright to settle profits</div>
            <div className='info_item_text'>Sell it outright to close the vault, including ownership transfer and profits settlement. </div>
          </div>
        </div>
        <div className='detail_img_box'>
          <img className='detail_img' src={imgurl.home.Deail} alt="" />
        </div>
      </DetailBox>

      <BorrowBox>
        <img src={imgurl.home.RectangleLeft} alt="" />
        <img src={imgurl.home.RectangleRight} alt="" />
        <div>
          <BorrowGlass>
            <BorrowContent left={`${checkText * 2.67}rem`}>
              <div className='title'>
                Using Npics Leverage to borrow money to buy will get an unexpected earnings.
              </div>

              <div className='sliderBox'>
                <div className='sliderItem'>
                  {StepsList.map((item, idx) => {
                    return <span key={item} onClick={() => checkProgress(idx)} >{item}</span>
                  })}
                </div>
                <div className='slider'></div>
                <div className='text'>{textContent}</div>
              </div>

              <div className='BorrowChannel'>
                <div className='content'>
                  {/* <img src={imgurl.home.Borrow2} alt="" /> */}
                  <div className='text'>
                    <div>
                      <span>Interest APR</span>
                      <span>{`-${aprData.apr.toFixed(2)}%`}</span>
                    </div>
                    <span>The real-time annual percentage rate of interest to be paid to the lending pool.</span>
                  </div>
                </div>

                <div className='content'>
                  {/* <img src={imgurl.home.Borrow1} alt="" /> */}
                  <div className='text'>
                    <div>
                      <span>Rewards APR</span>
                      <span>{`${(aprData.rewardApr * 100).toFixed(2)}%`}</span>
                    </div>
                    <span>The rewards APR is real-time annual rate of Agreement subsidy</span>
                  </div>
                </div>
              </div>

              <BorrowBtn>
                <ButtonDefault types={"one"} onClick={() => {
                  window.open(urls.resource, "_blank")
                }}>
                  Learn More
                </ButtonDefault>
                <Link to={'/dashboard/rewards'}>
                  <ButtonDefault types={"two"}>
                    Claim Rewards
                  </ButtonDefault>
                </Link>
              </BorrowBtn>

            </BorrowContent>
          </BorrowGlass>
        </div>

      </BorrowBox>

      <Introduces>
        <div className='title'>
          <span>Why NPics？</span>
        </div>
        <div className='Introduces_swiper'>
          <Npics />
        </div>
        {/* <div className='IntroduceGroup'>
          {IntroduceData.map((item) => {
            return (
              <IntroduceBox key={item.title}>
                <img src={item.url} alt="" />
                <span>{item.title}</span>
                <span>{item.text}</span>
              </IntroduceBox>
            )
          })}
        </div> */}
      </Introduces>

      <Partners>
        <div className='title'>
          Our Partnners & Ecosystem
        </div>

        <div className='partnerGroup'>
          {PartnerData.map((item) => {
            return (
              <PartnerBox key={item.title} content={item.content}>
                  <img src={item.url} alt="" />
                  <span>{item.title}</span>
              </PartnerBox>)
          })}
        </div>
      </Partners>

    </HomeWrap>
  );
}

export default Home;