import React, { useState, useEffect } from "react";
import Plan from "../components/Plan";
import './User.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';

const User = () => {
  const [city, setCity] = useState({name:"", coord:""});
  const [date, setDate] = useState();
  const [days, setDays] = useState([]);

  useEffect(()=>{
    axios.post("https://relaxedtravelerbackend.herokuapp.com/getuserjourney", {
      name: sessionStorage.getItem("tokens").slice(1, -1)
    }).then(result => {
      if (result.status === 200) {
        const journey = result.data
        console.log("usertable", journey);
        setCity(journey.city)
        setDate(journey.date)
        setDays(journey.days)
      }
    }).catch(e => {
      console.log(e);
    });
  },[])

  const saveDay =()=>{
    axios.post("https://relaxedtravelerbackend.herokuapp.com/setuserjourney", {
      name: sessionStorage.getItem("tokens").slice(1, -1),
      journey: {"city":city, "date":date, "days":days}
    }).then(result => {
      if (result.status === 201) {
        console.log("setuser",result.data);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <div className="w-100 home-main">
      <div className="mt-2">
        <h1 className="text-center">Step into easier travel planning</h1>
        <div className="text-center">With our help you can plan holiday easily in advance and follow the plan carefree while on the road! <span className="fw-light fst-italic">internet required</span></div>
      </div>
      <div id="content">
        <Plan city={city} setCity={setCity} date={date} setDate={setDate} days={days} setDays={setDays}/>
      </div>
      <div className="d-flex flex-column align-items-center">
        <Button onClick={saveDay}>Save Journey</Button>
      </div>
    </div>
  )
}

export default User;