import React from 'react';
import styled from 'styled-components';
import { flex } from './styled'
interface Iprops {
  width: string,
  height: string,
  horizontal?: boolean,
  fontSize?: string,
  text?: string,
  border?: boolean,
  borderRadius?: string,
  types: string,
}

const StyledButton = styled.button<Iprops>`
    background: ${(props => {
     switch (props.types) {
      case 'one':
       return '#FF490F';
      case 'two':
       return "#fff";
      default:
        return null;
    }
  })};
  color: ${(props => {
     switch (props.types) {
      case 'one':
       return '#fff';
      case 'two':
       return "#000000";
      default:
        return null;
    }
  })};
  border: ${(props =>( props.border ? props.theme.border : 0))};
  width: ${(props => props.width)};
  height: ${(props => props.height)};
  font-size: ${(props => props.fontSize)};
  border-radius: ${(props => props.borderRadius)};
  cursor: pointer;
  ${flex}
`

export const DefaultButton = styled(StyledButton)<Iprops>`
  background: ${ props => props.theme.btnBackground};
`
function Button(props:Iprops) {

  return (<StyledButton 
    {...props}
  >
      {props.text}
  </StyledButton>
  );
}
Button.defaultProps = {
  horizontal: true,
  border: false,
  width: '2.1rem',
  height: '0.58rem',
  text: 'button',
  fontSize: '0.2rem',
  fontWeight: 700,
  borderRadius: '0.1rem',
  types: "one"
}
 
export default Button
