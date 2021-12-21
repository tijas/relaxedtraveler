import React, { useState, useEffect } from "react";
import { Carousel } from 'react-bootstrap';
import './Home.css'
import axios from 'axios';


const Weather = ({weather}) =>{
  const iconUrl = "https://openweathermap.org/img/wn/"
  const iconUrlEnd = "@2x.png"
  if(weather){
    const iconFinalUrl = iconUrl+weather.weather[0].icon+iconUrlEnd
    console.log(iconFinalUrl);
  return (
    <div>
    <h5 className="note-line">Location: {weather.name}</h5>
    <br></br>
    <p className="note-line"></p>
    <p className="note-line">Weather: {weather.weather.map(x => <span key={x.main}>{x.main}, </span>)} <img src={iconFinalUrl} alt="WeatherIcon"></img> </p>
    
    <br></br>
    <p className="note-line">Temperature: {parseInt(-273.15+weather.main.temp)} °C</p>
    </div>
  )
  }else{
    return(<p>Weather Tobe</p>)
  }
}

const Plan = ({weather}) => {

  if(weather){
    return (
      <div>
      <p className="note-line text-end">Start location: {weather.name}</p>
      </div>
    )
    }else{
      return(<p>Cool plan</p>)
    }  
}

const Home = () => {
  const [weather, setWeather]= useState()
  const [icons, setIcons]= useState()

  useEffect(() => {
    axios.get(url)
    .then(result => {
      console.log(result.data);
      setWeather(result.data)
    }).catch(e => {
      console.log(e);
    })
  }, [])


  return (
    <div className="w-100 home-main">
      <header className="carousel-main">
      <Carousel  fade className="carousel-control">
        <Carousel.Item className="carousel-item">
          <img
            className="d-block w-100 carousel-image"
            src="https://cdn.pixabay.com/photo/2019/09/30/18/11/flight-4516478_960_720.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="bg-primary bg-opacity-50 rounded">
            <h3>Welcome Relaxed Traveler</h3>
            <p>Continue on for easier travel planning with our journey planner.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img
            className="d-block w-100 carousel-image"
            src="https://cdn.pixabay.com/photo/2020/05/25/17/03/travel-5219496_960_720.jpg"
            alt="Second slide"
          />

          <Carousel.Caption className="bg-primary bg-opacity-50 rounded">
            <h3>Tired of writing everything down</h3>
            <p>Look into our service for straightforward and easy travel planning.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img
            className="d-block w-100 carousel-image"
            src="https://cdn.pixabay.com/photo/2014/11/02/10/41/plane-513641_960_720.jpg"
            alt="Third slide"
          />

          <Carousel.Caption className="bg-primary bg-opacity-50 rounded">
            <h3>Intuitive to use</h3>
            <p>Info relevant for you, always at your fingertips.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </header>
      <div className="mt-2">
        <h1 className="text-center">Step into easier travel planning</h1>
        <div className="text-center">With our help you can plan holiday easily in advance and follow the plan carefree while on the road! <span className="fw-light fst-italic">internet required</span></div>
      </div>
      <div id="paper">
        <div id="pattern" className="row">
          <div id="content-left" className="col-9 text-primary">
            <Plan weather={weather}/>
          </div>
          <div id="content-right" className="col-3 text-primary">
            <Weather weather={weather}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;