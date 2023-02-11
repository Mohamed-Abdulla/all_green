import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
const Home = () => {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [soilData, setSoilData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (location.lat && location.lng) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${
              import.meta.env.VITE_WEATHER_API
            }`
          );
          setWeather(response.data.main);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSoilData = async () => {
      const response = await axios.get(
        `https://api.nbssslup.in/soilinfo?latitude=${location.lat}&longitude=${location.lng}`
      );
      setSoilData(response.data);
    };
    fetchWeather();
    fetchSoilData();
  }, [location]);
  return (
    <>
      <div className="container flex gap-5 flex-col">
        <h1 className="text-white text-3xl">Allow Location access, to suggest Crops based on your Location</h1>
        <p>Latitude: {location.lat}</p>
        <p>Longitude: {location.lng}</p>

        <h2>Your weather conditions</h2>
        <p>Temperature: {weather.temp}</p>
        <p>Pressure: {weather.pressure}</p>
        <p>Humidity: {weather.humidity}</p>

        <h2>Soil Information</h2>
        <p>Soil Type: {soilData.soil_type}</p>
        <p>Texture: {soilData.texture}</p>
        <p>pH: {soilData.pH}</p>
      </div>
    </>
  );
};

export default Home;
