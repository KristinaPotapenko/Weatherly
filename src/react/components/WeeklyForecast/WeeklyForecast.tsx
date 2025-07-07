import { useSelector } from "react-redux";

import { selectDaily } from "../../../features/weather/weatherSlice";
import { weatherIcon } from "../../../utils/weatherIcon";

import { WeatherCard } from "../ui/WeatherCarousel/WeatherCard/WeatherCard";

export const WeeklyForecast = () => {
  const dailyWeather = useSelector(selectDaily);

  const nowTime = new Date();
  const nowDay = nowTime.getDate();

  if (!dailyWeather?.time?.length) return null;

  return (
    <>
      {dailyWeather?.time.map((day, index) => {
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
      })}
    </>
  );
};
