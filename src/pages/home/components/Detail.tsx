import { Properties } from 'pages/marketplace/components/ItemStyled';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const DetailSwiper = styled.div`
  width: 100%;
  height: 6rem;
  .swiper_list{
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    .detail_info_item{
      width: 100%;
      height: 1.6rem;
      display: flex;
      justify-content: center;
      align-items:flex-start;
      flex-direction: column;
      .info_item_title{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 800;
        font-size: .36rem;
        color: #FFFFFF;
        transition: all 0.3s ease-in-out;
      }
      .info_item_text{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 300;
        font-size: .16rem;
        line-height: .32rem;
        -webkit-letter-spacing: 0.05em;
        -moz-letter-spacing: 0.05em;
        -ms-letter-spacing: 0.05em;
        letter-spacing: 0.05em;
        color: rgba(255,255,255,0.5);
        width: 90%;
        transition: all 0.3s ease-in-out;

        /* margin-bottom: .47rem; */
      }
    }
  }
`

function Detail() {
  const [selected, setSelected] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  useEffect(() => {
    let timer;
    const startSwiper = () => {
      timer = setTimeout(() => {
        if (selected + 1 === 3) {
          setSelected(0);
        } else {
          setSelected(selected + 1);
        }
      }, 3000)
      setTimer(timer)
    }
    startSwiper();
  }, [selected])
  useEffect(() => {
    return clearTimeout(timer);
  }, [])
  const detailList = [
    {
      title: "Advanced mortgage to buy NFTs",
      text: "One-click down payment to purchase a Blue-chip with optimal financing, which achieved through NBP Protocol, stands for NFT-backed Position."
    },
    {
      title: "Flexible Repayment to redeem NFTs",
      text: "Repay at your own pace as long as vault is generated."
    },
    {
      title: "Sell NFT outright to settle profits",
      text: "Sell it outright to close the vault, including ownership transfer and profits settlement."
    }
  ]

  const mouseEnter = () => {
    clearTimeout(timer);
  }
  const mouseLeave = () => {
    setTimeout(() => {
      if (selected + 1 === 3) {
        setSelected(0);
      } else {
        setSelected(selected + 1);
      }
    }, 3000)
  }
  return (
    <DetailSwiper>
      <div className='swiper_list' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        {
          detailList.map((item, index) => {
            return (
              <div className='detail_info_item' key={item.title}>
                <div style={{ fontSize: selected === index ? '0.36rem' : '0.24rem', color: selected === index ? '#fff' : '#cacaca7d' }} className='info_item_title'>{item.title}</div>
                <div style={{ fontSize: selected === index ? '0.17rem' : '0.14rem', color: selected === index ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)' }} className='info_item_text'>{item.text}</div>
              </div>
            )
          })
        }
      </div>
    </DetailSwiper>
  )
}

export default Detail