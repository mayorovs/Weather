import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f6a22324823e42be0823d80486bde3fa`;

  const serchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };
  const kelvinToCelsius = (kelvin) => {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(2);
  };
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={serchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p> {data.name} </p>
          </div>
          <div className="temp">
          {data.main ? (
            <h1>{kelvinToCelsius(data.main.temp)}&deg;C</h1>
          ) : null}
        </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].main} </p> : null}
          </div>
        </div>
        {data.name !== undefined && <div className="bottom">
          <div className="feels">
            {data.main?(<p>{kelvinToCelsius(data.main.feels_like)}</p>) : null}
            <p>Feels Like </p> 
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}</p> :null}
            <p>Humidity </p>
          </div>
          <div className="wind">
           {data.wind ? <p>{data.wind.speed}</p> : null }
            <p>Wind speed</p>
          </div>
        </div>}
       
      </div>
    </div>
  );
}

export default App;
