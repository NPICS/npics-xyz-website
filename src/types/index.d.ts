import BigNumber from "bignumber.js";

declare global {
  interface BigNumber {
    formatDisplay(): string
  }

  interface String {
    toBigNumber(): BigNumber
  }
}