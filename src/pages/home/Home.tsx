import React, { useState, useEffect } from 'react'
import Swiper from './components/Swiper'
import {
  HomeWrap,
  SwiperBox,
  DetailBox,
  Partners,
  Background,
  PartnerBox,
  Introduces,
  SliderChoose,
  BorrowBox,
  HomeBox,
  HomeLeft,
  HomeNFT,
  StepProgress
} from './HomeStyled'
import { imgurl } from 'utils/globalimport'
import ButtonDefault from 'component/ButtonDefault'
import Table from './components/Table'
import TableA from 'component/Table/Table'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { urls } from '../../utils/urls'
import http from '../../utils/http'
import Npics from './components/Npics'
import Title from './components/Title'
import Detail from './components/Detail'
import { Animate } from 'react-simple-animate'
import {useAppSelector} from "../../store/hooks"
const MyTable: any = styled(Table)`
  /* min-width: 16rem; */
  height: 7.47rem;
  margin: 0 auto;
`

function Home() {
  const isAnimate = useAppSelector(state=>state.app.isAnimate)
  const [checkText, setCheckText] = useState<number>(1)
  const [textContent, setTextContent] = useState<string>('')
  const [progress, setProgress] = useState<string>('0%')
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [isHover, setIsHover] = useState<boolean>(false)
  const [showAnimeta, setShowAnimeta] = useState<boolean>(false)
  const [debounceTime, setDebounceTime] = useState<NodeJS.Timeout>()
  const [aprData, setAprData] = useState<{ apr: number; rewardApr: number }>({
    apr: 0,
    rewardApr: 0
  })

  const PartnerData = [
    {
      url: imgurl.home.MetaMask,
      width: '1.9rem'
    },
    {
      url: imgurl.home.Ethereum,
      width: '1.9rem'
    },
    {
      url: imgurl.home.DYDX,
      width: '1.25rem'
    },
    {
      url: imgurl.home.BendDAO,
      width: '1.9rem'
    },
    {
      url: imgurl.home.Opensea,
      width: '1.9rem'
    },
    {
      url: imgurl.home.X2Y2,
      width: '1.4rem'
    },
    {
      url: imgurl.home.Looksrare,
      width: '1.9rem'
    },
    {
      url: imgurl.home.Uniswap,
      width: '1.92rem'
    },
    {
      url: imgurl.home.Aave,
      width: '1.35rem'
    }
  ]
  const StepsList = ['Choose', 'Checkout', 'Payment']

  const checkProgress = (e: any) => {
    setCheckText(e + 1)
  }

  useEffect(
    () => {
      let startTimer
      if (!isHover) {
        const startSwiper = () => {
          startTimer = setTimeout(() => {
            if (checkText === 3) {
              setCheckText(1)
            } else {
              setCheckText(checkText + 1)
            }
          }, 5000)
          setTimer(startTimer)
        }
        startSwiper()
      }
      switch (checkText) {
        case 1:
          setTextContent(
            'Without tedious comparisons, Npics delivers all vaild listings among NFT markets and executes each transaction at the best price and optimal financing.'
          )
          setProgress('0%')
          return
        case 2:
          setTextContent(
            'Pay part of funds, get and deposite your NFT to generate a vault outright. A NEO-NFT will be minted as synthetic version of the purchased NFT. All claimable airdrops and rewards will be fully reserved for you. '
          )
          setProgress('33.33%')
          return
        case 3:
          setTextContent(
            'The collateralized NFT can be redeemed upon repayment at anytime you want, which means your relevant vault will be closed out.'
          )
          setProgress('66.66%')
          return
        default:
          break
      }
    },
    [checkText]
  )
  useEffect(() => {
    // get thw arp
    http.myPost('/npics-nft/app-api/v2/nfthome/getAprInfo', {}).then(resp => {
      let _resp = resp as any
      if (_resp.code === 200) {
        setAprData({
          apr: parseFloat(_resp.data.apr) || 0,
          rewardApr: parseFloat(_resp.data.rewardApr) || 0
        })
      }
    })
    // window.addEventListener('scroll', handleScroll, false)
    // return () => {
    //   clearTimeout(timer)
    //   window.removeEventListener('scroll', handleScroll)
    // }
  }, [])
  // const handleScroll = () => {
  //   const detailDom = document.querySelector('.detail_div')
  //   const windowHeight = window.innerHeight
  //   if (detailDom) {
  //     const domHeight = detailDom.getBoundingClientRect().y
  //     if (domHeight! <= windowHeight) {
  //       setShowAnimeta(true)
  //     }
  //   }
  // }
  const mouseEnter = () => {
    clearTimeout(timer)
    setIsHover(true)
  }
  const mouseLeave = () => {
    setIsHover(false)
    setTimeout(() => {
      if (checkText === 3) {
        setCheckText(1)
      } else {
        setCheckText(checkText + 1)
      }
    }, 5000)
  }

  return (
    <HomeWrap>
      <Background>
        <HomeBox>
          <HomeLeft>
            <Title />
          </HomeLeft>
          <HomeNFT>
            <img className="nfts_img" src={imgurl.home.NftsIcon} alt="" />
          </HomeNFT>
        </HomeBox>
      </Background>
      <SwiperBox hidden={true}>
        <div className="title">NPicser Sweeps</div>
        <Swiper />
      </SwiperBox>
      <div>
        <div className="collections-title">Collections</div>
        <MyTable />
        {/* <TableA /> */}
      </div>
      <DetailBox>
        <div className="title detail_title">Product Framework</div>
        <div className="detail_div">
          <div className="detail_info">
            <Detail />
          </div>
          <div className="detail_img_box">
            <Animate
              play={isAnimate}
              duration={0.5}
              delay={0.5}
              start={{ opacity: 0, transform: 'translateX(1rem)' }}
              end={{ opacity: 1, transform: 'translateX(0)' }}
            >
              <img className="detail_img" src={imgurl.home.Deail} alt="" />
            </Animate>
          </div>
        </div>
      </DetailBox>

      <BorrowBox>
        <div
          className="borrow_left"
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          <div className="borrow_title">
            Using Npics Leverage to borrow money to buy will get an unexpected
            earnings.
          </div>
          <div className="borrow_step">
            <div className="step_list">
              {StepsList.map((item, index) => {
                return (
                  <SliderChoose
                    color={
                      index + 1 === checkText ? '#fff' : 'rgba(255,255,255,.6)'
                    }
                    key={item}
                    onClick={() => checkProgress(index)}
                  >
                    {item}
                  </SliderChoose>
                )
              })}
            </div>
            <StepProgress left={progress} />
            <div className="step_text">
              {textContent}
            </div>
          </div>
          <div className="borrow_more">
            <ButtonDefault
              types='primary'
              color='#fff'
              isScale={true}
              onClick={() => {
                window.open(urls.resource, '_blank')
              }}
            >
              Get Started
            </ButtonDefault>
            <Link to={'/dashboard/rewards'}>
              <ButtonDefault color="#333" types={'second'} isScale={true}>
                Claim Rewards
              </ButtonDefault>
            </Link>
          </div>
        </div>
        <div className="borrow_right">
          <div className="borrow_channel">
            <div className="channel_left">
              <div className="left_content">
                <div className="left_content_apr">
                  <span>Vaults APR</span>
                  <span>{`${(aprData.rewardApr * 100 - aprData.apr).toFixed(
                    2
                  )}%`}</span>
                </div>
              </div>
            </div>
            <div className="channel_right">
              <div className="content">
                <div className="content_apr">
                  <span>Interest APR</span>
                  <span>{`${-aprData.apr.toFixed(2)}%`}</span>
                </div>
                <span>
                  The real-time annual percentage rate of interest to be paid to
                  the lending pool.
                </span>
              </div>

              <div className="content">
                <div className="content_apr">
                  <span>Rewards APR</span>
                  <span>{`${(aprData.rewardApr * 100).toFixed(2)}%`}</span>
                </div>
                <span>
                  The rewards APR is real-time annual rate of lending pool subsidy
                </span>
              </div>
            </div>
          </div>
        </div>
      </BorrowBox>

      <Introduces>
        <div className="title">
          <span>Why NPics？</span>
        </div>
        <div className="Introduces_swiper">
          <Npics />
        </div>
      </Introduces>

      <Partners>
        <div className="title">Our Partners & Ecosystem</div>

        <div className="partnerGroup">
          {PartnerData.map((item, index) => {
            return (
              <PartnerBox key={index} width={item.width}>
                <img src={item.url} alt="" />
              </PartnerBox>
            )
          })}
        </div>
      </Partners>
    </HomeWrap>
  )
}

export default Home
