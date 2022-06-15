import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const Fixed = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(255,255,255,.3);
  z-index: 1001;
`
const Flex = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Loading() {
  return (<Fixed>
    <Flex>
      <Spin />
    </Flex>
  </Fixed>)
}