import BigNumber from "bignumber.js";
import currency from "currency.js";
import numeral from "numeral";

export const urls = {
  twitter: "https://twitter.com/NPicsNFT",
  medium: "https://medium.com/@npics.xyz",
  telegram: "https://t.me/npicsofficial",
  howItWork: "https://non-pics.gitbook.io/npics-v1.0/",
  resource: "https://non-pics.gitbook.io/npics-v1.0/",
  github: "https://github.com/NPICS/NPICS.github.io",
  contactUs: "https://docs.google.com/forms/d/e/1FAIpQLSdZVptvuauolOiMSIYb5F3wn2foiKnm7Z0IclOHxvObY_lJrw/viewform?usp=pp_url",
  Resources: "https://npics.gitbook.io/npics-v1.0/about/introduce-npics",
  termsOfService: "https://npics.gitbook.io/npics-v1.0/resources/terms-of-service",

  etherscanTxDetail(tx: string) {
    return `https://etherscan.io/tx/${tx}`
  },

  etherscanNft(nftAddress: string, tokenId: number | string) {
    return `https://etherscan.io/nft/${nftAddress}/${tokenId}`
  },

  raritysniper(name: string, tokenId: number | string) {
    // example: https://raritysniper.com/bored-ape-yacht-club/2668
    // name need convert
    return `https://raritysniper.com/${name}/${tokenId}`
  }
}

export function numberFormat(
  num: number | string,
  maxFractionDigits: number = 4
): string {
  return numeral(num).format("0,0.[0000]")
}