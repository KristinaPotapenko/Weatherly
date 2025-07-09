import styles from "./CloudBg.module.scss";

export const CloudBg = () => {
  return (
    <>
      <div className={styles.cloudLayer + " " + styles.cloudLayer1}></div>
      <div className={styles.cloudLayer + " " + styles.cloudLayer2}></div>
      <div className={styles.cloudLayer + " " + styles.cloudLayer3}></div>
    </>
  );
};
