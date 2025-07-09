import { useState, type JSX } from "react";
import { Tabs } from "../../components/ui/Tabs/Tabs";
import { WeatherCarousel } from "../../components/ui/WeatherCarousel/WeatherCarousel";
import { Navigation } from "../../components/ui/Navigation/Navigation";

import styles from "./ForecastSection.module.scss";

interface ForecastSectionProps {
  city: string;
}

export const ForecastSection = ({
  city,
}: ForecastSectionProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}></div>
      <Tabs
        tabs={["Hourly Forecast", "Weekly Forecast"]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <WeatherCarousel activeTab={activeTab} city={city} />
      <Navigation city={city} />
    </div>
  );
};
