import type { JSX } from "react";
import { Link } from "react-router-dom";
import cl from "classnames";

import { getRouteWithParams } from "../../../../../scripts/helpers/getRouteWithParams";
import { ROUTES } from "../../../../../routes/routes";

import styles from "./WeatherCard.module.scss";

interface WeatherProps {
  time: string;
  icon: string;
  rainfall?: number;
  temperature?: number;
  temperatureMin?: number;
  temperatureMax?: number;
  isCurrent: boolean;
  city: string;
}

export const WeatherCard = ({
  isCurrent,
  city,
  ...props
}: WeatherProps): JSX.Element => {
  return (
    <li className={cl(styles.card, { [styles.current]: isCurrent })}>
      <Link
        className={styles.wrapper}
        to={getRouteWithParams(ROUTES.FORECAST, "city", city)}
      >
        <p className={styles.info}>{props.time}</p>
        <div className={styles.wrapper}>
          <img
            className={styles.icon}
            src={`/src/assets/weather/${props.icon}.svg`}
            alt="Weather"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "src/assets/weather/w_2.svg";
            }}
          />
          {props.rainfall && (
            <p className={`${styles.info} ${styles.accent}`}>
              {props.rainfall}%
            </p>
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
      </Link>
    </li>
  );
};
