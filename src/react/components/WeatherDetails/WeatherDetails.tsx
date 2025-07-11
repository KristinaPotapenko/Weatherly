import cl from "classnames";

import { WeatherDetailsCard } from "../cards/WeatherDetailsCard/WeatherDetailsCard";
import { PressureDial } from "./PressureDial/PressureDial";
import { WindCompass } from "../ui/WindCompass/WindCompassю";

import styles from "./WeatherDetails.module.scss";

interface Daily {
  precipitation: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  time: string[];
  weathercode: number[];
  uvIndex?: number[];
  sunrise?: string[];
  sunset?: string[];
  wind?: number[];
}

interface Hourly {
  precipitation: number[];
  temperature: number[];
  time: string[];
  weathercode: number[];
  uvIndex?: number[];
  wind?: number[];
  apparentTemperature?: number[];
  humidity?: number[];
  dew?: number[];
  surfacePressure?: number[];
  visibility?: number[];
}

interface WeatherDetailsProps {
  quality: number[];
  selectHour: number;
  selectDay: number;
  activeTab: number;
  daily: Daily;
  hourly: Hourly;
}

interface Levels {
  min: number;
  max: number;
  label: string;
}

const uvIndexLevels: Levels[] = [
  { min: 0, max: 2, label: "Low" },
  { min: 3, max: 5, label: "Moderate" },
  { min: 6, max: 7, label: "High" },
  { min: 8, max: 10, label: "Very High" },
  { min: 11, max: Infinity, label: "Extreme" },
];

const qualityLevels: Levels[] = [
  { min: 0, max: 20, label: "Very Low" },
  { min: 21, max: 40, label: "Low" },
  { min: 41, max: 60, label: "Medium" },
  { min: 61, max: 80, label: "High" },
  { min: 81, max: Infinity, label: "Very High" },
];

