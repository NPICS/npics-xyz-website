import React, { Fragment, useEffect, useRef, useState } from 'react'
import { start } from 'repl';
import styled from 'styled-components';
import { Animate, AnimateGroup } from "react-simple-animate";
import { useAppSelector } from "../../../store/hooks"
const ChipSwapLeftWarp = styled.div`
    width: 53%;
    padding-top: 1rem;

`;
const ChipSwapItem = styled.div<{ selected: boolean }>`
    height: 1.5rem;
    .item_title{
        font-size: ${props => props.selected ? '0.3rem' : '0.2rem'};
        font-weight: 700;
        color: ${props => props.selected ? '#fff' : 'rgba(255,255,255,0.5)'};
        transition: all 0.3s ease-in-out;
    }
    .item_desc_box{
        height: 0.6rem;
        color: #fff;
        font-size: 0.14rem;
        overflow: hidden;
        margin-top: 0.2rem;
        .item_desc{
            height: 0.6rem;
            opacity: ${props => props.selected ? '1' : '0'};;
            transform: ${props => props.selected ? 'translateY(0)' : 'translateY(150px)'};
            transition: all 0.4s ease-in-out 0.2s;
        }
    }
`

const ChipSwapLeft = () => {
    const isAnimate = useAppSelector(state => state.app.isShowChipSwapAnimate)
    const [selectIndex, setSelectIndex] = useState<number>(-1)
    const timerRef = useRef<any>()
    const list = [
        {
            id: 1,
            title: "Indexing your NFTs in flexible scaling",
            desc: "Fragment your NFTs in a fixed ratio of 1 : 10,000 or any amount you approve, which smooths trading frictions and provides mass exposure to NFTs."
        },
        {
            id: 2,
            title: "Swapping chips for anyone NFT in anytime.",
            desc: "Instant Trading for Chips to NFTs, Chips to Chips and NFTs to prefered NFTs, which provides greater liquidity by Uniswap V3"
        },
        {
            id: 3,
            title: "Yielding Chips instantly by chips or NFTs you owned.",
            desc: "Deposite your chips to yielding more in each blocks interval,  which also can be gained  by your NFTs directly"
        },

    ]
    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current)
        };
    }, [])
    useEffect(() => {
        if (isAnimate) {
            start()
        }
    }, [isAnimate])
    const start = () => {
        setSelectIndex(val => val >= 2 ? 0 : val + 1)
        const timer = setTimeout(start, 5000)
        timerRef.current = timer;
    }
    return (
        <ChipSwapLeftWarp>
            <AnimateGroup play={isAnimate}>
                {
                    list.map((item, index) => {
                        return (
                            <Fragment key={item.id}>
                                <Animate delay={index * 0.2} sequenceIndex={index} start={{ opacity: 0, transform: 'translateX(-150px)' }} end={{ opacity: 1, transform: 'translateX(0px)' }}>
                                    <ChipSwapItem selected={selectIndex === index ? true : false}>
                                        <div className='item_title'>{item.title}</div>
                                        <div className='item_desc_box'>
                                            <div className='item_desc'>{item.desc}</div>
                                        </div>
                                    </ChipSwapItem>
                                </Animate>
                            </Fragment>
                        )
                    })
                }
            </AnimateGroup>

        </ChipSwapLeftWarp>
    )
};
export default ChipSwapLeft;