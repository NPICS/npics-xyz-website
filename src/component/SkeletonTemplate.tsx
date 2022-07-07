import React from 'react'
import { Flex } from './Box'
import {Skeleton} from 'antd'
import styled from "styled-components";

interface IProps {
  widthWrap?: string,
  widthTitle?: string,
  widthText?: string,
  widthIcon?: string,
}

SkeletonTemplate.defaultProps = {
  widthWrap: '2rem',
  widthTitle: '.9rem',
  widthText: '.7rem',
  widthIcon: '.5rem',
}

const Square = styled.div`
  padding: 50% 0;
  position: relative;
`

export default function SkeletonTemplate(props:IProps) {

  return (<Flex
    flexDirection="column"
    gap=".1rem"
    width={props.widthWrap}
  >
    {/*<Square>*/}
    {/*  <Skeleton.Image style={{*/}
    {/*    width: `${props.widthWrap}`,*/}
    {/*    // height: '2rem',*/}
    {/*    borderRadius: '10px',*/}
    {/*    height: '100%',*/}
    {/*    position: "absolute",*/}
    {/*    left: 0,*/}
    {/*    bottom: 0,*/}
    {/*    right: 0,*/}
    {/*    top: 0*/}
    {/*  }} />*/}
    {/*</Square>*/}
    <Skeleton.Image style={{ width: `${props.widthWrap}`, height: '2rem', borderRadius: '10px' }} />
    <Skeleton.Button shape={'round'} active style={{ height: '.16rem', minWidth: `${props.widthTitle}` }}></Skeleton.Button>
    <Flex
      justifyContent='space-between'
    >
      <Skeleton.Button shape={'round'} active style={{ height: '.16rem', minWidth: `${props.widthText}` }}></Skeleton.Button>
      <Skeleton.Button shape={'round'} active style={{ height: '.16rem', minWidth: `${props.widthIcon}` }}></Skeleton.Button>
    </Flex>
  </Flex>)
}