import BigNumber from "bignumber.js"
import {CollectionDetail} from "model/user"
import {add} from "lodash";

type Price = {
  price: BigNumber,
  loanFunds: BigNumber,
  agreementPrice: BigNumber,
  dollars: number,
  floorPrice: BigNumber,
}

export const compute = (value: CollectionDetail | undefined) => {
  if (!value) return
  // const EthPrice = useAppSelector((updater) => updater.app.data.EthPrice)
  let result: Price = {
    price: new BigNumber(0),
    loanFunds: new BigNumber(0),
    agreementPrice: new BigNumber(0),
    dollars: 0,
    floorPrice: new BigNumber(0),
  }
  result.price = value.currentBasePrice
  result.loanFunds = new BigNumber(value.availableBorrow.toString())
  // result.loanFunds = value.floorPrice.multipliedBy(result.arp)
  result.agreementPrice = result.price.minus(result.loanFunds)

  return result
}

export function AddressAbbreviation(address: string | undefined | null): string | undefined {
  if (address) {
    let start = 6
    let end = 4
    let reg = new RegExp(`(.{${start}}).+(.{${end}}$)`, "g");
    return address.replace(reg, "$1...$2")
  } else {
    return undefined
  }
}

export function percentageFormat(val: number): string {
  return `${val > 0 ? '+' : ''}${(val * 100).toFixed(2)}%`
}