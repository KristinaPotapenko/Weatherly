import { useSelector } from "react-redux";

import { selectHourly } from "../../../features/weather/weatherSlice";
import { weatherIcon } from "../../../utils/weatherIcon";
import { formattedTime } from "../../../scripts/helpers/formattedTime";

import { WeatherCard } from "../ui/WeatherCarousel/WeatherCard/WeatherCard";

interface HourlyForecastProps {
  city: string;
}

export const HourlyForecast = ({ city }: HourlyForecastProps) => {
  const hourlyWeather = useSelector(selectHourly);

  const nowTime = new Date();

  return (
    <>
      {hourlyWeather?.time?.length > 0 &&
        hourlyWeather?.time.map((hour, index) => {
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
              isCurrent={formattedTime(String(nowTime)) === formattedTime(hour)}
              city={city}
            />
          );
        })}
    </>
  );
};
