import {Transform} from "class-transformer";
import {cloneDeep} from "lodash";

export function TransformDefault(_value: unknown) {
  return Transform(({value}) => {
    return value ?? cloneDeep(_value)
  })
}