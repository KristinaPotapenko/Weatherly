import cl from "classnames";

import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.sky}>
        <div className={styles.sun}></div>
        <div className={styles.cloud}></div>
        <div className={cl(styles.cloud, styles.cloud2)}></div>
      </div>
    </div>
  );
};
