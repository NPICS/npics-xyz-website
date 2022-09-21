// import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Collections } from "../model/user";
// import {deserialize} from "class-transformer";
import http from "../utils/http";
import { SessionStorageKey } from "../utils/enums";
import BigNumber from "bignumber.js";
import { ContractAddresses } from "../utils/addresses";
import { ChainId } from "../utils/multicall";

class Theme {
  isDark!: Boolean;
}

class data {
  collections!: Collections;
  isShowConnect!: boolean;
  isShowLoading!: boolean;
  EthPrice!: string;
}

interface IAppState {
  currentWalletAddress?: string;
  currentUser: string;
  Theme: Theme;
  data: data;
  isLogin: boolean;
  isFixed: boolean;
  isShowFrameAnimate: boolean;
  isShowDetailAnimate: boolean;
  isAnimate: boolean;
  interestAPR?: number;
  rewardsAPR?: number;
  // eth -> usdt rate
  usdtExchangeRate?: string;
  // bend -> eth rate
  bendExchangeRate: string;
  // pWing -> usdt rate
  pWingPrice: string;
  showWalletModalOpen: boolean;
}

const initialState: IAppState = {
  currentUser: "{}",
  Theme: {
    isDark: true,
  },
  isFixed: false,
  isShowFrameAnimate: false,
  isShowDetailAnimate: false,
  data: {
    collections: <Collections>{},
    isShowConnect: false,
    isShowLoading: false,
    EthPrice: "",
  },
  isLogin: false,
  bendExchangeRate: "",
  pWingPrice: "",
  showWalletModalOpen: false,
  isAnimate: false,
};

export const fetchUser2 = createAsyncThunk(
  "app/fetchUser2",
  async (args, ThunkAPI) => {
    let walletAddress = localStorage.getItem(
      SessionStorageKey.WalletAuthorized
    );
    if (walletAddress) {
      return await http.myPost("/npics-server/app-api/v2/user/getUserInfo", {
        address: walletAddress,
      });
    } else {
      return null;
    }
  }
);

/*
 * update ARP
 * */
export const updateARP = createAsyncThunk(
  "app/updateARP",
  async (args, thunkAPI) => {
    let resp: any = await http.myPost(
      "/npics-nft/app-api/v2/nfthome/getAprInfo"
    );
    return resp.code === 200 ? resp.data : undefined;
  }
);

/*
 * update ustd <=> eth rate
 * */
export const updateUSDTExchangeRate = createAsyncThunk(
  "app/updateUSDTExchangeRate",
  async (args, thunkAPI) => {
    let resp: any = await http.myPost(
      `/npics-nft/app-api/v2/currencyPrice/getEthPrice`
    );
    if (resp.code === 200 && resp.data) {
      return resp.data as string;
    } else {
      return undefined;
    }
  }
);

/*
 * update ustd <=> bend
 * */
export const updateBENDExchangeRate = createAsyncThunk(
  "app/updateBENDExchangeRate",
  async (args, thunkAPI) => {
    let resp: any = await http.myPost(
      `/npics-nft/app-api/v2/currencyPrice/getBendPrice`
    );
    if (resp.code === 200 && resp.data) {
      return resp.data as string;
    } else {
      return undefined;
    }
  }
);

export const updatePWingPrice = createAsyncThunk(
  "app/updatePWingPrice",
  async (args, thunkAPI) => {
    let resp: any = await http.myPost(
      `https://api.defined.fi/`,
      {
        query: `query ExampleQuery($address: String!, $networkId: Int!) { getPrice(address: $address, networkId: $networkId) { priceUsd  }}`,
        variables: {
          address: ContractAddresses.PWingProxy,
          networkId: ChainId.ETH,
        },
        operationName: "ExampleQuery",
      },
      {
        headers: {
          "x-api-key": "ZDhetvbpiAB1dMn9FPP8SRkcSnoueg2hf1poyY30",
        },
      }
    );
    if (resp.data.getPrice) {
      return resp.data.getPrice.priceUsd as string;
    } else {
      return undefined;
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchUser(state, action) {
      state.currentUser = action.payload;
    },
    clearUserData(state) {
      state.currentUser = `{}`;
    },
    setThemeIsDark: (state, action) => {
      state.Theme.isDark = action.payload;
    },
    setCollectionsData: (state, action) => {
      state.data.collections = action.payload;
    },
    setIsShowConnect: (state, action) => {
      state.data.isShowConnect = action.payload;
    },
    setIsLoading: (state, action) => {
      state.data.isShowLoading = action.payload;
    },
    setEthPrice: (state, action) => {
      state.data.EthPrice = action.payload;
    },
    /*
     * local store contain access token
     * */
    updateLoginState(state) {
      state.isLogin =
        localStorage.getItem(SessionStorageKey.AccessToken) != null;
    },
    setShowWalletModalOpen(state, action) {
      state.showWalletModalOpen = action.payload;
    },
    setFixed(state, action) {
      state.isFixed = action.payload;
    },
    setShowFrameAnimate(state, action) {
      state.isShowFrameAnimate = action.payload;
    },
    setShowDetailAnimate(state, action) {
      state.isShowDetailAnimate = action.payload;
    },
    setAnimate(state, action) {
      state.isAnimate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser2.fulfilled, (state, action) => {
        if (action.payload) {
          let obj = action.payload as any;
          if (obj.code === 200) {
            state.currentUser = JSON.stringify(obj.data);
          } else {
            state.currentUser = JSON.stringify({});
          }
        } else {
          state.currentUser = JSON.stringify({});
        }
      })
      .addCase(updateARP.fulfilled, (state, action) => {
        if (action.payload) {
          let data: any = action.payload;
          state.rewardsAPR = parseFloat(data.rewardApr);
          state.interestAPR = parseFloat(data.apr);
        }
      })
      .addCase(updateUSDTExchangeRate.fulfilled, (state, action) => {
        if (action.payload) {
          state.usdtExchangeRate = action.payload;
          // temporary compatibility
          state.data.EthPrice = action.payload;
        }
      })
      .addCase(updateBENDExchangeRate.fulfilled, (state, action) => {
        if (action.payload) {
          state.bendExchangeRate = action.payload;
        }
      })
      .addCase(updatePWingPrice.fulfilled, (state, action) => {
        if (action.payload) {
          state.pWingPrice = action.payload;
        }
      });
  },
});
export const {
  setThemeIsDark,
  setCollectionsData,
  fetchUser,
  setIsShowConnect,
  setIsLoading,
  setEthPrice,
  setFixed,
  setShowFrameAnimate,
  setShowDetailAnimate,
  // setIsLogin,
  updateLoginState,
  clearUserData,
  setShowWalletModalOpen,
} = appSlice.actions;
export default appSlice;
