import BigNumber from "bignumber.js"
import { CollectionDetail } from "model/user"

type Price = {
  price: BigNumber,
  loanFunds: BigNumber,
  agreementPrice: BigNumber,
  dollars: number,
  floorPrice: BigNumber,
}

export const compute = (value: CollectionDetail | undefined) => {
  if (!value) return
  // const EthPrice = useAppSelector((state) => state.app.data.EthPrice)
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
