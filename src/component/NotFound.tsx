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
  padding: "30px 0"
}

export default function NotFound(props:IProps) {
  

  return (<Flex
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    padding={props.padding}
  >
    <Icon width={"100px"} height={"100px"} src={imgurl.notData}></Icon>
    <Typography
      fontSize={"16px"}
      fontWeight={"700"}
      color={"#000"}
      margin={"35px 0 10px 0"}
    >{props.title}</Typography>
    <Typography
      fontSize={"14px"}
      fontWeight={"500"}
      color={"rgba(0,0,0,.5)"}
    >{props.text}</Typography>
  </Flex>)
}

