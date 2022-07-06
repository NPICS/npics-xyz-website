import styled from "styled-components";
import checkSelectedIcon from "../../assets/images/check_selected.svg"
import checkUnselectedIcon from "../../assets/images/check_unselected.svg"

const Input = styled.input.attrs({
  type: "checkbox"
})`
  background: transparent url(${checkSelectedIcon}) no-repeat center;
  background-size: .24rem .24rem;
  appearance: none;
  width: .24rem;
  height: .24rem;

  &:checked {
    background: transparent url(${checkUnselectedIcon}) no-repeat center;
    background-size: .24rem .24rem;
  }
`

export default function Checkbox() {
  return <Input/>
}