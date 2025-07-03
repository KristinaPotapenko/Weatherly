import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface LocationState {
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

const initialState: LocationState = {
  city: "Kyiv",
  country: "Ukraine",
  latitude: 50.450001,
  longitude: 30.523333,
};

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserLocationData.fulfilled, (state, { payload }) => {
      const { city, country, latitude, longitude } = payload;
      state.city = city;
      state.country = country;
      state.latitude = latitude;
      state.longitude = longitude;
    });
  },
});

export default userLocationSlice.reducer;

export const getUserLocationData = createAsyncThunk(
  "userLocationSlice/getUserLocationData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://ipwho.is/");

      return response.data;
    } catch (error) {
      let message = "Unknown error";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);
