import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

interface WeatherHourly {
  precipitation: number[];
  temperature: number[];
  time: string[];
  weathercode: number[];
}

interface WeatherDaily {
  precipitation: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  time: string[];
  weathercode: number[];
}

interface WeatherState {
  currentTemperature: number;
  minTemperature: number;
  maxTemperature: number;
  weathercode: number;
  daily: WeatherDaily;
  hourly: WeatherHourly;
}

const initialState: WeatherState = {
  currentTemperature: 0,
  minTemperature: 0,
  maxTemperature: 0,
  weathercode: 1,
  daily: {
    precipitation: [],
    temperatureMax: [],
    temperatureMin: [],
    time: [],
    weathercode: [],
  },
  hourly: {
    precipitation: [],
    temperature: [],
    time: [],
    weathercode: [],
  },
};

interface WeatherParams {
  latitude: number;
  longitude: number;
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeatherData.fulfilled, (state, { payload }) => {
      const {
        precipitation_sum,
        temperature_2m_max,
        temperature_2m_min,
        time: timeDaily,
        weathercode: weathercodeDaily,
      } = payload.daily;

      const {
        precipitation,
        temperature_2m,
        time: timeHourly,
        weathercode: weathercodeHourly,
      } = payload.hourly;

      state.currentTemperature = payload.currentTemperature;
      state.weathercode = payload.weathercode;

      state.daily.precipitation = precipitation_sum;
      state.daily.temperatureMax = temperature_2m_max;
      state.daily.temperatureMin = temperature_2m_min;
      state.daily.time = timeDaily;
      state.daily.weathercode = weathercodeDaily;

      state.hourly.precipitation = precipitation.slice(0, 23);
      state.hourly.temperature = temperature_2m.slice(0, 23);
      state.hourly.time = timeHourly.slice(0, 23);
      state.hourly.weathercode = weathercodeHourly.slice(0, 23);

      state.maxTemperature = temperature_2m_max[0];
      state.minTemperature = temperature_2m_min[0];
    });
  },
});

export default weatherSlice.reducer;

export const selectDaily = (state: RootState) => state.weather.daily;
export const selectHourly = (state: RootState) => state.weather.hourly;
export const selectWatherInfo = createSelector(
  (state: RootState) => state.weather,
  (weather) => ({
    currentTemperature: weather.currentTemperature,
    weathercode: weather.weathercode,
    minTemperature: weather.minTemperature,
    maxTemperature: weather.maxTemperature,
  })
);

interface WeatherApiResponse {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
  daily: {
    precipitation_sum: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    weathercode: number[];
  };
  hourly: {
    precipitation: number[];
    temperature_2m: number[];
    time: string[];
    weathercode: number[];
  };
}

export const getWeatherData = createAsyncThunk(
  "weatherSlice/getWeatherData",
  async ({ latitude, longitude }: WeatherParams, thunkAPI) => {
    try {
      const response = await axios.get<WeatherApiResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&current_weather=true&timezone=auto`
      );
      const { current_weather, daily, hourly } = response.data;

      return {
        currentTemperature: current_weather.temperature,
        weathercode: current_weather.weathercode,
        daily: daily,
        hourly: hourly,
      };
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
