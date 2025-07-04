import { useEffect, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import cl from "classnames";

import type { AppDispatch, RootState } from "../../../features/store";
import {
  getWeatherData,
  selectWatherInfo,
} from "../../../features/weather/weatherSlice";
import { getUserLocationData } from "../../../features/userLocation/userLocationSlice";

import { Content } from "./Content/Content";
import { Forecast } from "../../sections/Forecast/Forecast";

import styles from "./Home.module.scss";

export const Home = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { city, country, latitude, longitude } = useSelector(
    (state: RootState) => state.userLocation
  );
  const weatherInfo = useSelector(selectWatherInfo);

  const nowTime = new Date();
  const nowHours = +nowTime.getHours();

  useEffect(() => {
    dispatch(getUserLocationData());
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;

    dispatch(getWeatherData({ latitude, longitude }));
  }, [latitude, longitude]);

  return (
    <div
      className={cl(styles.home, {
        [styles.homeLightBg]: nowHours >= 4 && nowHours < 20,
        [styles.homeDarkBg]: nowHours >= 20 || nowHours < 4,
      })}
    >
      <div className={styles.decorationImage}></div>
      <Content city={city} country={country} info={weatherInfo} />
      <Forecast />
    </div>
  );
};
