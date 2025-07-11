import { Link } from "react-router-dom";

import { getRouteWithParams } from "../../../../scripts/helpers/getRouteWithParams";
import { ROUTES } from "../../../../routes/routes";

import { weatherDescriptions } from "../../../../utils/weatherDescriptions";
import { weatherIcon } from "../../../../utils/weatherIcon";

import styles from "./WeatherCityCard.module.scss";

interface Geocoding {
  id?: number | null;
  name: string | null;
  latitude?: number | null;
  longitude?: number | null;
  country: string | null;
  timezone?: string | null;
}

interface Weather {
  currentTemperature: number;
  minTemperature: number;
  maxTemperature: number;
  weathercode: number;
}

interface WeatherCityCardProps {
  geocoding: Geocoding;
  weatherData: Weather;
}

export const WeatherCityCard = ({
  geocoding,
  weatherData,
}: WeatherCityCardProps) => {
  return (
    <li className={styles.card}>
      <Link
        to={getRouteWithParams(ROUTES.FORECAST, "city", geocoding.name || "")}
      >
        <div className={styles.content}>
          <p className={styles.tempCurrent}>
            {weatherData.currentTemperature}°
          </p>
          <div className={styles.details}>
            <div className={styles.detailsBlock}>
              <div className={styles.tempRange}>
                <p className={styles.temp}>H: {weatherData.maxTemperature}°</p>
                <p className={styles.temp}>L: {weatherData.minTemperature}°</p>
              </div>
              <p className={styles.location}>
                {geocoding.name}, {geocoding.country}
              </p>
            </div>
            <p className={styles.description}>
              {weatherDescriptions[weatherData.weathercode]}
            </p>
          </div>
          <img
            className={styles.image}
            src={`/src/assets/weather/${
              weatherIcon[weatherData.weathercode]
            }.svg`}
            alt="Weather"
          />
        </div>
      </Link>
    </li>
  );
};
