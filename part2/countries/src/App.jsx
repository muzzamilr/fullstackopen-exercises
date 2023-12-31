import axios from "axios";
import { useEffect, useState } from "react";
import { Country } from "./components/Country";

const App = () => {
  const [searchVal, setSearchVal] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setCountriesData(res.data));
  }, []);

  const handleSearchValue = (e) => {
    setSearchVal(e.target.value);
    setVisibleCountries(
      countriesData.filter((c) =>
        c.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    if (e.target.value === "") setVisibleCountries([]);
  };

  const handleShow = (country) => () => {
    setVisibleCountries([country]);
  };

  return (
    <div>
      <div>
        find countries: <input onChange={handleSearchValue} value={searchVal} />
      </div>
      {visibleCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : visibleCountries.length === 1 ? (
        <Country country={visibleCountries[0]} />
      ) : (
        visibleCountries.map((c) => (
          <div key={c.name.common}>
            <span key={c.name.common}>{c.name.common}</span>
            <button onClick={handleShow(c)}>show</button>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
