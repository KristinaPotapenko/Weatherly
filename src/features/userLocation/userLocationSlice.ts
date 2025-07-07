import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setError, setLoading } from "../appStatusSlice";

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
    const { dispatch } = thunkAPI;
    dispatch(setLoading(true));

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

      dispatch(setError(message));
      return thunkAPI.rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
