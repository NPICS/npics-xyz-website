import styled from "styled-components";
import checkSelectedIcon from "../../assets/images/check_selected.svg"
import checkUnselectedIcon from "../../assets/images/check_unselected.svg"
import React from "react";

const Input = styled.input.attrs({
  type: "checkbox"
})`
  background: transparent url(${checkUnselectedIcon}) no-repeat center;
  background-size: .24rem .24rem;
  appearance: none;
  width: .24rem;
  height: .24rem;

  &:checked {
    background: transparent url(${checkSelectedIcon}) no-repeat center;
    background-size: .24rem .24rem;
  }
`

interface Props extends React.HTMLAttributes<HTMLInputElement> {
}

export default function Checkbox(props: Props) {
  return <Input type={"checkbox"} {...props}/>
}