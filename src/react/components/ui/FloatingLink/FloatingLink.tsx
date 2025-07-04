import { Link } from "react-router-dom";

import styles from "./FloatingLink.module.scss";

interface FloatingLinkProps {
  path: string;
  icon?: string;
}

export const FloatingLink = ({ path, icon = "plus" }: FloatingLinkProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.darkLayer}>
        <div className={styles.blur}></div>
        <div className={styles.content}>
          <div className={styles.lightLayer}>
            <Link to={path} className={styles.link}>
              <svg>
                <use
                  xlinkHref={`${
                    import.meta.env.BASE_URL
                  }icon/sprite.svg#${icon}`}
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
