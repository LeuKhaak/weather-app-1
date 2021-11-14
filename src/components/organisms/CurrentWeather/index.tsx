import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

type MainDataType = {
  feels_like: number;
  humidity: number;
  temp: number;
};
interface IDataType {
  main: MainDataType;
  timezone: number;
  wind: { speed: number };
  rain: number;
  snow: number;
  clouds: { all: number };
}

interface IProps {
  currentCity: string;
}

const CurrentWeather: React.FC<IProps> = (props: IProps) => {
  const [currentWeather, setCurrentWeather] = useState<
    MainDataType | undefined
  >();
  const [currentWind, setCurrentWind] = useState<number | undefined>(0);
  const [currentRain, setCurrentRain] = useState<number | undefined>(0);
  const [currentSnow, setCurrentSnow] = useState<number | undefined>(0);
  const [currentTime, setCurrentTime] = useState("");
  const [notFound, setNotFound] = useState("");
  const [offset, setoffset] = useState(10800);

  const getCurrentWeather = (city: string) => {
    setNotFound("");
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&type=like&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
    )
      .then((res) => res.json())
      .then((data: IDataType) => {
        if (data.main) {
          setoffset(data.timezone);
          setCurrentWeather(data.main);
          setCurrentWind(data.wind.speed);
          setCurrentRain(
            data.rain ? +JSON.stringify(data.rain).slice(6, -1) : 0
          );
          setCurrentSnow(
            data.snow ? +JSON.stringify(data.snow).slice(6, -1) : 0
          );
        } else setNotFound("City not found!");
      });
  };

  const getCurrentTime = (offset: number) => {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const nd = new Date(utc + 1000 * offset);
    const result = nd.toLocaleString().slice(0, 17);
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const day = days[nd.getDay()];
    const time = result + ", " + day;
    setCurrentTime(time);
  };

  useEffect(() => {
    getCurrentWeather(props.currentCity);
    getCurrentTime(offset);
    // eslint-disable-next-line
  }, [props.currentCity, offset]);

  return (
    <div className={styles.current}>
      <div className={styles.notFound}>{notFound}</div>
      <div className={styles.currentTime}>
        Weather forecast for {currentTime} (local time)
      </div>
      <div className={styles.currentWrapper}>
        <div className={styles.currentItem}>
          *t - {currentWeather?.temp} &#8451;
        </div>
        <div className={styles.currentItem}>
          *feels like - {currentWeather?.feels_like} &#8451;
        </div>
        <div className={styles.currentItem}>
          *rh - {currentWeather?.humidity}%
        </div>
        <div className={styles.currentItem}>*wind - {currentWind}</div>
        <div className={styles.currentItem}>
          {currentRain && currentRain > 0
            ? "*rain - " + currentRain + " mm/h"
            : ""}
        </div>
        <div className={styles.currentItem}>
          {currentSnow && currentSnow > 0
            ? "*snow - " + currentSnow + " mm/3h"
            : ""}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
