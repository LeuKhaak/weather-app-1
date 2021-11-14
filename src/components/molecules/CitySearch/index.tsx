import * as React from "react";
import { useState } from "react";
import styles from "./styles.module.scss";

interface IPropsSearch {
  currentCity: string;
  changeCity(event: React.KeyboardEvent<HTMLInputElement>, city: string): void;
}

const CitySearch: React.FC<IPropsSearch> = (props: IPropsSearch) => {
  const [sityName, setCityName] = useState("");

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.search}>
        <input
          className={styles.searchInput}
          type="text"
          name="search-city"
          placeholder="search city"
          value={sityName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCityName(event.target.value);
          }}
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              if (sityName.search(/[а-яА-ЯёЁ]/g) !== 0 && sityName.length > 1) {
                props.changeCity(event, sityName);
                setCityName("");
              } else {
                setCityName("");
                alert("Enter the city in Latin letters");
              }
            }
          }}
        />
      </div>
      <span className={styles.selectedCity}>
        Weather in <span className={styles.cityName}>{props.currentCity}</span>
      </span>
    </div>
  );
};

export default CitySearch;