export const WeatherDetails = ({
  daily,
  hourly,
  quality,
  selectHour,
  selectDay,
  activeTab,
}: WeatherDetailsProps) => {
  const selectCard = activeTab === 0 ? selectHour : selectDay;
  const isDay = activeTab === 1;

  const pointerLeftQuality = `${
    (Math.min(quality[selectCard], 81) / 81) * 100
  }%`;

  const uvIndex = isDay
    ? (daily.uvIndex?.[selectCard] as number)
    : (hourly.uvIndex?.[selectCard] as number);
  const maxUV = 11;
  const pointerLeft = `${(Math.min(uvIndex, maxUV) / maxUV) * 100}%`;
  const getLabel = (index: number, levels: Levels[]): string => {
    const level = levels.find(({ min, max }) => index >= min && index <= max);

    return level ? level.label : "Low";
  };

  const sunrice = daily.sunrise?.[0];
  const sunset = daily.sunset?.[0];
  const formattedTimeToAmPm = (time: string): string => {
    const date = new Date(time);
    const formatted = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formatted;
  };

  const wind = isDay
    ? (daily.wind?.[selectCard] as number)
    : (hourly.wind?.[selectCard] as number);

  const rainfallHourly = hourly.precipitation?.[selectCard] as number;
  const rainfallDaily = isDay
    ? daily.precipitation?.[selectDay]
    : daily.precipitation?.[0];

  const temperature = hourly.apparentTemperature?.[selectCard] as number;

  const humidity = hourly.humidity?.[selectCard] as number;
  const dew = hourly.dew?.[selectCard] as number;

  const visibility = hourly.visibility?.[selectCard] as number;

  const minPressure = 950;
  const maxPressure = 1050;
  const pressure = hourly.surfacePressure?.[selectCard] as number;

  return (
    <ul className={cl(styles.wrapper, "container")}>
      <WeatherDetailsCard
        cardName={"air quality".toLocaleUpperCase()}
        icon="air"
      >
        <p className={styles.info}>
          {isDay
            ? quality[selectCard >= 5 ? 4 * 24 : selectCard * 24]
            : quality[selectCard]}
          -
          {getLabel(
            isDay
              ? quality[selectCard >= 5 ? 4 * 24 : selectCard * 24]
              : quality[selectCard],
            qualityLevels
          )}
        </p>
        <div className={styles.scale}>
          <div
            className={styles.pointer}
            style={{ left: pointerLeftQuality }}
          />
        </div>
      </WeatherDetailsCard>
      <WeatherDetailsCard cardName={"uv index".toLocaleUpperCase()} icon="sun">
        <p className={styles.info}>
          {uvIndex && uvIndex.toFixed(0)}
          <br />
          {getLabel(uvIndex, uvIndexLevels)}
        </p>
        <div className={styles.scale}>
          <div className={styles.pointer} style={{ left: pointerLeft }} />
        </div>
      </WeatherDetailsCard>
      <WeatherDetailsCard
        cardName={"sunrise".toLocaleUpperCase()}
        icon="sunrise"
      >
        <p className={styles.info}>{formattedTimeToAmPm(sunrice || "")}</p>
        <div className={styles.sunrice}>
          <svg viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#0a1a3f" />
                <stop offset="50%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0a1a3f" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="80"
              x2="300"
              y2="80"
              stroke="#cccccc"
              strokeWidth="1"
              opacity="0.8"
            />
            <path
              d="
      M -10,150
      Q 50,143 80,100
      Q 150,-30 220,100
      Q 250,150 310,150
    "
              stroke="url(#lineGradient)"
              fill="none"
              opacity="1"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
            <circle cx="90" cy="80" r="8" fill="#C4B5FD">
              <animate
                attributeName="r"
                values="8;12;8"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="90" cy="80" r="18" fill="#C4B5FD" opacity="0.3" />{" "}
          </svg>
        </div>
        <p className={cl(styles.description, styles.textCenter)}>
          Sunset: {formattedTimeToAmPm(sunset || "")}
        </p>
      </WeatherDetailsCard>
      <WeatherDetailsCard cardName={"wind".toLocaleUpperCase()} icon="wind">
        <WindCompass speed={wind} />
      </WeatherDetailsCard>
      <WeatherDetailsCard
        cardName={"rainfall".toLocaleUpperCase()}
        icon="raindrop"
      >
        <p className={styles.info}>
          {isDay ? rainfallDaily?.toFixed(2) : rainfallHourly?.toFixed(2)} mm in
          last hour
        </p>
        {!isDay && (
          <p className={styles.description}>
            {rainfallDaily?.toFixed(2)} mm expected in next 24h.
          </p>
        )}
      </WeatherDetailsCard>

      {!isDay && (
        <>
          <WeatherDetailsCard
            cardName={"feels like".toLocaleUpperCase()}
            icon="temperature"
          >
            <p className={styles.info}>
              {temperature && temperature.toFixed(0)} °
            </p>
            <p className={styles.description}>
              Similar to the actual temperature.
            </p>
          </WeatherDetailsCard>
          <WeatherDetailsCard
            cardName={"humidity".toLocaleUpperCase()}
            icon="humidity"
          >
            <p className={styles.info}>{humidity && humidity.toFixed(0)} %</p>
            <p className={styles.description}>
              The dew point is {dew} right now.
            </p>
          </WeatherDetailsCard>
          <WeatherDetailsCard
            cardName={"visibility".toLocaleUpperCase()}
            icon="visibility"
          >
            <p className={styles.info}>{(visibility / 1000).toFixed(0)} km</p>
            <p className={styles.description}>
              Similar to the actual temperature.
            </p>
          </WeatherDetailsCard>
          <WeatherDetailsCard
            cardName={"pressure".toLocaleUpperCase()}
            icon="pressure"
          >
            <PressureDial
              minPressure={minPressure}
              maxPressure={maxPressure}
              pressure={pressure}
            />
          </WeatherDetailsCard>
        </>
      )}
    </ul>
  );
};
