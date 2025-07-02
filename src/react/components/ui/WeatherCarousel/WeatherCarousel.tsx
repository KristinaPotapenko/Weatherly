import { type JSX } from "react";
import { WeatherCard } from "./WeatherCard/WeatherCard";

import styles from "./WeatherCarousel.module.scss";

export const WeatherCarousel = (): JSX.Element => {
  return (
    <ul className={styles.carousel}>
      <WeatherCard
        time="12PM"
        image="src\assets\moonCloudMidRain.svg"
        rainfall="30%"
        temperature="19°"
        isCurrent={false}
      />
      <WeatherCard
        time="Now"
        image="src\assets\sunCloudAngledRain.svg"
        temperature="20°"
        isCurrent={true}
      />
    </ul>
  );
};
