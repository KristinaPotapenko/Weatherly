import type { ReactNode } from "react";
import cl from "classnames";

import styles from "./Title.module.scss";

interface TitleProps {
  children: ReactNode;
  className?: string;
}

export const Title = ({ className, children }: TitleProps) => {
  return <h1 className={cl(styles.title, className)}>{children}</h1>;
};
