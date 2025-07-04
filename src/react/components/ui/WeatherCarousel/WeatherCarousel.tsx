import { type JSX } from "react";
import { useSelector } from "react-redux";

import {
  selectDaily,
  selectHourly,
} from "../../../../features/weather/weatherSlice";
import { formattedTime } from "../../../../scripts/helpers/formattedTime";
import { weatherIcon } from "../../../../utils/weatherIcon";

import { WeatherCard } from "./WeatherCard/WeatherCard";

import styles from "./WeatherCarousel.module.scss";

interface WeatherCarouselProps {
  activeTab: number;
}

export const WeatherCarousel = ({
  activeTab,
}: WeatherCarouselProps): JSX.Element => {
  const hourlyWeather = useSelector(selectHourly);
  const dailyWeather = useSelector(selectDaily);

  const nowTime = new Date();
  const nowDay = nowTime.getDate();

  return (
    <ul className={styles.carousel}>
      {hourlyWeather?.time?.length > 0 && activeTab === 0
        ? hourlyWeather?.time.map((hour, index) => {
            return (
              <WeatherCard
                key={hour}
                time={formattedTime(hour)}
                icon={weatherIcon[hourlyWeather.weathercode[index]]}
                rainfall={
                  Number(hourlyWeather.precipitation[index]) > 0
                    ? Number(hourlyWeather.precipitation[index]) * 10
                    : undefined
                }
                temperature={Number(hourlyWeather.temperature[index])}
                isCurrent={
                  formattedTime(String(nowTime)) === formattedTime(hour)
                }
              />
            );
          })
        : ""}
      {dailyWeather?.time?.length > 0 && activeTab === 1
        ? dailyWeather?.time.map((day, index) => {
            const date = new Date(day);
            const formatted = date.toLocaleDateString("uk-UA", {
              day: "2-digit",
              month: "2-digit",
            });

            return (
              <WeatherCard
                key={day}
                time={formatted}
                icon={weatherIcon[dailyWeather.weathercode[index]]}
                rainfall={
                  Number(dailyWeather.precipitation[index]) > 0
                    ? Number(dailyWeather.precipitation[index]) * 10
                    : undefined
                }
                temperatureMin={Number(dailyWeather.temperatureMin[index])}
                temperatureMax={Number(dailyWeather.temperatureMax[index])}
                isCurrent={parseInt(day.slice(-2)) === nowDay}
              />
            );
          })
        : ""}
    </ul>
  );
};
