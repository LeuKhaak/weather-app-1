/* eslint-disable no-unreachable */
import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Precipitation from "../../molecules/Precipitation";

type MainDataType = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
};
interface IDataType {
  main: MainDataType;
  clouds: { all: number };
  wind: { speed: number };
  dt: number;
  dt_txt: string;
  rain: number;
  snow: number;
}
interface IDataList {
  list: IDataType[];
  city: { timezone: number };
}
interface IProps3Days {
  daysAmount: string;
  currentCity: string;
  match: { params: { city: string } };
}

const Weather3Days: React.FC<IProps3Days> = (props: IProps3Days) => {
  const [weather3Days, setWeather3Days] = useState<IDataList | undefined>();

  const getDays3Weather = (city: string) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=24&type=like&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
    )
      .then((res) => res.json())
      .then((data: IDataList) => {
        if (data.list) {
          setWeather3Days(data);
        }
      });
  };

  const getMomentTime = (dt: number, timezone: number) => {
    const nd = new Date((dt - 21600) * 1000 + 1000 * timezone);
    const result = nd.toLocaleString().slice(0, 17);
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const day = days[nd.getDay()];
    const time = result + ", " + day;
    return time;
  };

  const getStyle = (dt: number, tz: number) => {
    switch (dt + tz / 3600) {
      case 3:
        return true;
        break;
      case 4:
        return true;
        break;
      case 5:
        return true;
        break;
      case 27:
        return true;
        break;
      case 28:
        return true;
        break;
      case 29:
        return true;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (props.daysAmount !== "days8") getDays3Weather(props.currentCity);
    // eslint-disable-next-line
  }, [props]);

  return (
    <div className={styles.days3}>
      <div className={styles.days3Title}>Weather forecast for 3 days</div>
      <ul>
        {weather3Days?.list.map((element, index) => (
          <li
            key={index}
            className={styles.partOfDay}
            style={
              getStyle(
                +element.dt_txt.slice(10, 13),
                weather3Days.city.timezone
              )
                ? { backgroundColor: "rgb(148, 109, 240)", color: "#fff" }
                : { backgroundColor: "rgb(238, 237, 252)" }
            }
          >
            <div className={styles.moment}>
              {getMomentTime(element.dt, weather3Days.city.timezone)}
            </div>
            <div className={styles.moment}>t {element.main.temp}&#8451;</div>
            <div
              className={styles.moment}
              style={
                element.clouds.all < 21
                  ? { display: "block", color: "rgb(250, 391, 157)" }
                  : { display: "none" }
              }
            >
              &#9728;
            </div>
            <div
              className={styles.moment}
              style={
                element.clouds.all > 20 && element.clouds.all < 61
                  ? { display: "block", color: "rgb(190, 190, 190)" }
                  : { display: "none" }
              }
            >
              &#9925;
            </div>
            <div
              className={styles.moment}
              style={
                element.clouds.all > 60
                  ? { display: "block", color: "#000" }
                  : { display: "none" }
              }
            >
              &#9729;
            </div>
            <div className={styles.moment}>wind {element.wind.speed}</div>
            <Precipitation
              rain={
                element.rain
                  ? +JSON.stringify(element.rain).slice(6, -1)
                  : undefined
              }
              snow={
                element.snow
                  ? +JSON.stringify(element.snow).slice(6, -1)
                  : undefined
              }
              interval1="/h"
              interval2="/3h"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weather3Days;
