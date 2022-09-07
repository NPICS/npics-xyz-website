import ButtonDefault from 'component/ButtonDefault'
import { transform } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import { Animate, AnimateGroup } from 'react-simple-animate'
import styled from 'styled-components'
import { useAppSelector } from "../../../store/hooks"
import { imgurl } from 'utils/globalimport'
const FrameBox = styled.div`
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.2rem;
  padding: 0.4rem 0.5rem 0.6rem;
  .frame_info_list{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height: 2rem;
    .info_item{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .item_title{
        font-size: 0.2rem;
        font-weight: 700;
        padding-bottom: 0.24rem;
      }
      .item_text{
        font-size: 0.14rem;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .frame_bg{
    position: absolute;
    right: 0.1rem;
    bottom: -0.55rem;
    height: 2.4rem;
  }
`

const FrameButton = styled.div`
  background: #FF490F;
  color: #fff;
  width: 2.2rem;
  height: 0.66rem;
  line-height: 0.66rem;
  text-align: center;
  font-size: 0.14rem;
  border-radius: 0.1rem;
  font-weight: 600;
  cursor: pointer;
  transition:all 0.1s;
  &:hover{
    transform: scale(1.04);
  }
`

function Frame() {
  const isAnimate = useAppSelector(state => state.app.isShowFrameAnimate)
  const frameList = [
    {
      title: 'Advanced mortgage to buy NFTs',
      text:
        'One-click down payment to purchase a Blue-chip with optimal financing, which achieved through NBP Protocol, stands for NFT-backed Position.'
    },
    {
      title: 'Flexible Repayment to redeem NFTs',
      text: 'Repay at your own pace as long as vault is generated.'
    },
    {
      title: 'Sell NFT outright to settle profits',
      text:
        'Sell it outright to close the vault, including ownership transfer and profits settlement.'
    }
  ]

  const leanMoreUrl = "https://npics.gitbook.io/npics-v1.0/user-guides/mortgage-to-buy-nft"

  const animateProps = {
    start: {
      width: '28%',
      opacity: 0,
      transform: 'translateY(100px)',
    },
    end: {
      width: '28%',
      opacity: 1,
      transform: 'translateY(0)',
    },
  }
  return (
    <FrameBox className='frame_box'>
      <AnimateGroup play={isAnimate}>
        <div className='frame_info_list'>
          {
            frameList.map((item, index) => {
              return (
                <Fragment key={item.title}>
                  <Animate sequenceIndex={index + 1} {...animateProps}>
                    <div className='info_item'>
                      <span className='item_title'>{item.title}</span>
                      <span className='item_text'>{item.text}</span>
                    </div>
                  </Animate>
                </Fragment>
              )
            })
          }
        </div>
      </AnimateGroup>
      <AnimateGroup play={isAnimate}>
        <div className='frame_info_tool'>
          <Animate sequenceIndex={1} {...animateProps} delay={0.9}>
            <FrameButton>Learn More</FrameButton>
          </Animate>
        </div>
        <Animate sequenceIndex={2} start={{ transform: 'translateX(100px)', opacity: 0, }} end={{ transform: 'translateX(0)', opacity: 1 }}>
          <img className='frame_bg' src={imgurl.home.FrameBg} />
        </Animate>
      </AnimateGroup>
    </FrameBox>
  )
}

export default Frame;
