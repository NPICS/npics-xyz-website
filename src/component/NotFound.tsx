import React from 'react'
import { imgurl } from 'utils/globalimport'
import { Flex,Icon,Typography } from './Box'

interface IProps {
  title: string
  text: string
}

NotFound.defaultProps = {
  title: "No  data found",
  text:"You  doesn’t  have any vaults available to found. Buy any NFTs on the NPics 'Marketplace' to obtain the vaults."
}

export default function NotFound(props:IProps) {
  

  return (<Flex
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
  >
    <Icon width={"1rem"} height={"1rem"} url={imgurl.notData}></Icon>
    <Typography
      fontSize={".16rem"}
      fontWeight={"700"}
      color={"#000"}
    >{props.title}</Typography>
    <Typography
      fontSize={".14rem"}
      fontWeight={"500"}
      color={"rgba(0,0,0,.5)"}
    >{props.text}</Typography>
  </Flex>)
}

