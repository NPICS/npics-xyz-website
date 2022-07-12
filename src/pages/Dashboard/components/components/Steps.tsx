import { font1665 } from 'component/styled';
import React from 'react'
import styled from 'styled-components';

const StepsSquare = styled.div`
  position: relative;
  height: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 5px;
  .progress {
    position: absolute;
    width: ${(props:{step:number}) => {
      switch (props.step) {
        case 1:
          return '15%';
        case 2:
          return '65%';
        case 3:
          return '100%';
        default: 
          return '15%'
      }
    }};
    height: 6px;
    background: linear-gradient(284.2deg, #FF0000 0%, #FEB240 101.06%);
    border-radius: 5px;
  }
  .ball {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: #000;
    border: 1px solid rgba(255, 255, 255, .3);
    z-index:1;
  }
  .active {
    background: linear-gradient(135deg, #FF7F23 5.88%, #FF1F1F 94.12%);
    border: none
  }
`
const StepsText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  ${font1665}
`

export default function Steps(props:{status:number}) {
  const {status} = props

  return (<>
    <StepsSquare step={status}>
      <div className='progress' />
      <div className={`ball ${status >= 1 ? 'active' : ''}`}>
        <div>1</div>
      </div>

      <div className={`ball ${status >= 2 ? 'active' : ''}`}>
        <div>2</div>
      </div>

      <div className={`ball ${status >= 3 ? 'active' : ''}`}>
        <div>3</div>
      </div>
    </StepsSquare>
    <StepsText>
      <span>Select Airdrop NFTs</span>
      <span>Claim Airdop</span>
      <span>Transfer Back</span>
    </StepsText>
  </>)
}
Steps.defaultProps = {
  status: 1
}