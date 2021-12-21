import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((item) => setCountryData(item.data));
  }, []);

  const valueChangeFunct = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <SearchBar valueChange={valueChangeFunct} input={inputValue} />
      <CountryList
        setNewValue={(item) => setInputValue(item)}
        listOfItems={countryData.filter((item) =>
          item.name.common.toLowerCase().includes(inputValue.toLowerCase())
        )}
      />
    </div>
  );
}

export default App;
