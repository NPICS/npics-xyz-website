import React from 'react'
import styled from 'styled-components/macro';


const StyledTable = styled.table`
  border-collapse: separate;
`
export default function Table() {


  return (
    <StyledTable>
      <tbody>
        <tr><th>Browser</th> <th>Layout Engine</th></tr>
        <tr><td>Firefox</td> <td>Gecko</td></tr>
        <tr><td>Edge</td> <td>EdgeHTML</td></tr>
        <tr><td>Safari</td> <td>Webkit</td></tr>
        <tr><td>Chrome</td> <td>Blink</td></tr>
        <tr><td>Opera</td> <td>Blink</td></tr>
      </tbody>
    </StyledTable>
  )
}