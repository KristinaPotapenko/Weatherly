import { type JSX } from "react";
import cl from "classnames";

import { getRouteWithParams } from "../../../../scripts/helpers/getRouteWithParams";
import { ROUTES } from "../../../../routes/routes";

import { NavLink } from "../NavLink/NavLink";
import { FloatingLink } from "../FloatingLink/FloatingLink";

import styles from "./Navigation.module.scss";

interface NavigationProps {
  city: string;
}

export const Navigation = ({ city }: NavigationProps): JSX.Element => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <li className={cl(styles.item, styles.itemTop)}>
          <NavLink path={ROUTES.SEARCH} icon="location" />
        </li>
        <li className={styles.item}>
          <FloatingLink path={ROUTES.SEARCH} />
        </li>
        <li className={cl(styles.item, styles.itemTop)}>
          <NavLink
            path={getRouteWithParams(ROUTES.FORECAST, "city", city)}
            icon="list"
          />
        </li>
      </ul>
    </nav>
  );
};
