import BigNumber from "bignumber.js";
import currency from "currency.js";
import numeral from "numeral";

export const urls = {
  twitter: "https://twitter.com/NPicsNFT",
  medium: "https://medium.com/@npics.xyz",
  telegram: "https://t.me/npicsannouncement",
  howItWork: "https://non-pics.gitbook.io/npics-v1.0/",
  resource: "https://non-pics.gitbook.io/npics-v1.0/",
  github: "https://github.com/NPICS/NPICS.github.io",
  contactUs: "https://npics.gitbook.io/npics-v1.0/resources/contact-us",
  Resources: "https://npics.gitbook.io/npics-v1.0/about/introduce-npics",
  termsOfService: "https://npics.gitbook.io/npics-v1.0/resources/terms-of-service",
  gitBookRewards: "https://npics.gitbook.io/npics-v1.0/about-npics/nft-backed-position-nbp/rewards",
  discord: "https://discord.gg/npics",

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

export function thousandFormat(
  num: number | string
): string {
  return numeral(num).format('$0.0a').toLocaleUpperCase()
}
  // let format = Intl.NumberFormat(`en-US`, {
  //   style: "currency",
  //   currency: "USD",
  //   useGrouping: true,
  //   maximumFractionDigits: maxFractionDigits
  // })
  // if (typeof(num) === "string") {
  //   return format.format(Number(num))
  // } else {
  //   return format.format(num)
  // }
