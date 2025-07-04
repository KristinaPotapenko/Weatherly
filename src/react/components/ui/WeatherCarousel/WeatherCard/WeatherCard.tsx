import type { JSX } from "react";
import cl from "classnames";

import styles from "./WeatherCard.module.scss";

interface WeatherProps {
  time: string;
  icon: string;
  rainfall?: number;
  temperature?: number;
  temperatureMin?: number;
  temperatureMax?: number;
  isCurrent: boolean;
}

export const WeatherCard = ({
  isCurrent,
  ...props
}: WeatherProps): JSX.Element => {
  return (
    <li className={cl(styles.card, { [styles.current]: isCurrent })}>
      <p className={styles.info}>{props.time}</p>
      <div className={styles.wrapper}>
        <img
          className={styles.icon}
          src={`src/assets/${props.icon}.svg`}
          alt="Weather"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "src/assets/w_2.svg";
          }}
        />
        {props.rainfall && (
          <p className={`${styles.info} ${styles.accent}`}>{props.rainfall}%</p>
        )}
      </div>
      <div className={styles.temperature}>
        {props.temperature && (
          <p className={styles.infoTemperature}>
            {props.temperature.toFixed(0)}°
          </p>
        )}
        {props.temperatureMin && (
          <p className={styles.infoTemperature}>
            {props.temperatureMin.toFixed(0)}°
          </p>
        )}
        {props.temperatureMax && (
          <p className={styles.infoTemperature}>
            {props.temperatureMax.toFixed(0)}°
          </p>
        )}
      </div>
    </li>
  );
};
