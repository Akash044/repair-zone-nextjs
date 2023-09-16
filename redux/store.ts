import { configureStore } from "@reduxjs/toolkit";
import serviceSlice from "./slices/serviceSlice";
import loadServicesSlice from "./slices/loadServicesSlice";
export const store = configureStore({
  reducer: { services: serviceSlice, loadServices: loadServicesSlice },
});
