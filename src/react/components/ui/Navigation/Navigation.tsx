import { type JSX } from "react";
import cl from "classnames";

import { ROUTES } from "../../../../routes/routes";

import { NavLink } from "../NavLink/NavLink";
import { FloatingLink } from "../FloatingLink/FloatingLink";

import styles from "./Navigation.module.scss";

export const Navigation = (): JSX.Element => {
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
          <NavLink path={ROUTES.FORECAST} icon="list" />
        </li>
      </ul>
    </nav>
  );
};
