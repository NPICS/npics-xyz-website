import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IPlatform {
  selectPlatform: string;
}
const initialState: IPlatform = {
  selectPlatform: "",
};

const platformSlice = createSlice({
  name: "paltform",
  initialState,
  reducers: {
    //change paltform
    changePlatform(state, { payload }) {
      state.selectPlatform = payload;
    },
  },
});

export const { changePlatform } = platformSlice.actions;

export default platformSlice;
