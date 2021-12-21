import WeatherData from "./WeatherData";

const CountryData = ({ countryData }) => {
  return (
    <div>
      <h2>{countryData.name.common}</h2>
      capital {countryData.capital}
      <br />
      population {countryData.population}
      <br />
      <h2>Languages</h2>
      <div>
        {Object.values(countryData.languages).map((item, index) => {
          return <div key={index}> • {item}</div>;
        })}
      </div>
      <br />
      <img src={countryData.flags.png} alt="" />
      <h2>Weather in {countryData.capital} </h2>
      <WeatherData capitalName={countryData.capital} />
    </div>
  );
};

export default CountryData;
