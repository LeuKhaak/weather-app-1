import * as React from "react";
import styles from "./styles.module.scss";
import { useState } from "react";
import City from "../../atoms/City";
interface ICity {
  city: string;
  id: string;
}

interface IChangeCity {
  changeCity(event: React.MouseEvent<HTMLElement>, city: string): void;
  currentCity: string;
  daysAmount: string;
}

const PresetСities: React.FC<IChangeCity> = (props: IChangeCity) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cities, setCities] = useState<ICity[]>([
    { city: "Minsk", id: "Minsk" },
    { city: "Moskva", id: "Moskva" },
    { city: "Bratislava", id: "Bratislava" },
  ]);

  return (
    <div className={styles.preset}>
      {cities.map((element) => (
        <City
          key={element.city}
          id={element.id}
          city={element.city}
          changeCity={props.changeCity}
          currentCity={props.currentCity}
          daysAmount={props.daysAmount}
        />
      ))}
    </div>
  );
};

export default PresetСities;
