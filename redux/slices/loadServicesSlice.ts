import { IServices } from "@/type";
import RepairServices from "@/services/RepairServices";
import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export interface IFetchData {
  services: IServices[];
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
}

const initialState: IFetchData = {
  services: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const getServices = createAsyncThunk(
  "services/getServices",
  async () => {
    const services = await RepairServices.getServices();
    return services;
  }
);

const loadServicesSlice = createSlice({
  name: "services",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getServices.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.services = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
  reducers: {},
});

// export const { loadServices } = loadServicesSlice.actions;

export default loadServicesSlice.reducer;
