import React, { useState } from 'react'
import styled from 'styled-components';
import { Swiper as SwiperProvider, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swiper from "swiper/types/swiper-class"
import { Autoplay } from "swiper";
import { Link } from 'react-router-dom';
import Button from "../../../component/Button"

const TitleBox = styled.div`
  width: 7.03rem;
  .mySwiper{
    width: 100%;
  }
  .title_item{
    color: #fff;
      font-weight: 900;
      font-size: .38rem;
      line-height: .49rem;
      text-transform: uppercase;
      color: #FFFFFF;
      width: 7.03rem;
      margin-bottom: .1rem;
      font-family: 'Montserrat';
  }
  .title_text{
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 300;
    font-size: .16rem;
    line-height: .32rem;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.5);
    width: 5.41rem;
    margin-top:.2rem;
    margin-bottom: .72rem;
  }
  .title_point{
    height: 10px;
    margin-bottom: .27rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title_point_item{
      width: 70px;
      height: 4px;
      border-radius: 9999px;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.4);
      margin-left: 10px;
    }
  }
  .title_btn{
    display: flex;
    button {
        margin-right: .2rem;
      }
  }
`
export default function Title() {
  const [swiper, setSwiper] = useState<Swiper>();
  const [selected, setSelected] = useState<number>(0);
  const changSwiper = (e: any) => {
    setSelected(e.activeIndex);
  }
  const getSwiper = (swiper: Swiper) => {
    setSwiper(swiper);
  }
  const changePoint = (index: number) => {
    if (swiper) {
      setSelected(index);
      swiper.slideTo(index);
    }
  }
  return (
    <TitleBox>
      <div className='title_box'>
        <SwiperProvider
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
          className="mySwiper"
          onSlideChange={changSwiper}
          onSwiper={getSwiper}
        >
          <SwiperSlide>
            <div className='title_item'>Pay as Low as 60% to own your favorite NFT</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='title_item'>GET 100% RIGHTS OF NFT AND POSITIVE REWARDS OF VAULT</div>
          </SwiperSlide>
        </SwiperProvider>
      </div>
      <div className='title_text'>The First NFT Leveraged Trading Platform for Web3</div>
      {/* <div className='title_point'>
        <div className='title_point_item' onClick={() => changePoint(3)} style={{ background: selected === 3 || selected === 1 ? '#fff' : 'rgba(255, 255, 255, 0.4)' }}></div>
        <div className='title_point_item' onClick={() => changePoint(2)} style={{ background: selected === 2 || selected === 0 ? '#fff' : 'rgba(255, 255, 255, 0.4)' }}></div>
      </div> */}
      <div className='title_btn'>
        <Link to={'/marketPlace'}><Button types='one' text="Marketplace"></Button></Link>
        <Link to={'/dashboard/rewards'}><Button types='two' text="Rewards"></Button></Link>
      </div>
    </TitleBox>
  )
}
