import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import type { RootState } from "../store";
import { setError, setLoading } from "../appStatusSlice";

interface QualityParams {
  latitude: number;
  longitude: number;
}

interface AirQualityResponse {
  hourly: {
    time: string[];
    european_aqi: number[];
  };
}

export const getQuality = createAsyncThunk(
  "quality/getQuality",
  async ({ latitude, longitude }: QualityParams, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(setLoading(true));

    try {
      const response = await axios.get<AirQualityResponse>(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=european_aqi`
      );

      return response.data.hourly;
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

const initialState = {
  qualityEuropean: [] as number[],
};

const quality = createSlice({
  name: "quality",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuality.fulfilled, (state, { payload }) => {
      state.qualityEuropean = payload.european_aqi.slice(0, 24);
    });
  },
});

export default quality.reducer;

export const selectQuality = (state: RootState) =>
  state.quality.qualityEuropean;
