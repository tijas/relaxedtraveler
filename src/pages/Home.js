import React, { useState } from "react";
import { Carousel } from 'react-bootstrap';
import './Home.css'
import Weather from "../components/Weather";
import Plan from "../components/Plan";


const Home = () => {
  const [city, setCity] = useState({name:"Helsinki", coord:"lat=60.16952&lon=24.93545"});
  
  let dateNow = new Date().toISOString();
  const [date, setDate] = useState(dateNow.slice(0,10));
  const [days, setDays] = useState(
    [["0", ["Arrive to Airport 8:00", "Taxi to hotel","Lunch nextdoor 12:00","Meet friend","Supper","Sleep"], ["Airport","Helsinki-Vantaa airport. Gotta take taxi outside"], ["Hotel","Original Sokos Hotel Presidentti, Eteläinen Rautatiekatu 4, 00100 Helsinki, https://www.sokoshotels.fi/fi/helsinki/sokos-hotel-presidentti"], ["Restaurants","https://www.myhelsinki.fi/en/eat-and-drink/restaurants/the-10-best-restaurants-in-finland, Best ten in helsinki"]],
    ["1", ["Hotel breakfast","Look for new friend","Go to park","Movies","Flight to home at 23:00"], ["Movie palace","https://www.finnkino.fi/teatterit/maxim"]]]);

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
      <div id="content">
      <Plan city={city} setCity={setCity} date={date} setDate={setDate} days={days} setDays={setDays}/>
      </div>
    </div>
  )
}

export default Home;