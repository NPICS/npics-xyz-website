import { OFFER_TYPE_ENUM } from "../../model/offers";

interface IFee {
  marketFee: number;
  creatorFee: number;
}

export interface IThirdPartyFeeConfig {
  name: string;
  contract: string;
  [OFFER_TYPE_ENUM.x2y2]: IFee;
  [OFFER_TYPE_ENUM.looksrare]: IFee;
}

const BAYC = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
const MAYC = "0x60e4d786628fea6478f785a6d7e704777c86a7c6";
const Doodles = "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e";
const SDoodles = "0x620b70123fb810f6c653da7644b5dd0b6312e4d8";
const Azuki = "0xed5af388653567af2f388e6224dc7c4b3241c544";
const CloneX = "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b";
const WCryptoPunks = "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6";
export const thirdPartyFeeConfig: IThirdPartyFeeConfig[] = [
  {
    name: "BAYC",
    contract: BAYC,
    [OFFER_TYPE_ENUM.x2y2]: {
      marketFee: 0.005,
      creatorFee: 0.025,
    },
    [OFFER_TYPE_ENUM.looksrare]: {
      marketFee: 0.02,
      creatorFee: 0.025,
    },
  },
  {
    name: "MAYC",
    contract: MAYC,
    [OFFER_TYPE_ENUM.x2y2]: {
      marketFee: 0.005,
      creatorFee: 0.025,
    },
    [OFFER_TYPE_ENUM.looksrare]: {
      marketFee: 0.02,
      creatorFee: 0.025,
    },
  },
  {
    name: "Doodles",
    contract: Doodles,
    [OFFER_TYPE_ENUM.x2y2]: {
      marketFee: 0.005,
      creatorFee: 0,
    },
    [OFFER_TYPE_ENUM.looksrare]: {
      marketFee: 0.02,
      creatorFee: 0.05,
    },
  },
  {
    name: "SDoodles",
    contract: SDoodles,
    [OFFER_TYPE_ENUM.x2y2]: {
      marketFee: 0.005,
      creatorFee: 0,
    },
    [OFFER_TYPE_ENUM.looksrare]: {
      marketFee: 0.02,
      creatorFee: 0.025,
    },
  },
  {
    name: "Azuki",
    contract: Azuki,
    [OFFER_TYPE_ENUM.x2y2]: {
      marketFee: 0.005,
      creatorFee: 0.05,
    },
    [OFFER_TYPE_ENUM.looksrare]: {
      marketFee: 0.02,
      creatorFee: 0.05,
    },
  },
  {
    name: "CloneX",
    contract: CloneX,
    [OFFER_TYPE_ENUM.x2y2]: {
      marketFee: 0.005,
      creatorFee: 0,
    },
    [OFFER_TYPE_ENUM.looksrare]: {
      marketFee: 0.02,
      creatorFee: 0.05,
    },
  },
  {
    name: "WCryptoPunks",
    contract: WCryptoPunks,
    [OFFER_TYPE_ENUM.x2y2]: {
      marketFee: 0.005,
      creatorFee: 0,
    },
    [OFFER_TYPE_ENUM.looksrare]: {
      marketFee: 0.02,
      creatorFee: 0,
    },
  },
];

export const getThirdPartyFee = (nftAddress: string) => {
  return thirdPartyFeeConfig.find(
    (item) => item.contract.toLowerCase() === nftAddress.toLowerCase()
  );
};
