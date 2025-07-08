import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import userLocationReducer from "./userLocation/userLocationSlice";
import weatherReducer from "./weather/weatherSlice";
import appStatusReducer from "./appStatusSlice";
import geocodingReducer from "./geocoding/geocodingSlice";

export const store = configureStore({
  reducer: {
    userLocation: userLocationReducer,
    weather: weatherReducer,
    status: appStatusReducer,
    geocoding: geocodingReducer,
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
