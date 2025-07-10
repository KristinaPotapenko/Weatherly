import { type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { HourlyForecast } from "../../HourlyForecast/HourlyForecast";
import { WeeklyForecast } from "../../WeeklyForecast/WeeklyForecast";

import styles from "./WeatherCarousel.module.scss";

interface WeatherCarouselProps {
  activeTab: number;
  city: string;
}

export const WeatherCarousel = ({
  activeTab,
  city,
}: WeatherCarouselProps): JSX.Element => {
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={activeTab}
        className={styles.carousel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 0 ? (
          <HourlyForecast city={city} />
        ) : (
          <WeeklyForecast city={city} />
        )}
      </motion.ul>
    </AnimatePresence>
  );
};
