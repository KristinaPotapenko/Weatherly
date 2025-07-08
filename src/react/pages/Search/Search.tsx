import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../../features/store";
import { getGeocoding } from "../../../features/geocoding/geocodingSlice";

import { Input } from "../../components/ui/Input/Input";
import { WeatherCityList } from "../../sections/Forecast/WeatherCityList/WeatherCityList";

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [city, setCity] = useState<string>("");
  const [debouncedCity, setDebouncedCity] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  useEffect(() => {
    if (debouncedCity.trim()) dispatch(getGeocoding(debouncedCity.trim()));
  }, [debouncedCity]);

  return (
    <section className="container">
      <h1>Weather</h1>
      <Input
        type="text"
        name="city"
        value={city}
        placeholder=" Search for a city"
        onChange={({ target }) => setCity(target.value)}
        icon="search"
      />
      <WeatherCityList />
    </section>
  );
};
