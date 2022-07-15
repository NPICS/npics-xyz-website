import useSWR from "swr";
import http from "utils/http";
import { useAppDispatch } from '../store/hooks';
import { clearUserData } from 'store/app';
import { useDeserializeArray, useDeserialize } from './useDeserialize';
import { Offers } from "model/offers";
import { deserialize, deserializeArray } from "class-transformer";
interface SwrData {
  code: number;
  data: any;
  message: string;
  success: boolean;
}


function useTokenInvalidation(data:SwrData) {
  const dispatch = useAppDispatch()
  if(!data) return
  if (data.code === 4003) {
    dispatch(clearUserData())
  }
}

export enum Sort {
  priceToLow='PROCETOLOW',
  priceToHigh='PROCETOHIGHT',
  timeNew="TIMENEW",
  timeExpiring="TIMEEXPIRING",
}

export function useSwrOffer(address:string | undefined, currentSort: Sort) {
  
  const sort = {
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

  const fetch = async () => {
    const axios: any = await http.myPost(`/npics-nft/app-api/v2/neo/getOfferList`, {
      // "address": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
      // "address": address,
      // "direction": "asc",
      // "pageIndex": 1,
      "cursor": "",
      "pageSize": 5,
      "address": address,
      // "direction": "asc",
      // "sort": "price"
      ...sort[currentSort]
    })
    return axios
  }

  const { data, error } = useSWR(`/npics-nft/app-api/v2/neo/getOfferList`, fetch, { refreshInterval: 10 * 1000 })
  useTokenInvalidation(data)

  let result:{
    cursor: string,
    offerList: Offers[]
  } = data

  if(data && data.code === 200) {
    // useDeserializeArray(Offers,JSON.stringify(data.offerList))
    // useDeserialize(<Offers>,JSON.stringify(data.topOffer))
    const offerList = deserializeArray(Offers,JSON.stringify(data.data.offerList))
    // const topOffer = deserialize(Offers,JSON.stringify(data.data.topOffer))
    result = {
      cursor: data.data.cursor,
      offerList
    }
  }
  
  // dispatch(clearUserData())
  return {
    offerList: result,
    isLoading: !error && !data,
    isError: error,
  }
}
