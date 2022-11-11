import BigNumber from "bignumber.js";
import http from "../utils/http";
import { BANK_ENUM, BANK_NAME_MAP } from "../utils/enums";
import { LendPool } from "../abis/LendPool";
import { VaultsContractCalcData } from "../pages/DownPayment/Dashboard2/components/components/StyledInterface";
import { TextPlaceholder } from "../component/styled";
interface Result {
  createTime: string;
  id: number;
  nftAddress: string;
  neoAddress: string;
  tokenId: string;
  userAddress: string;
  imageUrl: string;
  floorPrice: BigNumber;
  collectionName: string;
  ltv: BigNumber;
  purchaseFloorPrice: BigNumber;
  status: number;
  bank: BANK_ENUM;
}

export const healthyTurnStr = (val: BigNumber) => {
  if (!val) return "";
  let factor = +new BigNumber(val.toString()).dp(0).toString();
  // factor = Math.random() * 2
  if (factor >= 1.5) {
    return "Inforce";
  } else if (factor >= 1 && factor < 1.5) {
    return "In Risk";
  } else if (0 < factor && factor < 1) {
    return "In Liquidation";
  } else if (factor <= 0) {
    return "Terminated";
  }
  return "";
};

export const getVaultsServerListDataMap = () =>
  http.myPost("/npics-nft/app-api/v2/platform/getList").then((res: any) => {
    let list = res.data.records || [];
    const map: { [key: string]: any } = {};
    for (let i = 0; i < list.length; i++) {
      const collectionsResultModel = list[i].collectionsResultModel || [];
      const collectionsResultModelMap: { [key: string]: any } = {};
      for (let j = 0; j < collectionsResultModel.length; j++) {
        collectionsResultModel[j].rewardApr = list[i].borrowApy;
        collectionsResultModel[j].borrowApy = list[i].supplyApy;
        collectionsResultModelMap[
          collectionsResultModel[j].address.toLowerCase()
        ] = collectionsResultModel[j];
      }
      list[i].collectionsResultModelMap = collectionsResultModelMap;
      map[list[i].platform] = list[i];
    }
    return map;
  });

export const getVaultsContractData = async (
  nftAddress: string,
  tokenId: string
): Promise<VaultsContractCalcData> => {
  let lendPool = new LendPool(null);
  let [debtData, liquidatePrice] = await Promise.all([
    lendPool.getNftDebtData(nftAddress, tokenId),
    lendPool.getNftLiquidatePrice(nftAddress, tokenId),
  ]);
  const slippage = (data: BigNumber) => {
    let val = BigNumber.minimum(
      data.multipliedBy(new BigNumber("0.001")),
      new BigNumber("0.01").multipliedBy(10 ** 18)
    );
    return val;
  };
  return {
    debtString:
      new BigNumber(debtData.repayDebtAmount.toString())
        .div(10 ** 18)
        .toFixed(4, 1) || TextPlaceholder,
    debt: new BigNumber(debtData.repayDebtAmount.toString()),
    maxDebt: new BigNumber(debtData.repayDebtAmount.toString()).plus(
      slippage(new BigNumber(debtData.repayDebtAmount.toString()))
    ),
    liquidationPrice:
      new BigNumber(liquidatePrice.liquidatePrice.toString())
        .div(10 ** 18)
        .toFixed(4, 1) || TextPlaceholder,
  };
};
