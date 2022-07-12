import ButtonDefault from 'component/ButtonDefault';
import { Properties } from 'pages/marketplace/components/ItemStyled';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const DetailSwiper = styled.div`
  width: 100%;
  .swiper_list{
    width: 100%;
    /* height: 600px; */
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    margin-bottom: 28px;
    /* margin: 112px 0 80px; */
    .detail_info_item{
      width: 100%;
      height: 140px;
      display: flex;
      justify-content: center;
      align-items:flex-start;
      flex-direction: column;
      .info_item_title{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 800;
        font-size: 22px;
        color: #FFFFFF;
        margin-bottom: 10px;
      }
      .info_item_text{
        font-family: 'Montserrat';
        font-style: normal;
        font-size: 12px;
        line-height: 20px;
        -webkit-letter-spacing: 0.05em;
        -moz-letter-spacing: 0.05em;
        -ms-letter-spacing: 0.05em;
        letter-spacing: 0.05em;
        color: rgba(255,255,255,0.5);
        width: 80%;
        /* margin-bottom: 47px; */
      }
    }
  }
`

function Detail() {
  const [selected, setSelected] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
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
      <div className='swiper_list'>
        {
          detailList.map((item, index) => {
            return (
              <div className='detail_info_item' key={item.title}>
                <div className='info_item_title'>{item.title}</div>
                <div className='info_item_text'>{item.text}</div>
              </div>
            )
          })
        }
      </div>
      <ButtonDefault types={"second"}>
        Learn More
      </ButtonDefault>
    </DetailSwiper>
  )
}

export default Detail