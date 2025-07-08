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
      <div className={styles.content}>
        <p className={styles.tempCurrent}>{weatherData.currentTemperature}°</p>
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
          src={`/src/assets/${weatherIcon[weatherData.weathercode]}.svg`}
          alt="Weather"
        />
      </div>
    </li>
  );
};
