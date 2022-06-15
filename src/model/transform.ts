import BigNumber from "bignumber.js"
import {Transform} from "class-transformer";
import {cloneDeep} from "lodash";

export function TransformBigNumber(defaultValue: BigNumber = new BigNumber(0)) {
    return Transform(({value}) => {
        let num = new BigNumber(value)
        return num.isNaN() ? defaultValue : num
    })
}

export function TransformDefault(_value: unknown) {
    return Transform(({value}) => {
        return value ?? cloneDeep(_value)
    })
}