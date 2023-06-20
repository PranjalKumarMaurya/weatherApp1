import React, { useState } from "react";
import "./App.css";
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather";
import Search from "./Components/Search";
import Forecast from "./Components/Forecast/Forecast";
import { Weather_api_url, Weather_api_key } from "./api";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${Weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_api_key}&units=metric`
    );
    const forecastFetch = fetch(
      `${Weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_api_key}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(console.log);
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="App">
      <Search onSearchChange={handleOnSearchChange} />
      {CurrentWeather && <CurrentWeather data={currentWeather} />}
      {Forecast && <Forecast data={forecast} />}
    </div>
  );
}
