import React, { useState, useEffect } from 'react';
import Swiper from './components/Swiper'
import {
  HomeWrap, FirstDiv, SwiperBox, Partners, Background,
  Projection, Glass, PartnerBox, Introduces, IntroduceBox,
  BorrowBox, BorrowGlass, BorrowContent, BorrowBtn
} from './HomeStyled';
import { imgurl } from 'utils/globalimport';
import ButtonDefault from 'component/ButtonDefault';
import Button from 'component/Button';
import Table from './components/Table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { urls } from "../../utils/urls";
import http from "../../utils/http";
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
  const IntroduceData = [
    {
      url: imgurl.home.MaskGroup1,
      title: "Low threshold",
      text: "Everyone can have the opportunity to participate in the blue chip NFT",
    },
    {
      url: imgurl.home.MaskGroup2,
      title: "Innovative financial method",
      text: "Everyone can have the opportunity to participate in the blue chip NFT",
    },
    {
      url: imgurl.home.MaskGroup3,
      title: "Low threshold3",
      text: "Everyone can have the opportunity to participate in the blue chip NFT",
    },
  ]
  const StepsList = ['Chose','Checkout','Payment','Issued']

  const checkProgress = (e: any) => {
    setCheckText(e+1)
  }

  useEffect(() => {
    switch (checkText) {
      case 1:
        return setTextContent('Choose the items or collections that you Like in NPics marketplace');
      case 2:
        return setTextContent('Checkout and sign the corresponding generated position based on the selected item.');
      case 3:
        return setTextContent('Confirm and pay advance.');
      case 4:
        return setTextContent('After execution of NFT-backed Postion(NBP) contract on-chain, you will receive the position voucher NPics Everlasting Option NFT(NEO-NFT) issued by contract.');
      case 5:
        return setTextContent('');
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
      <FirstDiv>
        <Background>
          <img src={imgurl.home.Rectangle134} alt="" />
          <img src={imgurl.home.Rectangle149} alt="" />
          <Projection>
            <img src={imgurl.home.map} alt="" />
            <Glass>
              <div className='text'>
                <div>
                  Pay as Low as 60% to own your favorite NFT
                </div>
                <div>
                  The first NFT market that supports down payment loans Use Low-cost purchase methods to obtain
                  high-value NFT, which greatly improves the efficiency of your funds.
                </div>
                <div className='jumpBtn'>
                  <Link to={'/marketPlace'}><Button types='one' text="Marketplace"></Button></Link>
                  <Link to={'/dashboard/rewards'}><Button types='two' text="Rewards"></Button></Link>
                </div>
              </div>
              <div className='imgUrl'>
                <div className='col1'>
                  <img src={imgurl.home.HomeImg1} alt="" />
                  <img src={imgurl.home.HomeImg2} alt="" />
                </div>
                <div className='col2'>
                  <img src={imgurl.home.HomeImg6} alt="" />
                  <img src={imgurl.home.HomeImg7} alt="" />
                </div>
                <div className='col3'>
                  <img src={imgurl.home.HomeImg4} alt="" />
                  <img src={imgurl.home.HomeImg5} alt="" />
                  <img src={imgurl.home.HomeImg3} alt="" />
                </div>
              </div>

              <div className='socialityIcon'>
                <a href={urls.twitter} target="_blank" rel="noreferrer"><img src={imgurl.home.twitterIcon} alt="" /></a>
                {/* <a href={urls.medium} target="_blank" rel="noreferrer"><img src={imgurl.home.gameIcon} alt="" /></a> */}
                <a href={urls.telegram} target="_blank" rel="noreferrer"><img src={imgurl.home.telegramIcon} alt="" /></a>
                <a href={urls.github} target="_blank" rel="noreferrer"><img src={imgurl.home.gitHubIcon} alt="" /></a>
              </div>
              
            </Glass>
          </Projection>
        </Background>
      </FirstDiv>

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

      <BorrowBox>
        <img src={imgurl.home.RectangleLeft} alt="" />
        <img src={imgurl.home.RectangleRight} alt="" />
        <div>
          <BorrowGlass>
            <BorrowContent left={`${checkText * 2}rem`}>
              <div className='title'>
                Using Npics Leverage to borrow money to buy will get an unexpected earnings.
              </div>

              <div className='sliderBox'>
                <div className='sliderItem'>
                  {StepsList.map((item,idx) => {
                    return <span key={item} onClick={() => checkProgress(idx)} >{item}</span>
                  })}
                </div>
                <div className='slider'></div>
                <div className='text'>{textContent}</div>
              </div>

              <div className='BorrowChannel'>
                <div className='left'>
                  <span>Vaults APR</span>
                  <span>{`${(aprData.rewardApr*100 - aprData.apr).toFixed(2)}%`}</span>
                </div>
                <div className='right'>
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
                        <span>{`${(aprData.rewardApr*100).toFixed(2)}%`}</span>
                      </div>
                      <span>The rewards APR is real-time annual rate of Agreement subsidy</span>
                    </div>
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
          <span>
            Activate the NFT market + open financial application and unlock the future of NFT
          </span>
        </div>
        <div className='IntroduceGroup'>
          {IntroduceData.map((item) => {
            return (
              <IntroduceBox key={item.title}>
                <img src={item.url} alt="" />
                <span>{item.title}</span>
                <span>{item.text}</span>
              </IntroduceBox>
            )
          })}
        </div>
      </Introduces>

      <Partners>
        <div className='title'>
          Our Partnners & Ecosystem
        </div>

        <div className='partnerGroup'>
          {PartnerData.map((item) => {
            return (
              <PartnerBox key={item.title} content={item.content}>
                <div>
                  <img src={item.url} alt="" />
                </div>
                <div>
                  <span>{item.title}</span>
                </div>
                <div>
                  <span>{item.text}</span>
                </div>
              </PartnerBox>)
          })}
        </div>
      </Partners>

    </HomeWrap>
  );
}

export default Home;