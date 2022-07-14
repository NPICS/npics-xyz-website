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
  widthTitle: '0.9rem',
  widthText: '0.7rem',
  widthIcon: '0.5rem',
}

const Square = styled.div`
  padding: 50% 0;
  position: relative;
`

export default function SkeletonTemplate(props:IProps) {

  return (<Flex
    flexDirection="column"
    gap="0.1rem"
    width={props.widthWrap}
  >
    {/*<Square>*/}
    {/*  <Skeleton.Image style={{*/}
    {/*    width: `${props.widthWrap}`,*/}
    {/*    // height: '2rem',*/}
    {/*    borderRadius: '0.1rem',*/}
    {/*    height: '100%',*/}
    {/*    position: "absolute",*/}
    {/*    left: 0,*/}
    {/*    bottom: 0,*/}
    {/*    right: 0,*/}
    {/*    top: 0*/}
    {/*  }} />*/}
    {/*</Square>*/}
    <Skeleton.Image style={{ width: `${props.widthWrap}`, height: '2rem', borderRadius: '0.1rem' }} />
    <Skeleton.Button shape={'round'} active style={{ height: '0.16rem', minWidth: `${props.widthTitle}` }}></Skeleton.Button>
    <Flex
      justifyContent='space-between'
    >
      <Skeleton.Button shape={'round'} active style={{ height: '0.16rem', minWidth: `${props.widthText}` }}></Skeleton.Button>
      <Skeleton.Button shape={'round'} active style={{ height: '0.16rem', minWidth: `${props.widthIcon}` }}></Skeleton.Button>
    </Flex>
  </Flex>)
}