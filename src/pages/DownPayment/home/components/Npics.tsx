import React, { memo, useEffect, useState } from 'react'
import { Swiper as SwiperProvide, SwiperSlide } from "swiper/react";
import { imgurl } from 'utils/globalimport';
import styled, { css } from 'styled-components';
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import Swiper from "swiper/types/swiper-class"

const PointBox = styled.div`
  height: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const PointItem = styled.div`
    height: 0.08rem;
    background:#D9D9D9;
    border-radius: 99.99rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    & ~ & {
      margin-left: 0.12rem;
    }
`
const Npics = memo(
  () => {
    const [swiper, setSwiper] = useState<Swiper>();
    const [selected, setSelected] = useState<number>(0);
    const changSwiper = (e: any) => {
      setSelected(e.activeIndex);
    }
    const changePoint = (index: number) => {
      if (swiper) {
        setSelected(index);
        swiper.slideTo(index);
      }
    }
    const getSwiper = (swiper: Swiper) => {
      setSwiper(swiper);
    }
    const mouseEnterSwiper = (e: any) => {
      swiper?.autoplay.stop();
    }
    const mouseLeaveSwiper = (e: any) => {
      swiper?.autoplay.start();
    }
    return (
      <div className='npics_box'>
        <div className='swiper_box' onMouseEnter={mouseEnterSwiper} onMouseLeave={mouseLeaveSwiper}>
          <SwiperProvide
            grabCursor={true}
            className="mySwiper"
            navigation={false}
            onSlideChange={changSwiper}
            onSwiper={getSwiper}
            loop={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: true,
            }}
            modules={[Autoplay]}
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
          <PointItem style={{ width: selected === 1 || selected === 4 ? '0.3rem' : '0.08rem' }} onClick={() => changePoint(1)}></PointItem>
          <PointItem style={{ width: selected === 2 ? '0.3rem' : '0.08rem' }} onClick={() => changePoint(2)}></PointItem>
          <PointItem style={{ width: selected === 3 ? '0.3rem' : '0.08rem' }} onClick={() => changePoint(3)}></PointItem>
        </PointBox>
      </div>
    )
  }

)
export default Npics