import { imgurl } from "utils/globalimport";
import navAirdopIcon from 'assets/images/dashboard/navAirdopIcon.png'
import navVaultsIcon from 'assets/images/dashboard/navVaultsIcon.png'
import navRewardsIcon from 'assets/images/dashboard/navRewardsIcon.png'
import navActiveAirdopIcon from 'assets/images/dashboard/navActiveAirdopIcon.png'
import navActiveVaultsIcon from 'assets/images/dashboard/navActiveVaultsIcon.png'
import navActiveRewardsIcon from 'assets/images/dashboard/navActiveRewardsIcon.png'
import airdropBAYC from 'assets/images/dashboard/airdropBAYC.svg'
import airdropCoin from 'assets/images/dashboard/airdropCoin.svg'
import airdropMAWS from 'assets/images/dashboard/airdropMAWS.svg'
import airdropDooles from 'assets/images/dashboard/airdropDooles.svg'
import exportIcon from "assets/images/dashboard/export14.png"
import BigNumber from "bignumber.js";
import TransformBigNumber from "model/transform/bigNumber";
import { Expose } from "class-transformer";
export const NavList = [
  {
    icon: navVaultsIcon,
    iconActive: navActiveVaultsIcon,
    text:"My Vaults",
    key: 'vaults'
  },
  {
    icon: navRewardsIcon,
    iconActive: navActiveRewardsIcon,
    text:"My Rewards",
    key: 'rewards'
  },
  {
    icon: navAirdopIcon,
    iconActive: navActiveAirdopIcon,
    text:"My Airdrop",
    key: 'airdrop'
  }
]
export const aa = {
  "code": 200,
  "data": {
    "total": 6,
    "records": [{
      "id": 1,
      "nftAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
      "tokenId": "2595",
      "userAddress": "0xf26d94d535107a5e0c5a24f6ce3edcc8352f01e2",
      "createTime": "2022-06-16 15:52:56",
      "imageUrl": "https://img.seadn.io/files/fd988b6dda7aeac051fce3e3d4b2fb7e.png?h=1024&w=1024&auto=format",
      "floorPrice": "10800000000000000000",
      "collectionName": "Doodles",
      "status": 1
    },
      {
        "id": 2,
        "nftAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        "tokenId": "2595",
        "userAddress": "0xf26d94d535107a5e0c5a24f6ce3edcc8352f01e2",
        "createTime": "2022-06-16 15:52:56",
        "imageUrl": "https://img.seadn.io/files/fd988b6dda7aeac051fce3e3d4b2fb7e.png?h=1024&w=1024&auto=format",
        "floorPrice": "10800000000000000000",
        "collectionName": "Doodles",
        "status": 1
      },
      {
        "id": 3,
        "nftAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        "tokenId": "2595",
        "userAddress": "0xf26d94d535107a5e0c5a24f6ce3edcc8352f01e2",
        "createTime": "2022-06-16 15:52:56",
        "imageUrl": "https://img.seadn.io/files/fd988b6dda7aeac051fce3e3d4b2fb7e.png?h=1024&w=1024&auto=format",
        "floorPrice": "10800000000000000000",
        "collectionName": "Azuki",
        "status": 0
      },
      {
        "id": 4,
        "nftAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        "tokenId": "2595",
        "userAddress": "0xf26d94d535107a5e0c5a24f6ce3edcc8352f01e2",
        "createTime": "2022-06-16 15:52:56",
        "imageUrl": "https://img.seadn.io/files/fd988b6dda7aeac051fce3e3d4b2fb7e.png?h=1024&w=1024&auto=format",
        "floorPrice": "10800000000000000000",
        "collectionName": "Mutant Ape Yacht Club",
        "status": 0
      },
      {
        "id": 1,
        "nftAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        "tokenId": "2595",
        "userAddress": "0xf26d94d535107a5e0c5a24f6ce3edcc8352f01e2",
        "createTime": "2022-06-16 15:52:56",
        "imageUrl": "https://img.seadn.io/files/fd988b6dda7aeac051fce3e3d4b2fb7e.png?h=1024&w=1024&auto=format",
        "floorPrice": "10800000000000000000",
        "collectionName": "Bored Ape Yacht Club",
        "status": 0
      },
      {
        "id": 2,
        "nftAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        "tokenId": "2595",
        "userAddress": "0xf26d94d535107a5e0c5a24f6ce3edcc8352f01e2",
        "createTime": "2022-06-16 15:52:56",
        "imageUrl": "https://img.seadn.io/files/fd988b6dda7aeac051fce3e3d4b2fb7e.png?h=1024&w=1024&auto=format",
        "floorPrice": "10800000000000000000",
        "collectionName": "Doodles",
        "status": 0
      },
      {
        "id": 3,
        "nftAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        "tokenId": "2595",
        "userAddress": "0xf26d94d535107a5e0c5a24f6ce3edcc8352f01e2",
        "createTime": "2022-06-16 15:52:56",
        "imageUrl": "https://img.seadn.io/files/fd988b6dda7aeac051fce3e3d4b2fb7e.png?h=1024&w=1024&auto=format",
        "floorPrice": "10800000000000000000",
        "collectionName": "Azuki",
        "status": 0
      },
      {
        "id": 4,
        "nftAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        "tokenId": "2595",
        "userAddress": "0xf26d94d535107a5e0c5a24f6ce3edcc8352f01e2",
        "createTime": "2022-06-16 15:52:56",
        "imageUrl": "https://img.seadn.io/files/fd988b6dda7aeac051fce3e3d4b2fb7e.png?h=1024&w=1024&auto=format",
        "floorPrice": "10800000000000000000",
        "collectionName": "Mutant Ape Yacht Club",
        "status": 0
      },
      {
        "id": 1,
        "nftAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        "tokenId": "2595",
        "userAddress": "0xf26d94d535107a5e0c5a24f6ce3edcc8352f01e2",
        "createTime": "2022-06-16 15:52:56",
        "imageUrl": "https://img.seadn.io/files/fd988b6dda7aeac051fce3e3d4b2fb7e.png?h=1024&w=1024&auto=format",
        "floorPrice": "10800000000000000000",
        "collectionName": "Bored Ape Yacht Club",
        "status": 1
      },
    ]
  }
}

