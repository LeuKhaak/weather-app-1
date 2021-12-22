import * as React from "react";
import styles from "./styles.module.scss";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../organisms/Header";
import CurrentWeather from "../../organisms/CurrentWeather";
import Weather3Days from "../../organisms/Weather3Days";
import Weather8Days from "../../organisms/Weather8Days";
import { useLocation, useHistory } from "react-router-dom";

function Weather() {
  const location = useLocation();
  const [daysAmount, setDaysAmount] = useState(
    location.pathname.slice(1, 6) === "days8" ? "days8" : "days3"
  );
  const [currentCity, setcurrentCity] = useState(
    location.pathname.slice(7) === "r-app-1"
      ? "Minsk"
      : location.pathname.slice(7)
  );

  const newDaysAmount = (arg: string) => {
    setDaysAmount(arg);
  };

  const changeCity = (
    event:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    city: string
  ) => {
    setcurrentCity(city);
  };

  let history = useHistory();
  useEffect(() => {
    if (currentCity) {
      history.push({
        pathname: "/" + daysAmount + "/" + currentCity,
      });
    }

    // eslint-disable-next-line
  }, [currentCity, daysAmount]);

  return (
    <main className={styles.weather}>
      <Header
        changeCity={changeCity}
        currentCity={currentCity}
        daysAmount={daysAmount}
        newDaysAmount={newDaysAmount}
      />
      <CurrentWeather currentCity={currentCity} />
      <Switch>
        <Route exact path={`/days3/:city`}>
          {({ match }) => (
            <Weather3Days
              daysAmount={daysAmount}
              currentCity={currentCity}
              match={match as { params: { city: string } }}
            />
          )}
        </Route>
        <Route exact path={`/days8/:city`}>
          {({ match }) => (
            <Weather8Days
              daysAmount={daysAmount}
              currentCity={currentCity}
              match={match as { params: { city: string } }}
            />
          )}
        </Route>
      </Switch>
    </main>
  );
}

export default Weather;
