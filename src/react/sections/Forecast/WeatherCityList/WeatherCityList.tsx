import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "../../../../features/store";
import {
  getGeocoding,
  selectGeocodingData,
} from "../../../../features/geocoding/geocodingSlice";
import {
  getWeatherData,
  selectWatherInfo,
} from "../../../../features/weather/weatherSlice";

import { WeatherCityCard } from "../../../components/cards/WeatherCityCard/WeatherCityCard";

import styles from "./WeatherCityList.module.scss";

interface WeatherCity {
  name: string;
  country: string;
  currentTemperature: number;
  minTemperature: number;
  maxTemperature: number;
  weathercode: number;
}

export const WeatherCityList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const geocoding = useSelector(selectGeocodingData);
  const weatherData = useSelector(selectWatherInfo);

  const [citiesWeather, setCitiesWeather] = useState<WeatherCity[]>([]);

  const cities: string[] = JSON.parse(localStorage.getItem("cities") || "[]");

  useEffect(() => {
    const fetchData = async () => {
      const weatherArray: WeatherCity[] = [];

      for (const city of cities) {
        const geocodingResult = await dispatch(getGeocoding(city)).unwrap();

        if (
          geocodingResult.latitude !== null &&
          geocodingResult.longitude !== null
        ) {
          const weatherResult = await dispatch(
            getWeatherData({
              latitude: geocodingResult.latitude,
              longitude: geocodingResult.longitude,
            })
          ).unwrap();

          weatherArray.push({
            name: geocodingResult.name ?? "Unknown",
            country: geocodingResult.country ?? "Unknown",
            currentTemperature: weatherResult.currentTemperature,
            minTemperature: weatherResult.daily.temperature_2m_min[0],
            maxTemperature: weatherResult.daily.temperature_2m_max[0],
            weathercode: weatherResult.daily.weathercode[0],
          });
        }
      }

      setCitiesWeather(weatherArray);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (geocoding.latitude && geocoding.longitude)
      dispatch(
        getWeatherData({
          latitude: geocoding.latitude,
          longitude: geocoding.longitude,
        })
      );
  }, [geocoding.latitude, geocoding.longitude]);

  return (
    <ul className={styles.list}>
      {!cities.includes(geocoding.name || "") &&
        geocoding.latitude &&
        weatherData.currentTemperature && (
          <WeatherCityCard geocoding={geocoding} weatherData={weatherData} />
        )}
      {citiesWeather.map((item, index) => (
        <WeatherCityCard
          key={index}
          geocoding={{
            name: item.name,
            country: item.country,
          }}
          weatherData={{
            currentTemperature: item.currentTemperature,
            minTemperature: item.minTemperature,
            maxTemperature: item.maxTemperature,
            weathercode: item.weathercode,
          }}
        />
      ))}
    </ul>
  );
};
