import { type JSX } from "react";
import cl from "classnames";
import { motion } from "framer-motion";

import styles from "./Tabs.module.scss";

interface TabsProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
}

export const Tabs = ({ tabs, activeTab, onChange }: TabsProps): JSX.Element => {
  return (
    <div
      className={cl(styles.tabs, {
        [styles.activeSecondTab]: activeTab === 1,
      })}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === index;

        return (
          <button
            key={index}
            className={` ${cl(styles.button, {
              [styles.buttonActive]: isActive,
            })}`}
            onClick={() => onChange(index)}
          >
            {tab}
            {isActive && (
              <motion.div
                layoutId="underline"
                className={styles.underline}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
