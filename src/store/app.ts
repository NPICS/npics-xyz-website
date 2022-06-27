// import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Collections} from "../model/user";
// import {deserialize} from "class-transformer";
import http from "../utils/http";
import {SessionStorageKey} from "../utils/enums";
import BigNumber from "bignumber.js";

class Theme {
  isDark!: Boolean;
}

class data {
  collections!: Collections;
  isShowConnect!: boolean;
  isShowLoading!: boolean;
  EthPrice!: string
}

interface IAppState {
  currentWalletAddress?: string,
  currentUser: string,
  Theme: Theme,
  data: data,
  isLogin: boolean,
  interestAPR?: number
  rewardsAPR?: number,
  // eth -> usdt rate
  usdtExchangeRate?: string
}

const initialState: IAppState = {
  currentUser: "{}",
  Theme: {
    isDark: true
  },
  data: {
    collections: <Collections>{},
    isShowConnect: false,
    isShowLoading: false,
    EthPrice: ''
  },
  isLogin: false,
}

export const fetchUser2 = createAsyncThunk("app/fetchUser2", async (args, ThunkAPI) => {
  let walletAddress = sessionStorage.getItem(SessionStorageKey.WalletAuthorized)
  if (walletAddress) {
    return await http.myPost("/npics-server/app-api/v2/user/getUserInfo", {
      address: walletAddress
    })
  } else {
    return null
  }
})

export const updateARP = createAsyncThunk("app/updateARP", async (args, thunkAPI) => {
  let resp: any = await http.myPost("/npics-nft/app-api/v2/nfthome/getAprInfo")
  return resp.code === 200 ? resp.data : undefined
})

export const updateUSDTExchangeRate = createAsyncThunk("app/updateUSDTExchangeRate", async (args, thunkAPI) => {
  try {
    let resp: any = await http.myPost(`/npics-nft/app-api/v2/currencyPrice/getEthPrice`)
    if (resp.code === 200 && resp.data) {
      return resp.data as string
    } else {
      return undefined
    }
  } catch (e) {
    return undefined
  }
})

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchUser(state, action) {
      state.currentUser = action.payload
    },
    clearUserData(state) {
      state.currentUser = `{}`
    },
    setThemeIsDark: (state, action) => {
      state.Theme.isDark = action.payload
    },
    setCollectionsData: (state, action) => {
      state.data.collections = action.payload
    },
    setIsShowConnect: (state, action) => {
      state.data.isShowConnect = action.payload
    },
    setIsLoading: (state, action) => {
      state.data.isShowLoading = action.payload
    },
    setEthPrice: (state, action) => {
      state.data.EthPrice = action.payload
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser2.fulfilled, (state, action) => {
        if (action.payload) {
          let obj = action.payload as any
          if (obj.code === 200) {
            state.currentUser = JSON.stringify(obj.data)
          } else {
            state.currentUser = JSON.stringify({})
          }
        } else {
          state.currentUser = JSON.stringify({})
        }
      })
      .addCase(updateARP.fulfilled, (state, action) => {
        if (action.payload) {
          let data: any = action.payload
          state.rewardsAPR = parseFloat(data.rewardApr)
          state.interestAPR = parseFloat(data.apr)
        }
      })
      .addCase(updateUSDTExchangeRate.fulfilled, (state, action) => {
        if (action.payload) {
          state.usdtExchangeRate = action.payload
          // temporary compatibility
          state.data.EthPrice = action.payload
        }
      })
  }
})
export const {
  setThemeIsDark,
  setCollectionsData,
  fetchUser,
  setIsShowConnect,
  setIsLoading,
  setEthPrice,
  setIsLogin,
  clearUserData
} = appSlice.actions
export default appSlice;