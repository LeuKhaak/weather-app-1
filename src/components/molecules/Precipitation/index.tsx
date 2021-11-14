/* eslint-disable no-unreachable */
import * as React from "react";
import styles from "./styles.module.scss";

interface IPropsPresip {
  rain: number | undefined;
  snow: number | undefined;
  interval1: string;
  interval2: string;
}

const Precipitation: React.FC<IPropsPresip> = (props: IPropsPresip) => {
  return (
    <div className={styles.precipitation}>
      <div
        className={styles.moment}
        style={props.rain ? { display: "block" } : { display: "none" }}
      >
        &#9730;
        {props.rain ? " " + props.rain + " mm" + props.interval1 : ""}
      </div>
      <div
        className={styles.moment}
        style={props.snow ? { display: "block" } : { display: "none" }}
      >
        &#10054;
        {props.snow ? " " + props.snow + " mm" + props.interval2 : ""}
      </div>
      <div
        className={styles.moment}
        style={
          !props.rain && !props.snow
            ? { display: "block" }
            : { display: "none" }
        }
      >
        without &#9730;
      </div>
    </div>
  );
};

export default Precipitation;
