import { useAppSelector } from '../store/hooks';
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { useState } from "react";
import BigNumber from 'bignumber.js';
import { numberFormat } from './urls';
interface icon {
  darkIcon: string,
  lightIcon: string
}

export const useChangeIcon = (icon:icon):string => {
  const isDark = useAppSelector(state => state.app.Theme.isDark)
  return isDark ? icon.darkIcon : icon.lightIcon
}

// export const useUpdateEffect = (effect: () => any, deps: [...any]) => {
//     const flag = useRef(true)
//     useEffect(() => {
//         if (flag.current) {
//             flag.current = false
//         } else {
//             return effect()
//         }
// // eslint-disable-next-line
//     }, deps)
// }

export function useIsFirstRender(): boolean {
  const ifFlag = useRef(true)

  if (ifFlag.current) {
    ifFlag.current = false

    return true
  }

  return ifFlag.current
}

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}


export const useEthPrice = (value: BigNumber | undefined) => {
  const [price, setPrice] = useState<BigNumber | undefined>()
  const EthPrice = useAppSelector((state) => state.app.data.EthPrice)
  useEffect(() => {
    if(!value) return
    const OrgPrice = new BigNumber(value.toString()).multipliedBy(EthPrice).div(10 ** 18)
    setPrice(OrgPrice)
    // eslint-disable-next-line
  },[EthPrice,value])
  return price
}

export const useBendPrice = (value: BigNumber | undefined) => {
  const [price, setPrice] = useState<BigNumber | undefined>()
  const BENDPrice = useAppSelector((state) => state.app.bendExchangeRate)
  useEffect(() => {
    if(!value) return
    const OrgPrice = new BigNumber(value.toString()).multipliedBy(BENDPrice).div(10 ** 18)
    setPrice(OrgPrice)
    // eslint-disable-next-line
  },[BENDPrice,value])
  return price
}
