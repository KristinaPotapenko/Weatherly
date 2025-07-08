import type { InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

type InputProps = {
  icon?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ icon, ...props }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon}>
        <use xlinkHref={`${import.meta.env.BASE_URL}icon/sprite.svg#${icon}`} />
      </svg>
      <input className={styles.input} {...props} />
    </div>
  );
};
