import * as React from "react";
import styles from "./styles.module.scss";
import { NavLink, useLocation } from "react-router-dom";

interface IPropsCity {
  currentCity: string;
  city: string;
  id: string;
  changeCity(event: React.MouseEvent<HTMLElement>, city: string): void;
  daysAmount: string;
}

const City: React.FC<IPropsCity> = (props: IPropsCity) => {
  const location = useLocation();
  return (
    <NavLink
      to={"/" + props.daysAmount + "/" + props.currentCity}
      className={styles.cityLabel}
    >
      <div
        id={props.id}
        className={styles.cityInput}
        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
          props.changeCity(event, props.id);
        }}
      >
        <span
          className={styles.cityName}
          style={
            props.id === location.pathname.slice(7)
              ? { border: "0.5px solid rgb(139, 21, 21)" }
              : { border: "0" }
          }
        >
          {props.city}
        </span>
      </div>
    </NavLink>
  );
};

export default City;
