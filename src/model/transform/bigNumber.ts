import BigNumber from "bignumber.js";
import {Transform} from "class-transformer";

export default function TransformBigNumber(defaultValue?: BigNumber) {
  return Transform(({value}) => {
    let orgValue = value
    if (value && value.type === "BigNumber") {
      orgValue = value.toString()
    }
    let num = new BigNumber(orgValue)
    return num.isNaN() ? defaultValue : num
  })
}