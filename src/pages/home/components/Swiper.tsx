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
  margin-top: 37px;
  display: flex;
`
const SwiperItem = styled.div`
  background: rgba(255, 255, 255, .1);
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 16px;
  cursor: pointer;

  & > img {
    width: 220px;
    height: 220px;
    border-radius: 12px 12px 0 0;
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 5px 25px 0 16px;

    .text {
      & > span {
        white-space: nowrap;
        font-family: 'PingFang HK';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: rgba(255, 255, 255, .6);
      }

      & > div {
        display: flex;

        & > span {
          font-family: 'PingFang HK';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
          color: #fff;
          display: inline-block;
        }

        & > span:nth-child(1) {
          width: 85px;
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
  padding: 0 156px;
  box-sizing: border-box;

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    width: 256px;
    height: 288px;
    top: 138px;
    left: -100px;
    background: #333;
    box-shadow: 196px 0px 172px 110px rgb(51 51 51 / 95%);
    z-index: 2;
  }

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 256px;
    height: 288px;
    top: 138px;
    right: -100px;
    background: #333;
    box-shadow: -196px 0px 172px 110px rgb(51 51 51 / 95%);
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