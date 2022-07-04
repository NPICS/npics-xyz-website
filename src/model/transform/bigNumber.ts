import BigNumber from "bignumber.js";
import {Transform} from "class-transformer";

export default function TransformBigNumber(defaultValue?: BigNumber) {
  return Transform(({value}) => {
    let num = new BigNumber(value)
    return num.isNaN() ? defaultValue : num
  })
}