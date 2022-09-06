export const ContractAddresses = {
  /*
   * Zero Address
   * */
  Zero: "0x0000000000000000000000000000000000000000",
  /*
   * npics contract, @warning npics is proxy contract
   * */
  NpicsProxy: "0xa2f78200746f73662ea8b5b721fda86cb0880f15",
  /*
   * benddao lendpool proxy
   * */
  LendPoolProxy: "0x70b97A0da65C15dfb0FFA02aEE6FA36e507C2762",
  /*
   * erc20 weth contract
   * */
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  DebtTokenProxy: "0x87ddE3A3f4b629E389ce5894c9A1F34A7eeC5648",
  BendDaoProxy: "0x0d02755a5700414B26FF040e1dE35D337DF56218",
  PWingProxy: "0xdb0f18081b505a7de20b18ac41856bcb4ba86a1a",
  /**
   * x2y2 market
   */
  x2y2_ERC721Delegate: "0xF849de01B080aDC3A814FaBE1E2087475cF2E354",
  /**
   * x2y2 approveTo ...
   */
  x2y2R1: "0x74312363e45DCaBA76c59ec49a7Aa8A65a67EeD3",
  /**
   * looksRare market
   */
  looksRareExchange: "0x59728544B08AB483533076417FbBB2fD0B17CE3a",
  /**
   * looksRare approveTo ...
   */
  looksRare_transferManagerERC721: "0xf42aa99F011A1fA7CDA90E5E98b277E306BcA83e",
  /**
   * TurBo contracts
   */
  TurboProxy: "0xe7cdb036b9e80d6d2235e08c1003a0b730fe6520",
  /**
   * TurBo Rinkeby
   */
  TurboTestProxy: "0xfC2f8134f1aAA865e0B0642393Db73c4F7eb41f9",

  /*
   * get contract address by market name
   * @warning: some market contract address is not found, like `xMarket`
   * */
  getMarketAddressByName(name: string): string | undefined {
    let data: { [Key: string]: string | undefined } = {
      opensea: "0x00000000A50BB64b4BbEcEB18715748DfacE08af",
      seaport: "0x00000000006c3852cbEf3e08E8dF289169EdE581",
      x2y2: "0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2",
      looksrare: "0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2",
      nftx: "0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2",
      sudoswap: "0x2B2e8cDA09bBA9660dCA5cB6233787738Ad68329",
      xMarket: undefined,
    };
    return data[name];
  },
};
