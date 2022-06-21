import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from "swiper";
import styled from 'styled-components';
import { imgurl } from 'utils/globalimport';
const MySwiper = styled(Swiper)`
  width: 100%;
  transition-timing-function: linear;
  margin-top: .37rem;
  display: flex;
`
const SwiperWrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .swiper-slide {
    position: relative;
    &>img {
      width: 4.2rem;
      height: 2.4rem;
    }
    .text {
      position: absolute;
      color: #fff;
      bottom: 0;
      width: 4.2rem;
      height: .8rem;
      display: flex;
      align-items: center;
      padding-left: .3rem;
      background: rgba(0, 0, 0, .8);
      border: .01rem solid rgba(255, 255, 255, .2);
      backdrop-filter: blur(20px);
      img {
        width: .5rem;
        height: .5rem;
        margin-right: .18rem;
      }
    }
  }
`
export default function SwiperFn() {

  const list = [
    {
      key:1,
      imgUrl: imgurl.home.SwiperItem,
      name: 'Bored Ape Yacht Club',
      icon: imgurl.home.SwiperIcon
    },
    {
      key:2,
      imgUrl: imgurl.home.SwiperItem,
      name: 'Bored Ape Yacht Club',
      icon: imgurl.home.SwiperIcon
    },
    {
      key:3,
      imgUrl: imgurl.home.SwiperItem,
      name: 'Bored Ape Yacht Club',
      icon: imgurl.home.SwiperIcon
    },
  ]

  return (
    <SwiperWrap>
      <MySwiper 
        slidesPerView={3}
        spaceBetween={10}
        centeredSlides={true} 
        className="mySwiper" 
        initialSlide={4}
        transition-timing-function={'linear'}
        // speed= {300}
        loop= {true}
        autoplay={{
          delay: 111500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        modules={[Autoplay]}
        >
          {list.map((item) => {
              return (
                <SwiperSlide key={item.key}>
                  <img src={item.imgUrl} alt="" />
                  <div className='text'>
                    <img src={item.icon} alt="" />
                    <span>{item.name}</span>
                  </div>
                </SwiperSlide>
              )
          })}
      </MySwiper>
    </SwiperWrap>
  );
};