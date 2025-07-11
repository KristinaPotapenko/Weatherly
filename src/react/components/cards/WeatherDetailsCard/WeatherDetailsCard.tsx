import type { ReactNode } from "react";

import styles from "./WeatherDetailsCard.module.scss";

interface WeatherDetailsCardProps {
  icon: string;
  cardName: string;
  children: ReactNode;
}

export const WeatherDetailsCard = ({
  icon,
  cardName,
  children,
}: WeatherDetailsCardProps) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.categories}>
        <svg>
          <use
            xlinkHref={`${import.meta.env.BASE_URL}icon/sprite.svg#${icon}`}
          />
        </svg>
        <p className={styles.name}>{cardName}</p>
      </div>
      {children}
    </li>
  );
};
