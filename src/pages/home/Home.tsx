import React, { useState, useEffect } from 'react';
import Swiper from './components/Swiper'
import {
  HomeWrap, FirstDiv, SwiperBox, DetailBox, Partners, Background,
  Projection, Glass, PartnerBox, Introduces, IntroduceBox, SliderChoose,
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
import { Progress } from 'antd';
import Jazzicon from "../../component/Jazzicon";
import Detail from './components/Detail';
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
    },
    {
      url: imgurl.home.Ethereum,
    },
    {
      url: imgurl.home.BendDAO,
    },
    {
      url: imgurl.home.Opensea,
    },
    {
      url: imgurl.home.X2Y2,
    },
    {
      url: imgurl.home.Looksrare,
    },
    {
      url: imgurl.home.DYDX,
    },
    {
      url: imgurl.home.Aave,
    },
    {
      url: imgurl.home.Uniswap,
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
  }, []);

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
      <SwiperBox hidden={true}>
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
      {/*<Jazzicon address={"0xd0D4701A235BFdA9eE63ed68778962D5059ee2E5"} />*/}
      {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque et fuga illo itaque nisi odio officia omnis placeat possimus, provident quae quos repudiandae, saepe voluptate? Culpa quam temporibus tenetur!*/}
      <DetailBox>
        <div className='detail_info'>
          <Detail />
        </div>
        <div className='detail_img_box'>
          <img className='detail_img' src={imgurl.home.Deail} alt="" />
        </div>
      </DetailBox>

      <BorrowBox className='borrow_box'>
        <img src={imgurl.home.RectangleLeft} alt="" />
        <img src={imgurl.home.RectangleRight} alt="" />
        <div>
          <BorrowGlass>
            <BorrowContent left={`${checkText* 2.67}rem`}>
              <div className='title'>
                Using Npics Leverage to borrow money to buy will get an unexpected earnings.
              </div>
              <div className='sliderBox'>
                <div className='sliderItem'>
                  {StepsList.map((item, idx) => {
                    return <SliderChoose color={idx + 1 === checkText ? '#fff' : 'rgba(255,255,255,.6)'} key={item} onClick={() => checkProgress(idx)} >{item}</SliderChoose>
                  })}
                </div>
                <div className='slider'></div>
                <div className='text'>{textContent}</div>
              </div>

              <div className='BorrowChannel'>
                <div className='brrow_left'>
                  <span>Vaults APR</span>
                  <span>{`${(aprData.rewardApr * 100 - aprData.apr).toFixed(2)}%`}</span>
                </div>
                <div className='brrow_right'>
                  <div className='content'>
                    {/* <img src={imgurl.home.Borrow2} alt="" /> */}
                    <div className='text'>
                      <div>
                        <span>Interest APR</span>
                        <span>{`${-aprData.apr.toFixed(2)}%`}</span>
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
              </div>

              <BorrowBtn>
                <ButtonDefault types={"second"} onClick={() => {
                  window.open(urls.resource, "_blank")
                }}>
                  Learn More
                </ButtonDefault>
                <Link to={'/dashboard/rewards'}>
                  <ButtonDefault color="#fff" types={"two"}>
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
          {PartnerData.map((item,index) => {
            return (
              <PartnerBox key={index}>
                <img src={item.url} alt="" />
              </PartnerBox>)
          })}
        </div>
      </Partners>

    </HomeWrap>
  );
}

export default Home;