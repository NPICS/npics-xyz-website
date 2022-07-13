import React from 'react'
import styled from 'styled-components/macro';
import { Td, Th, Table, Tr } from './Cell'

export default function Index() {


  return (
    <Table

    >
      <thead>
        <Tr
          height="90px"
        >
          <Th>health factor</Th>
          <Th>2222</Th>
          <Th
            color="#fff"
            textAlign={'left'}
          >3333</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr><Td>Firefox</Td> <Td>Firefox</Td> <Td>Gecko</Td></Tr>
        <Tr><Td>Edge</Td> <Td>Firefox</Td> <Td>EdgeHTML</Td></Tr>
        <Tr><Td>Safari</Td> <Td>Firefox</Td> <Td>Webkit</Td></Tr>
        <Tr><Td>Chrome</Td> <Td>Firefox</Td> <Td>Blink</Td></Tr>
        <Tr><Td>Opera</Td> <Td>Firefox</Td> <Td>Blink</Td></Tr>
      </tbody>
    </Table>
  )
}