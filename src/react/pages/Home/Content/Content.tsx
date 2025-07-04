import type { JSX } from "react";
import cl from "classnames";
import { weatherDescriptions } from "../../../../utils/weatherDescriptions";

import styles from "./Content.module.scss";

interface WeatherInfo {
  currentTemperature: number;
  maxTemperature: number;
  minTemperature: number;
  weathercode: number;
}

interface ContentProps {
  city?: string;
  country?: string;
  info: WeatherInfo;
}
export const Content = ({ city, country, info }: ContentProps): JSX.Element => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>
        {country}, {city}
      </h1>
      <p className={styles.subtitle}>{info.currentTemperature.toFixed(0)}°</p>
      <div className={styles.wrapper}>
        <p className={styles.description}>
          {weatherDescriptions[info.weathercode]}
        </p>
        <div className={styles.descriptions}>
          <p className={cl(styles.description, styles.descriptionBold)}>
            H:{info.maxTemperature.toFixed(0)}°
          </p>
          <p className={cl(styles.description, styles.descriptionBold)}>
            L:{info.minTemperature.toFixed(0)}°
          </p>
        </div>
      </div>
    </div>
  );
};
