import React from 'react'
import { Flex } from './Box'
import {Skeleton} from 'antd'

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

export default function SkeletonTemplate(props:IProps) {

  return (<Flex
    flexDirection="column"
    gap=".1rem"
    width={props.widthWrap}
  >
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