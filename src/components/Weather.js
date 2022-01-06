import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container } from 'react-bootstrap';
import './Weather.css'

const Weather = ({city, date}) =>{
  const [weather, setWeather]= useState()
  const iconUrl = "https://openweathermap.org/img/wn/"
  const iconUrlEnd = "@2x.png"

  let dateNow = new Date();

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?${city.coord}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    if(city.name!==""){
    axios.get(url)
    .then(result => {
      setWeather(result.data)
    }).catch(e => {
      console.log(e);
    })
  }}, [city])

  if(weather){
    const iconFinalUrl = iconUrl+weather.weather[0].icon+iconUrlEnd
  return (
    <Container flex className="weatherWidget d-flex flex-row flex-wrap d-flex justify-content-between">
    <div>
    <h5 className="note-line">{weather.name}, {weather.sys.country}</h5>
    <p className="note-line"></p>
    <div className="note-line d-flex flex-row flex-wrap">Weather: {weather.weather.map(x => <span key={x.main} className="mb-0"> {x.main},</span>)}</div>
    <p>Temp: {parseInt(weather.main.temp)} °C, {dateNow.toLocaleDateString()}</p>
    </div>
    <div><img className="weatherIcon" src={iconFinalUrl} alt="WeatherIcon"></img></div>
    </Container>
  )
  }else{
    return(<div className="weatherWidget">Please choose Destination</div>)
  }
}

export default Weather