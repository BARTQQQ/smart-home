import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import ReactLoading from "react-loading";
import { getWeather } from "../../features/weather/weatherSlice";
import { getCity } from "../../features/city/citySlice";
import {
  TiWeatherCloudy,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherSunny,
  TiWeatherWindy,
} from "react-icons/ti";
import { BsWater, BsThermometerHalf, BsWind } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import "./weather.css";

function Weather() {
  const dispatch = useDispatch();

  const { data, status } = useSelector((state) => state.weather);
  const { city } = useSelector((state) => state.city);

  const [weatherIcon, setWeatherIcon] = useState("");
  //   const dataTemp = {
  //     city: data.name,
  //     temp: data.main.temp,
  //     feels_like: data.main.feels_like,
  //     humidity: data.main.humidity,
  //     wind: data.wind.speed,
  //   };

  useEffect(() => {
    dispatch(getCity());
  }, [dispatch]);

  useEffect(() => {
    if (city && city.city) {
      dispatch(getWeather(city.city));

      const intervalId = setInterval(() => {
        dispatch(getWeather(city.city));
      }, 1 * 60 * 1000); // update every 10 minutes

      return () => clearInterval(intervalId);
    }
  }, [dispatch, city]);
  // console.log(data, status);

  useEffect(() => {
    if (data && data.weather) {
      switch (data.weather[0].main) {
        case "Clear":
          setWeatherIcon(<TiWeatherSunny />);
          break;
        case "Rain":
          setWeatherIcon(<TiWeatherShower />);
          break;
        case "Snow":
          setWeatherIcon(<TiWeatherSnow />);
          break;
        case "Clouds":
          setWeatherIcon(<TiWeatherCloudy />);
          break;
        case "Haze":
          setWeatherIcon(<TiWeatherWindy />);
          break;
        default:
          setWeatherIcon("");
      }
    } else {
      setWeatherIcon("");
    }
  }, [data]);

  if (status === "failed") {
    return (
      <div className='weather'>
        <i className='hint'>
          "Ustaw miasto w ustawieniach w celu wyświetlania informacji
          pogodowych"
        </i>
      </div>
    );
  }

  return (
    <div className='weather'>
      <span className='city'>{data && data.name}</span>
      <div className='wrapper'>
        <div className='weather-icon'>{weatherIcon}</div>
        <div className='temp-text'>
          <span className='temp'>
            <p>
              {data && data.main.temp}
              <TbTemperatureCelsius />
            </p>
            <p>
              <span className='feels-like'>
                <BsThermometerHalf />
              </span>
              {data && data.main.feels_like}
              <TbTemperatureCelsius />
            </p>
          </span>
          <span className='text'>{data && data.weather[0].description}</span>
        </div>
      </div>
      <div className='humidity-wind'>
        <span className='humidity'>
          <BsWater /> {data && data.main.humidity}%
        </span>
        <span className='wind'>
          <BsWind /> {data && data.wind.speed}m/s
        </span>
      </div>
    </div>
  );
}

export default Weather;
