import { IServices } from "@/app/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IServices[] = [{} as IServices];

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },
    deleteService: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
      return state.filter((state) => state._id != action.payload);
    },
  },
});

export const { addService, deleteService } = serviceSlice.actions;
export default serviceSlice.reducer;
