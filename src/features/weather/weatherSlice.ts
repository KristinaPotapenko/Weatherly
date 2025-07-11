import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { setError, setLoading } from "../appStatusSlice";

interface WeatherHourly {
  precipitation: number[];
  temperature: number[];
  time: string[];
  weathercode: number[];
  uvIndex?: number[];
  wind?: number[];
  apparentTemperature?: number[];
  humidity?: number[];
  dew?: number[];
  surfacePressure?: number[];
  visibility?: number[];
}

interface WeatherDaily {
  precipitation: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  time: string[];
  weathercode: number[];
  uvIndex?: number[];
  sunrise?: string[];
  sunset?: string[];
  wind?: number[];
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
    uvIndex: [],
    sunrise: [],
    sunset: [],
    wind: [],
  },
  hourly: {
    precipitation: [],
    temperature: [],
    time: [],
    weathercode: [],
    uvIndex: [],
    wind: [],
    apparentTemperature: [],
    humidity: [],
    dew: [],
    surfacePressure: [],
    visibility: [],
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
        uv_index_max,
        sunrise,
        sunset,
        windspeed_10m_max,
      } = payload.daily;

      const {
        precipitation,
        temperature_2m,
        time: timeHourly,
        weathercode: weathercodeHourly,
        uv_index,
        windspeed_10m,
        apparent_temperature,
        relative_humidity_2m,
        dew_point_2m,
        surface_pressure,
        visibility,
      } = payload.hourly;

      state.currentTemperature = payload.currentTemperature;
      state.weathercode = payload.weathercode;

      state.daily.precipitation = precipitation_sum;
      state.daily.temperatureMax = temperature_2m_max;
      state.daily.temperatureMin = temperature_2m_min;
      state.daily.time = timeDaily;
      state.daily.weathercode = weathercodeDaily;
      state.daily.uvIndex = uv_index_max;
      state.daily.sunrise = sunrise;
      state.daily.sunset = sunset;
      state.daily.wind = windspeed_10m_max;

      state.hourly.precipitation = precipitation.slice(0, 24);
      state.hourly.temperature = temperature_2m.slice(0, 24);
      state.hourly.time = timeHourly.slice(0, 24);
      state.hourly.weathercode = weathercodeHourly.slice(0, 24);
      state.hourly.uvIndex =
        Array.isArray(uv_index) && uv_index.length > 0
          ? uv_index.slice(0, 24)
          : [];
      state.hourly.wind =
        Array.isArray(windspeed_10m) && windspeed_10m.length > 0
          ? windspeed_10m.slice(0, 24)
          : [];
      state.hourly.apparentTemperature =
        Array.isArray(apparent_temperature) && apparent_temperature.length > 0
          ? apparent_temperature.slice(0, 24)
          : [];
      state.hourly.humidity =
        Array.isArray(relative_humidity_2m) && relative_humidity_2m.length > 0
          ? relative_humidity_2m.slice(0, 24)
          : [];
      state.hourly.dew =
        Array.isArray(dew_point_2m) && dew_point_2m.length > 0
          ? dew_point_2m.slice(0, 24)
          : [];
      state.hourly.surfacePressure =
        Array.isArray(surface_pressure) && surface_pressure.length > 0
          ? surface_pressure.slice(0, 24)
          : [];
      state.hourly.visibility =
        Array.isArray(visibility) && visibility.length > 0
          ? visibility.slice(0, 24)
          : [];

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
    uv_index_max?: number[];
    sunrise?: string[];
    sunset?: string[];
    windspeed_10m_max?: number[];
  };
  hourly: {
    precipitation: number[];
    temperature_2m: number[];
    time: string[];
    weathercode: number[];
    uv_index?: number[];
    windspeed_10m?: number[];
    apparent_temperature?: number[];
    relative_humidity_2m?: number[];
    dew_point_2m?: number[];
    surface_pressure?: number[];
    visibility?: number[];
  };
}

export const getWeatherData = createAsyncThunk(
  "weatherSlice/getWeatherData",
  async ({ latitude, longitude }: WeatherParams, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(setLoading(true));

    try {
      const response = await axios.get<WeatherApiResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode,uv_index,windspeed_10m,apparent_temperature,relative_humidity_2m,dew_point_2m,visibility,surface_pressure&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,uv_index_max,sunrise,sunset,windspeed_10m_max&current_weather=true&timezone=auto`
      );
      const { current_weather, daily, hourly } = response.data;
      console.log(response);

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

      dispatch(setError(message));
      return thunkAPI.rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
