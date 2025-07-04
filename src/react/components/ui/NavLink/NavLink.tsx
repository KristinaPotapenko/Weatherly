import { type JSX } from "react";
import { Link } from "react-router-dom";

import styles from "./NavLink.module.scss";

interface NavLinkProps {
  icon: string;
  path: string;
}

export const NavLink = ({ icon, path }: NavLinkProps): JSX.Element => {
  return (
    <Link className={styles.link} to={path}>
      <svg className={styles.icon}>
        <use xlinkHref={`${import.meta.env.BASE_URL}icon/sprite.svg#${icon}`} />
      </svg>
    </Link>
  );
};
