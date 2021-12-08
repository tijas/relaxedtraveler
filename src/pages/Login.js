import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import { useAuth } from "../context/auth";

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  console.log("login uslocaton", useLocation());
  const { state } = useLocation()
  const referer = (state) ? state.pathname : '/';

  function postLogin() {
    axios.post("http://localhost:3001/login", {
      "email": eMail,
      "password": password
    }).then(result => {
      console.log(result);
      if (result.status === 200) {
        console.log(result.data);
        setAuthTokens(result.data.accessToken);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Navigate to={referer} />;
  }

  return (
    <div className="container d-flex flex-column align-items-center border border-secondary rounded m-l-5 sign-form">
      <div className="display-2 m-3">Sign In</div>
        <Form className="d-flex flex-column align-items-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={eMail} onChange={e => {setEMail(e.target.value)}} placeholder="Email" />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => {setPassword(e.target.value);}} placeholder="Password" />
          </Form.Group>
          <Button onClick={postLogin}>Sign In</Button>
        </Form>

        <Link to="/signup">Don't have an account?</Link>
        { isError &&<div className="bg-danger rounded-3 m-2 p-2 text-dark h6">The username or password provided were incorrect!</div> }
      </div>
  );
}

export default Login;