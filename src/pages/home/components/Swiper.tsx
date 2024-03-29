import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {Autoplay} from "swiper";
import styled from 'styled-components';
import {useEffect, useState} from "react";
import http from "../../../utils/http";
import {SwiperModel} from "../../../model/home";
import {deserializeArray} from "class-transformer";

const MySwiper = styled(Swiper)`
  width: 100%;
  transition-timing-function: linear;
  margin-top: 0.37rem;
  display: flex;
`
const SwiperItem = styled.div`
  background: rgba(255, 255, 255, .1);
  border: 0.01rem solid rgba(255, 255, 255, .2);
  border-radius: 0.12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 0.16rem;
  cursor: pointer;

  & > img {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 0.12rem 0.12rem 0 0;
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0.05rem 0.25rem 0 0.16rem;

    .text {
      & > span {
        white-space: nowrap;
        font-family: 'PingFang HK';
        font-style: normal;
        font-weight: 600;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: rgba(255, 255, 255, .6);
      }

      & > div {
        display: flex;

        & > span {
          font-family: 'PingFang HK';
          font-style: normal;
          font-weight: 600;
          font-size: 0.16rem;
          line-height: 0.22rem;
          color: #fff;
          display: inline-block;
        }

        & > span:nth-child(1) {
          width: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`
const SwiperWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.56rem;
  box-sizing: border-box;

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    width: 2.56rem;
    height: 2.88rem;
    top: 1.38rem;
    left: -1rem;
    background: #333;
    box-shadow: 1.96rem 0rem 1.72rem 1.1rem rgb(51 51 51 / 95%);
    z-index: 2;
  }

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 2.56rem;
    height: 2.88rem;
    top: 1.38rem;
    right: -1rem;
    background: #333;
    box-shadow: -1.96rem 0rem 1.72rem 1.1rem rgb(51 51 51 / 95%);
    z-index: 2;
  }
`
export default function SwiperFn() {
  const [listData, setListData] = useState<SwiperModel[]>([])


  useEffect(() => {
    http.myPost("/npics-nft/app-api/v2/nfthome/getRecord", {
      pageIndex: 1,
      pageSize: 20
    }).then((_resp) => {
      let resp = _resp as any
      if (resp.code === 200) {
        setListData(deserializeArray(SwiperModel, JSON.stringify(resp.data)))
      }
    })
  }, [])

  return (
    <SwiperWrap>
      <MySwiper
        slidesPerView={7}
        spaceBetween={10}
        centeredSlides={true}
        className="mySwiper"
        initialSlide={4}
        transition-timing-function={'linear'}
        speed= {300}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        modules={[Autoplay]}
      >
        {listData.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <SwiperItem>
                <img src={item.imageUrl} alt={item.collectionName}/>
                <div className='info'>
                  <div className='text'>
                    <span>{item.createTime}</span>
                    <div>
                      <span>{item.collectionName}</span>
                      <span>{ `#${item.tokenId}` }</span>
                    </div>
                  </div>
                  <img src={item.avatar} alt=""/>
                </div>
              </SwiperItem>
            </SwiperSlide>
          )
        })}
      </MySwiper>
    </SwiperWrap>
  );
};