import React, { useState, useEffect, Fragment } from 'react'
import Swiper from './components/Swiper'
import {
  HomeWrap,
  SwiperBox,
  FrameBox,
  Partners,
  Background,
  PartnerBox,
  Introduces,
  SliderChoose,
  BorrowBox,
  HomeBox,
  HomeLeft,
  HomeNFT,
  NoteBox,
  StepProgress,
  FrameWarp,
} from './HomeStyled'
import { imgurl } from 'utils/globalimport'
import ButtonDefault from 'component/ButtonDefault'
import Table from './components/Table'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { urls } from '../../utils/urls'
import http from '../../utils/http'
import Npics from './components/Npics'
import Title from './components/Title'
import Frame from './components/Frame'
import { Animate } from 'react-simple-animate'
import { useAppSelector } from "../../store/hooks"
import CountUp from "react-countup";
import { Icon } from 'component/Box'
import Datas from './components/Datas'
import { Space } from 'antd'
const MyTable: any = styled(Table)`
  /* min-width: 16rem; */
  height: 7.47rem;
  margin: 0 auto;
`

function Home() {
  const isAnimate = useAppSelector(state => state.app.isShowDetailAnimate)
  const [checkText, setCheckText] = useState<number>(1)
  const [textContent, setTextContent] = useState<string>('')
  const [progress, setProgress] = useState<string>('0%')
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [isHover, setIsHover] = useState<boolean>(false)
  const [aprData, setAprData] = useState<{ apr: number; rewardApr: number, platform: string }>({
    apr: 0,
    rewardApr: 0,
    platform: ""
  })
  const [showNote, setShowNote] = useState<boolean>(false);
  const PartnerData = [
    {
      url: imgurl.home.MetaMask,
      width: '1.9rem'
    },
    {
      url: imgurl.home.BendDAO,
      width: '1.5rem'
    },
    {
      url: imgurl.WingIcon,
      width: '1.4rem'
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
      url: imgurl.home.DYDX,
      width: '1.25rem'
    },
    {
      url: imgurl.home.Looksrare,
      width: '1.9rem'
    },
    {
      url: imgurl.home.Aave,
      width: '1.35rem'
    },
    {
      url: imgurl.home.Galaxy,
      width: '1.6rem'
    },
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
          rewardApr: parseFloat(_resp.data.rewardApr) || 0,
          platform: _resp.data.platform
        })
      }
    })
    //get sessionStorage
    const isShowNote: boolean = JSON.parse(sessionStorage.getItem("note") || 'true');
    setShowNote(isShowNote)
  }, [])
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
  const openGitbook = () => {
    //click note
    window.open("https://medium.com/@npics.xyz/community-noticeboard-df26affcd7af")
  }
  const closeNote = (e: any) => {
    e.stopPropagation();
    setShowNote(false);
    sessionStorage.setItem("note", JSON.stringify(false))
  }
  return (
    <HomeWrap>
      <Background>
        {/* show note */}
        <NoteBox hidden={!showNote}>
          <div className='note_content' onClick={openGitbook}>
            <div className='note_text'>
              <Icon width={"0.2rem"} src={imgurl.home.NoteIcon} />
              <span>Living Campaign: Contributor Rewards for Push NPics’ Funding Proposal with BendDAO</span>
            </div>
            <div className='note_close' onClick={closeNote}>
              <img className='note_close_icon' src={imgurl.CloseIcon} />
            </div>
          </div>
        </NoteBox>
        <HomeBox>
          <HomeLeft>
            <Title />
          </HomeLeft>
          <HomeNFT>
            <img className="nfts_img" src={imgurl.home.NftsIcon} alt="" />
          </HomeNFT>
        </HomeBox>
        <Datas />
      </Background>
      <SwiperBox hidden={true}>
        <div className="title">NPicser Sweeps</div>
        <Swiper />
      </SwiperBox>
      <div className='collection_box'>
        <div className="collections-title">Collections</div>
        <MyTable />
        {/* background */}
        <div className='collection_bg'>
          <img src={imgurl.home.CollectionProduct} alt="" />
        </div>
      </div>
      <FrameWarp>
        <FrameBox>
          <div className="frame_title">Product Framework</div>
          <div className='frame_div'>
            <Frame />
            <Animate play={isAnimate} delay={0.3} start={{ transform: 'translateY(100px)', opacity: 0 }} end={{ transform: 'translateY(0px)', opacity: 1 }}>
              <div className='detail_img_box'>
                <img className='detail_img' src={imgurl.home.Deail} alt="" />
              </div>
            </Animate>
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
                  <Link to={"/dashboard/rewards"}>
                    <ButtonDefault
                      types='primary'
                      color='#fff'
                      isScale={true}
                    >
                      Claim Rewards
                    </ButtonDefault>
                  </Link>
                  <ButtonDefault color="#333" types={'second'} isScale={true} onClick={() => {
                    window.open(urls.resource, '_blank')
                  }}>
                    Get Started
                  </ButtonDefault>
                </div>
              </div>
              <div className="borrow_right">
                <div className="borrow_channel">
                  <div className="channel_left">
                    <div className="left_content">
                      <div className="left_content_apr">
                        <div className='apr_text_box'>
                          <Icon height="0.18rem" src={aprData.platform === 'wing' ? imgurl.WingIcon : imgurl.home.BendDAO} />
                          <span className='apr_text'>Vaults APR</span>

                        </div>
                        <span>{`${((aprData.rewardApr - aprData.apr) * 100).toFixed(
                          2
                        )}%`}</span>
                      </div>
                    </div>
                  </div>
                  <div className="channel_right">
                    <div className="content">
                      <div className="content_apr">
                        <span>Interest APR</span>
                        <span>{`${-(aprData.apr * 100).toFixed(2)}%`}</span>
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
          </div>
        </FrameBox>
      </FrameWarp>
      <Introduces>
        <div className="title">
          <span>Why NPics？</span>
        </div>
        <div className="Introduces_swiper">
          <Npics />
        </div>
        <div className='Introduces_bg'>
          <img src={imgurl.home.SwiperPartner} alt="" />
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