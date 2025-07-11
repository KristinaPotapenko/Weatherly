import { useSelector } from "react-redux";

import { selectDaily } from "../../../features/weather/weatherSlice";
import { weatherIcon } from "../../../utils/weatherIcon";

import { WeatherCard } from "../ui/WeatherCarousel/WeatherCard/WeatherCard";

interface WeeklyForecastProps {
  city: string;
  isForecast?: boolean;
  handleSelectDay?: (index: number) => void;
}

export const WeeklyForecast = ({
  city,
  isForecast,
  handleSelectDay,
}: WeeklyForecastProps) => {
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
            index={index}
            time={formatted}
            icon={weatherIcon[dailyWeather.weathercode[index]]}
            rainfall={
              Number(dailyWeather.precipitation[index]) > 0
                ? Number(dailyWeather.precipitation[index])
                : undefined
            }
            temperatureMin={Number(dailyWeather.temperatureMin[index])}
            temperatureMax={Number(dailyWeather.temperatureMax[index])}
            isCurrent={parseInt(day.slice(-2)) === nowDay}
            city={city}
            isForecast={isForecast}
            handleSelect={handleSelectDay}
          />
        );
      })}
    </>
  );
};
