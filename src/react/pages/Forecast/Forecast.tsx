import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import cl from "classnames";

import {
  getGeocoding,
  selectGeocodingData,
} from "../../../features/geocoding/geocodingSlice";
import type { AppDispatch } from "../../../features/store";
import {
  getWeatherData,
  selectDaily,
  selectHourly,
  selectWatherInfo,
} from "../../../features/weather/weatherSlice";
import {
  getQuality,
  selectQuality,
} from "../../../features/quality/qualitySlice";
import { formattedTime } from "../../../scripts/helpers/formattedTime";

import { ForecastInfo } from "../../components/ForecastInfo/ForecastInfo";
import { Tabs } from "../../components/ui/Tabs/Tabs";
import { WeatherCarousel } from "../../components/ui/WeatherCarousel/WeatherCarousel";
import { WeatherDetails } from "../../components/WeatherDetails/WeatherDetails";

import styles from "./Forecast.module.scss";

export const Forecast = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const [activeTab, setActiveTab] = useState<number>(0);

  const getSavedCities = (): string[] => {
    try {
      const saved = JSON.parse(localStorage.getItem("cities") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const [cities, setCities] = useState<string[]>(getSavedCities());

  const isCitySaved = !!(params?.city && cities?.includes(params.city));

  const toogleCity = (currentCity: string): void => {
    let newCities: string[];

    if (cities?.includes(currentCity)) {
      newCities = Array.isArray(cities)
        ? cities.filter((city) => city !== currentCity)
        : cities;
    } else {
      newCities = [...cities, currentCity];
    }

    setCities(newCities);
    localStorage.setItem("cities", JSON.stringify(newCities));
  };

  const nowTime = new Date();

  const { name, latitude, longitude } = useSelector(selectGeocodingData);

  const daily = useSelector(selectDaily);
  const hourly = useSelector(selectHourly);
  const weatherInfo = useSelector(selectWatherInfo);
  const quality = useSelector(selectQuality);

  const selectCard = useMemo(() => {
    if ((!hourly || !nowTime) && activeTab === 0) return 0;

    return activeTab === 0
      ? hourly.time.findIndex(
          (hour) => formattedTime(hour) === formattedTime(String(nowTime))
        )
      : 0;
  }, [hourly, activeTab, nowTime]);

  useEffect(() => {
    setSelectHour(selectCard);
    setSelectDay(selectCard);
  }, [selectCard]);

  const [selectHour, setSelectHour] = useState<number>(selectCard);
  const [selectDay, setSelectDay] = useState<number>(selectCard);

  const handleSelectHour = (index: number): void => {
    setSelectHour(index);
  };

  const handleSelectDay = (index: number): void => {
    setSelectDay(index);
  };

  useEffect(() => {
    if (params.city) {
      dispatch(getGeocoding(params.city));
    }
  }, [params.city]);

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(getWeatherData({ latitude, longitude }));
      dispatch(getQuality({ latitude, longitude }));
    }
  }, [latitude, longitude]);

  return (
    <>
      <ForecastInfo name={name || ""} weatherInfo={weatherInfo} />
      <button
        className={cl(styles.button, { [styles.buttonActive]: isCitySaved })}
        onClick={() => toogleCity(params?.city || "")}
      >
        {isCitySaved ? "Saved" : "Save"}
      </button>
      <div className={styles.content}>
        <Tabs
          tabs={["Hourly Forecast", "Weekly Forecast"]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        {name && (
          <WeatherCarousel
            activeTab={activeTab}
            city={name}
            isForecast={true}
            handleSelectHour={handleSelectHour}
            handleSelectDay={handleSelectDay}
          />
        )}
        <WeatherDetails
          daily={daily}
          hourly={hourly}
          quality={quality}
          selectHour={selectHour}
          selectDay={selectDay}
          activeTab={activeTab}
        />
      </div>
    </>
  );
};
