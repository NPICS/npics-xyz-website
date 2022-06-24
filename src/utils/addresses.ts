export const ContractAddresses = {
  NpicsProxy: "0xa2f78200746f73662ea8b5b721fda86cb0880f15",
  LendPoolProxy: "0x70b97A0da65C15dfb0FFA02aEE6FA36e507C2762",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  DebtTokenProxy: "0x87ddE3A3f4b629E389ce5894c9A1F34A7eeC5648",
  BendDaoProxy: "0x0d02755a5700414B26FF040e1dE35D337DF56218",
  getMarketAddressByName(name: string): string | undefined {
    let data: { [Key: string]: string | undefined } = {
      "opensea": "0x00000000A50BB64b4BbEcEB18715748DfacE08af",
      "seaport": "0x00000000006c3852cbEf3e08E8dF289169EdE581",
      "x2y2": "0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2",
      "looksrare": "0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2",
      "nftx": "0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2",
      "xMarket": undefined,
    }
    return data[name]
  }
}