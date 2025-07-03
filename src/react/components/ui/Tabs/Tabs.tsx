import { type JSX } from "react";
import cl from "classnames";

import styles from "./Tabs.module.scss";

interface TabsProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
}

export const Tabs = ({ tabs, activeTab, onChange }: TabsProps): JSX.Element => {
  return (
    <div
      className={`${cl(styles.tabs, {
        [styles.activeSecondTab]: activeTab === 1,
      })}`}
    >
      {tabs.map((tab, index) => {
        return (
          <button
            key={index}
            className={` ${cl(styles.button, {
              [styles.buttonActive]: activeTab === index,
            })}`}
            onClick={() => onChange(index)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
