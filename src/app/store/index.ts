import { appSlice } from "@/entities/app";
import { authApi } from "@/entities/auth";
import { sessionSlice } from "@/entities/session";
import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "@/entities/app/api";

export const store = configureStore({
  reducer: {
    [sessionSlice.name]: sessionSlice.reducer,
    [appSlice.name]: appSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
