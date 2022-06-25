import axios from "axios";

export const getNFTStatusInOpensea = (
  nft: string,
  tokenId: number
) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      "id": "PrivateListingBannerQuery",
      "query": "query PrivateListingBannerQuery(\n  $archetype: ArchetypeInputType\n  $bundle: BundleSlug\n  $includePrivate: Boolean!\n) {\n  tradeSummary(archetype: $archetype, bundle: $bundle, includePrivate: $includePrivate) {\n    bestAsk {\n      taker {\n        address\n        ...AccountLink_data\n        ...wallet_accountKey\n        id\n      }\n      maker {\n        ...wallet_accountKey\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment AccountLink_data on AccountType {\n  address\n  config\n  isCompromised\n  user {\n    publicUsername\n    id\n  }\n  displayName\n  ...ProfileImage_data\n  ...wallet_accountKey\n  ...accounts_url\n}\n\nfragment ProfileImage_data on AccountType {\n  imageUrl\n  user {\n    publicUsername\n    id\n  }\n  displayName\n}\n\nfragment accounts_url on AccountType {\n  address\n  user {\n    publicUsername\n    id\n  }\n}\n\nfragment wallet_accountKey on AccountType {\n  address\n}\n",
      "variables": {
        "archetype": {
          "tokenId": tokenId,
          "chain": "ETHEREUM",
          "assetContractAddress": nft
        },
        "bundle": null,
        "includePrivate": true
      }
    }
    const resp = await axios.post(`https://api.opensea.io/graphql/`, data, {
      headers: {
        "x-signed-query": "35b7ff637bd99f8ad7a1c7b6e6252eadd23338fcc44c1840bfdbd857e7281362",
      }
    })
    if (resp.status === 200) {
      resolve(resp.data.data.tradeSummary.bestAsk == null)
    } else {
      reject('error');
    }
  })
}