export class Projection {
  actions!: string

  address!: string

  project!: string

  icon!: string

  exportIcon!: string

  allowed!: boolean
  
  @TransformBigNumber()
  NEOBAYC!: BigNumber

  @TransformBigNumber()
  NEOMAYC!: BigNumber

  @TransformBigNumber()
  NEODoole!: BigNumber

  @Expose()
  isAllowed() {
    if(this.project === "Yuga Otherdeeds"){
      return (!this.NEOBAYC.eq(0) || !this.NEOMAYC.eq(0))
    }
    if(this.project === "Ape Coin"){
      return (!this.NEOBAYC.eq(0) || !this.NEOMAYC.eq(0))
    }
    if(this.project === "Mutant Ape With Serum"){
      return (!this.NEOBAYC.eq(0))
    }
    if(this.project === "Doodles Dooplicator"){
      return (!this.NEODoole.eq(0))
    }
  }

}

export const airdropProject = [
  {
    actions: "Claim",
    address: "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258",
    project: "Yuga Otherdeeds",
    icon: airdropBAYC,
    exportIcon,
    allowed: false
  },
  {
    actions: "Claim",
    address: "0x025C6da5BD0e6A5dd1350fda9e3B6a614B205a1F",
    project: "Ape Coin",
    icon: airdropCoin,
    exportIcon,
    allowed: false
  },
  {
    actions: "Claim",
    address: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
    project: "Mutant Ape With Serum",
    icon: airdropMAWS,
    exportIcon,
    allowed: false
  },
  {
    actions: "Claim",
    address: "0x466CFcD0525189b573E794F554b8A751279213Ac",
    project: "Doodles Dooplicator",
    icon: airdropDooles,
    exportIcon,
    allowed: false
  }
]

export const _toString = (collectionName: string):string => {
  switch (collectionName) {
    case "Doodles":
      return "Doodle"
    case "Space Doodles":
      return "SDoodle"
    case "CryptoPunks":
      return "CryptoPunk"
    case "Wrapped Cryptopunks":
      return "Wrapped Cryptopunk"
    case "CLONE X - X TAKASHI MURAKAMI":
      return "CLONEX"
    default:
      return collectionName
  }
}

export enum Sort {
  priceToLow='PROCETOLOW',
  priceToHigh='PROCETOHIGHT',
  timeNew="TIMENEW",
  timeExpiring="TIMEEXPIRING",
}

export const sort = {
  [Sort.priceToLow]: {
    sort: 'price',
    direction: 'asc'
  },
  [Sort.priceToHigh]: {
    sort: 'price',
    direction: 'desc'
  },
  [Sort.timeNew]: {
    sort: 'created_at',
    direction: 'desc'
  },
  [Sort.timeExpiring]: {
    sort: 'created_at',
    direction: 'asc'
  }
}
