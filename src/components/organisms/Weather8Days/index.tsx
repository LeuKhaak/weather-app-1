import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Precipitation from "../../molecules/Precipitation";

type Days8DataType = {
  dt: number;
  temp: { day: number; night: number };
  wind_speed: number;
  rain: number;
  snow: number;
};

interface IDataType {
  daily: Days8DataType[];
  timezone_offset: number;
}

interface IProps {
  currentCity: string;
  match: { params: { city: string } };
  daysAmount: string;
}

const Weather8Days: React.FC<IProps> = (props: IProps) => {
  const [weather8Days, setWeather8Days] = useState<IDataType | undefined>();

  const getWeather8Days = (city: string) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&type=like&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
    )
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        }
      })
      .then((firstData) => {
        if (firstData)
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${firstData.coord.lat}&lon=${firstData.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
          )
            .then((res) => {
              if (res.status >= 200 && res.status < 300) {
                return res.json();
              }
            })
            .then((data: IDataType) => {
              if (data.daily) {
                setWeather8Days(data);
              }
            });
      });
  };

  const getMomentTime = (dt: number, timezone: number) => {
    const nd = new Date((dt - 21600) * 1000 + 1000 * timezone);
    const result = nd.toLocaleString().slice(0, 10);
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const day = days[nd.getDay()];
    const time = result + ", " + day;
    return time;
  };

  useEffect(() => {
    if (props.daysAmount !== "days3") getWeather8Days(props.match.params.city);
    // eslint-disable-next-line
  }, [props.currentCity, props.match]);

  return (
    <div className={styles.days8}>
      <div className={styles.days8Title}>Weather forecast for 8 days</div>
      <ul className={styles.daysList}>
        {weather8Days?.daily.map((element, index) => (
          <li
            key={index}
            className={styles.day}
            style={
              index % 2
                ? { backgroundColor: "#def8f6" }
                : { backgroundColor: "rgb(233, 235, 272)" }
            }
          >
            <div className={styles.moment}>
              {getMomentTime(element.dt, weather8Days.timezone_offset)}
            </div>
            <div className={styles.moment}>
              night t: {element.temp.night}&#8451;
            </div>
            <div className={styles.moment}>
              day t: {element.temp.day}&#8451;
            </div>
            <div className={styles.moment}>wind: {element.wind_speed};</div>
            <Precipitation
              rain={element.rain}
              snow={element.snow}
              interval1=""
              interval2=""
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weather8Days;
