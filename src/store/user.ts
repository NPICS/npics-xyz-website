import {createSlice} from "@reduxjs/toolkit";
import {Wallet} from "../connectors/hooks";

interface IUserState {
  selectedWallet?: Wallet
}

const initialState: IUserState = {}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}
})

export default userSlice;