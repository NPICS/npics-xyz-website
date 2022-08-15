import React from 'react'
import { imgurl } from 'utils/globalimport'
import { Flex,Icon,Typography } from './Box'

interface IProps {
  title: string
  text: string
  padding?: string
}

NotFound.defaultProps = {
  title: "No  data found",
  text:"You don't have any vaults available to found. Buy any NFTs on the NPics 'Marketplace' to obtain the vaults.",
  padding: "0.3rem 0"
}

export default function NotFound(props:IProps) {
  

  return (<Flex
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    padding={props.padding}
  >
    <Icon width={"1rem"} height={"1rem"} src={imgurl.notData}></Icon>
    <Typography
      fontSize={"0.16rem"}
      fontWeight={"700"}
      color={"#000"}
      margin={"0.35rem 0 0.1rem 0"}
    >{props.title}</Typography>
    <Typography
      fontSize={"0.14rem"}
      fontWeight={"500"}
      color={"rgba(0,0,0,.5)"}
    >{props.text}</Typography>
  </Flex>)
}

