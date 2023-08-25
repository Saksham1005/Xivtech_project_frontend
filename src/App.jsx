import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cities, setCities] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const API_URL = "https://xivtech-backend.onrender.com/getWeather";

  const getWeatherData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cities: cities.split(",").map((city) => city.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setWeatherData(data.weather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container mt-5 mx-auto">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Increased the column size */}
          <h1 className="text-center">Weather App</h1>
          <p className="text-center">
            Enter city names separated by commas.
          </p>{" "}
          {/* Added paragraph */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city names (comma separated)"
              value={cities}
              onChange={(e) => setCities(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={getWeatherData}
              >
                Get Weather
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          {/* Increased the column size */}
          <div>
            {Object.keys(weatherData).map((city) => (
              <div className="alert alert-info" key={city}>
                {city}: {weatherData[city]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
