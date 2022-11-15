import React from 'react'
import styled from 'styled-components';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import { imgurl } from 'utils/globalimport';
import { EffectFade } from 'swiper';
const ChipSwapRightWarp = styled.div`
    width: 47%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 0.7rem;

    .chipswap_swiper{
        width: 100%;
        height: 4.6rem;
        .swiper_item_img{
            width: 100%;
            height: 100%;
        }
    }
`;


const ChipSwapRight = () => {
    return (
        <ChipSwapRightWarp>
            <Swiper loop={true} className="chipswap_swiper">
                <SwiperSlide>
                    <img className='swiper_item_img' src={imgurl.newHome.HomeChipSwapSwiper1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='swiper_item_img' src={imgurl.newHome.HomeChipSwapSwiper2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='swiper_item_img' src={imgurl.newHome.HomeChipSwapSwiper3} alt="" />
                </SwiperSlide>
            </Swiper>
        </ChipSwapRightWarp>
    )
};
export default ChipSwapRight;