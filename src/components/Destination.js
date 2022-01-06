import React, { useState, useEffect } from "react";
import { Form, FloatingLabel, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const Destination = ({city, setCity, date, setDate}) =>{
  const [search, setSearch]= useState()
  const [cityList, setCityList]= useState()

  useEffect(()=>{
    if(city){
      setSearch(city.name);
    }
  },[])
  
  const citySearch = (e) => {
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    axios.get(cityUrl)
    .then(result => {
      setCityList(result.data)
    }).catch(e => {
      console.log(e);
    })
  }

  const citySetter = (e) => {
      setSearch("");
      setCityList("");
      setCity({name:cityList[e.target.value].name, country:cityList[e.target.value].country, state:cityList[e.target.value].state, coord:`lat=${cityList[e.target.value].lat}&lon=${cityList[e.target.value].lon}`})
  }

  const dateSetter = (e) => {
    const datum = e.target.value
    setDate(datum)
  }

  return (
      <Form className="d-flex flex-row text-primary justify-content-evenly pt-1" onSubmit={e => e.preventDefault()} >
        <div>
        <div>
        <FloatingLabel controlId="floatingSelectGrid" label="Search city" className="d-flex flex-row">
        <Form.Control className="text-primary border-primary" type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="City search" />
        <Button className="outline-primary" type="button" onClick={citySearch}>
          Find
        </Button>
        </FloatingLabel>
        </div>
        <div>
        {cityList?
        <FloatingLabel controlId="floatingSelectGrid" label="City">
          <Form.Select className="text-primary border-primary" aria-label="LocationSelector" onChange={citySetter} placeholder="City" open>
            <option key="default" value="" >Choose city</option>
            {cityList.map( (x, index) => <option key={index} value={index}>{x.name}, country: {x.country}</option>)}
          </Form.Select>
        </FloatingLabel>
        :""}
        </div>
        </div>
        <FloatingLabel className="text-primary" controlId="floatingSelectGrid" label="Date">
            <Form.Control className="text-primary border-primary" type="date" value={date} placeholder="Date" onChange={dateSetter} />
        </FloatingLabel>
      </Form>
  )
}

export default Destination