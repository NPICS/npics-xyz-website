import styled from "styled-components";
import checkSelectedIcon from "../../assets/images/check_selected.svg"
import checkUnselectedIcon from "../../assets/images/check_unselected.svg"
import React from "react";

const Input = styled.input.attrs({
  type: "checkbox"
})`
  background: transparent url(${checkUnselectedIcon}) no-repeat center;
  background-size: 0.24rem 0.24rem;
  appearance: none;
  width: 0.24rem;
  height: 0.24rem;

  &:checked {
    background: transparent url(${checkSelectedIcon}) no-repeat center;
    background-size: 0.24rem 0.24rem;
  }
`

export interface CheckBoxProps extends React.HTMLAttributes<HTMLInputElement> {
  _checked?: boolean
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return <Input checked={props._checked} type={"checkbox"} {...props}></Input>
}

export default CheckBox;