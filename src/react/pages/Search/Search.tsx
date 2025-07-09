import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../../features/store";
import { getGeocoding } from "../../../features/geocoding/geocodingSlice";

import { Input } from "../../components/ui/Input/Input";
import { WeatherCityList } from "../../sections/Forecast/WeatherCityList/WeatherCityList";

import styles from "./Search.module.scss";
import { CloudBg } from "../../components/decoration/CloudBg/CloudBg";
import { Title } from "../../components/ui/Title/Title";

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
    <div className={styles.bg}>
      <section className={`container ${styles.wrapper}`}>
        <div className={styles.cloud}>
          <CloudBg />
        </div>
        <Title className={styles.title}>Weather</Title>
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
    </div>
  );
};
