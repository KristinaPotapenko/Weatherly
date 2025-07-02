import type { JSX } from "react";
import cl from "classnames";

import styles from "./WeatherCard.module.scss";

interface WeatherProps {
  time: string;
  image: string;
  rainfall?: string;
  temperature: string;
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
        <img className={styles.image} src={props.image} alt="Weather" />
        {props.rainfall && (
          <p className={`${styles.info} ${styles.accent}`}>{props.rainfall}</p>
        )}
      </div>
      <p className={styles.infoTemperature}>{props.temperature}</p>
    </li>
  );
};
