import { weatherDescriptions } from "../../../utils/weatherDescriptions";
import { Title } from "../ui/Title/Title";

import styles from "./ForecastInfo.module.scss";

interface ForecastInfoProps {
  name: string;
  weatherInfo: Weather;
}

interface Weather {
  currentTemperature: number;
  minTemperature: number;
  maxTemperature: number;
  weathercode: number;
}

export const ForecastInfo = ({ name, weatherInfo }: ForecastInfoProps) => {
  return (
    <div className={styles.wrapper}>
      <Title>{name}</Title>
      <div className={styles.info}>
        <p className={styles.temperature}>{weatherInfo.currentTemperature}</p>
        <p className={styles.description}>
          {weatherDescriptions[weatherInfo.weathercode]}
        </p>
      </div>
    </div>
  );
};
