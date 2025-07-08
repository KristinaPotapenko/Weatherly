import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import type { RootState } from "../store";
import { setError, setLoading } from "../appStatusSlice";

interface GeocodingResult {
  id: number | null;
  name: string | null;
  latitude: number | null;
  longitude: number | null;
  country: string | null;
  timezone: string | null;
}

export const getGeocoding = createAsyncThunk(
  "geocoding/getGeocoding",
  async (city: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(setLoading(true));

    try {
      const response = await axios.get<{ results: GeocodingResult[] }>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      return response.data.results?.[0];
    } catch (error) {
      let message = "Unknown error";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      dispatch(setError(message));
      return thunkAPI.rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const initialState: GeocodingResult = {
  id: null,
  name: null,
  latitude: null,
  longitude: null,
  country: null,
  timezone: null,
};

const geocoding = createSlice({
  name: "geocoding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGeocoding.fulfilled, (state, { payload }) => {
      if (payload) {
        state.id = payload.id;
        state.name = payload.name;
        state.latitude = payload.latitude;
        state.longitude = payload.longitude;
        state.country = payload.country;
        state.timezone = payload.timezone;
      }
    });
  },
});

export const selectGeocodingData = (state: RootState) => state.geocoding;

export default geocoding.reducer;
