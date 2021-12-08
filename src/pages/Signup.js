import React, { useState } from "react";
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

function Signup() {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [eMail, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const referer = '/login';

  function postSignup() {
    if(password===password2){
      setIsError(true);
      setError("Passwords do not match")
    }
    axios.post("http://localhost:3001/register", {
      "email": eMail,
      "password": password,
      "username": userName
    }).then(result => {
      if (result.status === 201) {
        return <Navigate to={referer} />;
      } else {
        setIsError(true);
        setError("Already registered!")
      }
    }).catch(e => {
      console.log("text from e", e)
      setIsError(true);
      setError("Something went wrong!")
    });
  }

  return (

    <div className="container d-flex flex-column align-items-center border border-secondary rounded m-l-5 sign-form">

      <div className="display-2 m-3">Register</div>

      <Form className="d-flex flex-column align-items-center">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={eMail} onChange={e => {setEmail(e.target.value)}} placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={userName} onChange={e => {setUserName(e.target.value)}} placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => {setPassword(e.target.value)}} placeholder="Enter password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Re-type Password</Form.Label>
        <Form.Control type="password" value={password2} onChange={e => {setPassword2(e.target.value)}} placeholder="Re-enter password" />
        </Form.Group>
        <Button onClick={postSignup}>Sign Up</Button>
      </Form>

      <Link to="/login">Already have an account?</Link>
      { isError &&<div className="bg-danger rounded-3 m-2 p-2 text-dark h6">{error}</div> }
    </div>
  );
}

export default Signup;