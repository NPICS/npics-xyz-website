import ButtonDefault from 'component/ButtonDefault'
import { transform } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Animate } from 'react-simple-animate'
import styled from 'styled-components'

const DetailSwiper = styled.div`
  width: 100%;
  .swiper_list {
    width: 100%;
    /* height: 6rem; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 0.28rem;
    /* margin: 1.12rem 0 0.8rem; */

    .detail_info_item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      transition: all 1s;
      .info_item_title {
        font-style: normal;
        font-weight: 800;
        font-size: 0.22rem;
        color: #ffffff;
        margin-bottom: 0.1rem;
      }
      .info_item_text {
        font-style: normal;
        font-size: 0.12rem;
        line-height: 0.2rem;
        -webkit-letter-spacing: 0.05em;
        -moz-letter-spacing: 0.05em;
        -ms-letter-spacing: 0.05em;
        letter-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.5);
        width: 80%;
      }
    }
  }
`

const DetailButton = styled.div`
  transition: all 1s;
  background: #fff;
  border: 0.01rem solid rgba(0, 0, 0, .2);
  color: #000;
  width: 2rem;
  height: 0.66rem;
  font-size: 0.14rem;
  border-radius: 0.1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  opacity: ${(props: { animeta: boolean }) => (props.animeta ? '1' : '0')};
  transform: ${(props: { animeta: boolean }) =>
    props.animeta ? 'translateX(0)' : 'translateX(-1rem)'};
  transition-delay: 1.5s;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`

function Detail(props: { animeta: boolean }) {
  const [selected, setSelected] = useState<number>(0)
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  // useEffect(() => {
  //   let timer;
  //   const startSwiper = () => {
  //     timer = setTimeout(() => {
  //       if (selected + 1 === 3) {
  //         setSelected(0);
  //       } else {
  //         setSelected(selected + 1);
  //       }
  //     }, 3000)
  //     setTimer(timer)
  //   }
  //   startSwiper();
  // }, [selected])
  // useEffect(() => {
  //   return clearTimeout(timer);
  // }, [])

  // useEffect(() => {
  //   const infoDomList = document.querySelectorAll('.detail_info_item')
  //   const windosHeight = window.innerHeight
  //   window.addEventListener('scroll', () => {
  //     console.log(infoDomList[0].getBoundingClientRect().y)
  //     console.log(windosHeight)
  //   })
  // }, [])
  const detailList = [
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

  // const mouseEnter = () => {
  //   clearTimeout(timer);
  // }
  // const mouseLeave = () => {
  //   setTimeout(() => {
  //     if (selected + 1 === 3) {
  //       setSelected(0);
  //     } else {
  //       setSelected(selected + 1);
  //     }
  //   }, 3000)
  // }
  return (
    <DetailSwiper>
      <div className="swiper_list">
        {detailList.map((item, index) => {
          return (
            <div className="detail_info_item" key={item.title}>
              <Animate
                play={props.animeta}
                duration={0.5}
                delay={index / 2}
                start={{ opacity: 0, transform: 'translateX(-1rem)' }}
                end={{ opacity: 1, transform: 'translateX(0)' }}
              >
                <div className="info_item_title">
                  {item.title}
                </div>
                <div className="info_item_text">
                  {item.text}
                </div>
              </Animate>
            </div>
          )
        })}
      </div>
      <Animate
        play={props.animeta}
        duration={0.5}
        delay={1.5}
        start={{ opacity: 0, transform: 'translateX(-1rem)' }}
        end={{ opacity: 1, transform: 'translateX(0)' }}
      >
        <ButtonDefault types="second" scale={true}>Learn More</ButtonDefault>
      </Animate>
    </DetailSwiper>
  )
}

export default Detail
