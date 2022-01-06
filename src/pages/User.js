import React, { useState } from "react";
import Plan from "../components/Plan";
import './User.css'

const User = () => {
  const [city, setCity] = useState({name:"", coord:""});
  const [date, setDate] = useState();
  const [days, setDays] = useState([]);

  return (
    <div className="w-100 home-main">
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

export default User;