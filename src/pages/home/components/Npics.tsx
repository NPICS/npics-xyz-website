import React, { memo, useEffect, useState } from 'react'
import { Swiper as SwiperProvide, SwiperSlide } from "swiper/react";
import { imgurl } from 'utils/globalimport';
import styled, { css } from 'styled-components';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Swiper from "swiper/types/swiper-class"

const PointBox = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const PointItem = styled.div`
    height: 8px;
    background:#D9D9D9;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    & ~ & {
      margin-left: 12px;
    }
`
const Npics = memo(
  () => {
    const [swiper, setSwiper] = useState<Swiper>();
    const [selected, setSelected] = useState<number>(0);
    const changSwiper = (e: any) => {
      setSelected(e.activeIndex);
    }
    const changePoint = (index:number) => {
      if (swiper) {
        setSelected(index);
        swiper.slideTo(index);
      }
    }
    const getSwiper = (swiper: Swiper) => {
      setSwiper(swiper);
    }
    return (
      <div className='npics_box'>
        <div className='swiper_box'>
          <SwiperProvide
            grabCursor={true}
            className="mySwiper"
            navigation={false}
            onSlideChange={changSwiper}
            onSwiper={getSwiper}
          >
            <SwiperSlide className='swiper_item'>
              <img className='swiper_item_img' style={{ width: '100%' }} src={imgurl.home.NpicsSwiper1} alt="" />
            </SwiperSlide>
            <SwiperSlide className='swiper_item'>
              <img className='swiper_item_img' style={{ width: '100%' }} src={imgurl.home.NpicsSwiper2} alt="" />
            </SwiperSlide>
            <SwiperSlide className='swiper_item'>
              <img className='swiper_item_img' style={{ width: '100%' }} src={imgurl.home.NpicsSwiper3} alt="" />
            </SwiperSlide>
          </SwiperProvide>
        </div >
        <PointBox>
          <PointItem style={{width: selected === 0 ? '30px' : '8px' }} onClick={()=>changePoint(0)}></PointItem>
          <PointItem style={{width: selected === 1 ? '30px' : '8px' }} onClick={()=>changePoint(1)}></PointItem>
          <PointItem style={{width: selected === 2 ? '30px' : '8px' }} onClick={()=>changePoint(2)}></PointItem>
        </PointBox>
      </div>


    )
  }

)
export default Npics