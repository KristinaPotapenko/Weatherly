import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import userLocationReducer from "./userLocation/userLocationSlice";
import weatherReducer from "./weather/weatherSlice";

export const store = configureStore({
  reducer: {
    userLocation: userLocationReducer,
    weather: weatherReducer,
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
