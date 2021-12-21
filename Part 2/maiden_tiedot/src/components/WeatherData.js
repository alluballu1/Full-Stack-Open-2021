import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherData = ({ capitalName }) => {
  const [data, setData] = useState({
    current: {
      feelslike: null,
      weather_icons: null,
      wind_speed: null,
      wind_dir: null,
    },
  });

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const weatherUrl =
      "http://api.weatherstack.com/current?access_key=" +
      apiKey +
      "&query=" +
      capitalName;
    axios.get(weatherUrl).then((item) => setData(item.data));
  }, []);

  return (
    <div>
      temperature: {data.current.feelslike}°C
      <br />
      <img src={data.current.weather_icons} alt="" />
      <br />
      wind: {data.current.wind_speed}mph direction {data.current.wind_dir}
    </div>
  );
};

export default WeatherData;
