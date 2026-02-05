import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import authSlice from './slices/authSlice'
import { patientsApi } from "./apis/patientsApi";
import { receptionApi } from "./apis/receptionApi";

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [patientsApi.reducerPath]: patientsApi.reducer,
        [receptionApi.reducerPath]: receptionApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(), authApi.middleware, receptionApi.middleware, patientsApi.middleware]
})

export default reduxStore