import * as React from "react";
import styles from "./styles.module.scss";
import Title from "../../atoms/Title";
import PresetСities from "../../molecules/PresetCities";
import CitySearch from "../../molecules/CitySearch";

interface IChangeCity {
  changeCity(
    event:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    city: string
  ): void;
  currentCity: string;
  newDaysAmount(arg: string): void;
  daysAmount: string;
}

const Header: React.FC<IChangeCity> = (props: IChangeCity) => {
  return (
    <section className={styles.header}>
      <Title />
      <PresetСities
        daysAmount={props.daysAmount}
        currentCity={props.currentCity}
        changeCity={props.changeCity}
      />
      <CitySearch
        changeCity={props.changeCity}
        currentCity={props.currentCity.toUpperCase()}
      />
      <div className={styles.selectPeriod}>
        <button
          className={styles.selectButton}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            props.newDaysAmount("days8");
          }}
        >
          To 8 days
        </button>
        <button
          className={styles.selectButton}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            props.newDaysAmount("days3");
          }}
        >
          To 3 days
        </button>
      </div>
    </section>
  );
};

export default Header;
