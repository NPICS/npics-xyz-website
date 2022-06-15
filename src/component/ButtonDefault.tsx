import React from 'react';
import styled from 'styled-components';
import { flex } from './styled'
interface Iprops {
  width?: string,
  height?: string,
  fontSize?: string,
  text?: string,
  border?: string,
  types?: string,
  children: string | any,
  onClick?: Function | any
}

const StyledButton = styled.button<Iprops>`
  background: ${(props => {
     switch (props.types) {
      case 'one':
       return 'rgba(255,255,255,.1)';
      case 'two':
       return 'transparent';
      case 'three':
       return 'linear-gradient(284.2deg, #FF0000 0%, #FEB240 101.06%);';
      case 'four':
       return 'rgba(255, 255, 255, 0.1)';
      default:
        return null;
    }
  })};
   border: ${(props => {
     switch (props.types) {
      case 'one':
       return '0';
      case 'two':
       return '.02rem solid rgba(255,255,255,.2)';
      case 'three':
       return '0';
      case 'four':
       return '.01rem solid rgba(255, 255, 255, 0.3)';
      default:
        return null;
    }
  })};
  color: ${(props => props.color)};
  width: ${(props => props.width)};
  height: ${(props => props.height)};
  font-size: ${(props => props.fontSize)};
  border-radius: 10px;
  font-family: 'PingFang HK';
  font-style: normal;
  font-weight: 600;
  font-size: .2rem;
  cursor: pointer;
  ${flex}
`

function ButtonDefault(props:Iprops) {

  const onClick = () => {
    return props.onClick()
  }

  return (<StyledButton 
    {...props}
    onClick={onClick}
  >
      {props.children}
  </StyledButton>
  );
}
ButtonDefault.defaultProps = {
  border: 0,
  width: '3rem',
  height: '.66rem',
  text: 'button',
  fontSize: '16px',
  types: 'one',
  color: '#FFFFFF'
}
 
export default ButtonDefault
