import axios from "axios";
import { useEffect, useState } from "react";

export const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          country.latlng[0]
        }&lon=${country.latlng[1]}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      )
      .then((res) => setWeather(res.data));
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
      <p>temperature {weather?.main?.temp} celcius</p>
      {weather && (
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
        />
      )}
      <p>wind {weather?.wind?.speed} m/s</p>
    </div>
  );
};
