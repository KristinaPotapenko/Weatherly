import { type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { HourlyForecast } from "../../HourlyForecast/HourlyForecast";
import { WeeklyForecast } from "../../WeeklyForecast/WeeklyForecast";

import styles from "./WeatherCarousel.module.scss";

interface WeatherCarouselProps {
  activeTab: number;
  city: string;
  isForecast?: boolean;
  handleSelectHour?: (index: number) => void;
  handleSelectDay?: (index: number) => void;
}

export const WeatherCarousel = ({
  activeTab,
  city,
  isForecast,
  handleSelectHour,
  handleSelectDay,
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
          <HourlyForecast
            city={city}
            isForecast={isForecast}
            handleSelectHour={handleSelectHour}
          />
        ) : (
          <WeeklyForecast
            city={city}
            isForecast={isForecast}
            handleSelectDay={handleSelectDay}
          />
        )}
      </motion.ul>
    </AnimatePresence>
  );
};
