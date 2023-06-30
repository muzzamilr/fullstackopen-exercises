import axios from "axios";
import { useEffect } from "react";

export const Country = ({ country }) => {
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          country.latlng[0]
        }&lon=${country.latlng[1]}&appid=${import.meta.env.VITE_API_KEY}`
      )
      .then((res) => console.log(res));
  }, []);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {...country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((lan) => (
          <li key={lan}>{lan}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.name.common}</h2>
      <p>temperature </p>
      <img />
      <p>wind</p>
    </div>
  );
};
