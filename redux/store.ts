import { configureStore } from "@reduxjs/toolkit";
import serviceSlice from "./slices/serviceSlice";
export const store = configureStore({
  reducer: { services: serviceSlice },
});
