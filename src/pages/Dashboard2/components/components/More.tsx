import React from 'react'
import { Flex, Icon, Typography } from 'component/Box'
import expansion from 'assets/images/dashboard/expansion.svg'
import { urls } from 'utils/urls'

export default function More() {
  
  return (<a href={urls.gitBookRewards} style={{ cursor: 'pointer' }} target="_blank"><Flex alignItems={'center'} gap=".02rem">
    <Typography fontSize={'.16rem'} fontWeight="500" color="rgba(0,0,0,.5)">More</Typography>
    <Icon width=".24rem" height=".24rem" src={expansion} />
  </Flex></a>)
}