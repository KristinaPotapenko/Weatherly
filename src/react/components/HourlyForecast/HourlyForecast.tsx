import { useSelector } from "react-redux";

import { selectHourly } from "../../../features/weather/weatherSlice";
import { weatherIcon } from "../../../utils/weatherIcon";
import { formattedTime } from "../../../scripts/helpers/formattedTime";

import { WeatherCard } from "../ui/WeatherCarousel/WeatherCard/WeatherCard";

interface HourlyForecastProps {
  city: string;
  isForecast?: boolean;
  handleSelectHour?: (index: number) => void;
}

export const HourlyForecast = ({
  city,
  isForecast,
  handleSelectHour,
}: HourlyForecastProps) => {
  const hourlyWeather = useSelector(selectHourly);

  const nowTime = new Date();

  return (
    <>
      {hourlyWeather?.time?.length > 0 &&
        hourlyWeather?.time.map((hour, index) => {
          return (
            <WeatherCard
              key={hour}
              index={index}
              time={formattedTime(hour)}
              icon={weatherIcon[hourlyWeather.weathercode[index]]}
              rainfall={
                Number(hourlyWeather.precipitation[index]) > 0
                  ? Number(hourlyWeather.precipitation[index])
                  : undefined
              }
              temperature={Number(hourlyWeather.temperature[index])}
              isCurrent={formattedTime(String(nowTime)) === formattedTime(hour)}
              city={city}
              isForecast={isForecast}
              handleSelect={handleSelectHour}
            />
          );
        })}
    </>
  );
};
