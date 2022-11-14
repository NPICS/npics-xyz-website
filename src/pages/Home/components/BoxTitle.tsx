import { Divider } from 'antd';
import React from 'react'
import styled from 'styled-components';
const BoxTitleContent = styled.div`
    z-index: 10;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    font-size: 0.6rem;
    font-weight: 700;
    .title_desc{
        color: #fff;
        font-size: 0.3rem;
        font-weight: 700;
    }
    .title_divider{
        width: 1px;
        height: 0.4rem;
        border-left: 1px solid #fff;
        margin: 0 0.4rem 0 0.5rem;
    }
`;


const BoxTitle = ({ title, desc }: { title: string, desc: string }) => {
    return (
        <BoxTitleContent>
            <div className='title_h3'>{title}</div>
            <div className='title_divider'></div>
            <div className='title_desc'>{desc}</div>
        </BoxTitleContent>
    )
};
export default BoxTitle;