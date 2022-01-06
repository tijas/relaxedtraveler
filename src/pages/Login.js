import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import {Form, Button, FloatingLabel} from 'react-bootstrap';
import { useAuth } from "../context/auth";
import { useForm, Controller } from "react-hook-form";

function Login() {
  const { handleSubmit, control, formState: {errors} } = useForm()
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setErrors] = useState("");
  const { setAuthTokens } = useAuth();
  const { state } = useLocation()
  const referer = (state) ? state.pathname : '/';

  function postLogin(data) {
    axios.post("https://relaxedtravelerbackend.herokuapp.com/login", {
      "email": data.email,
      "password": data.password
    }).then(result => {
      if (result.status === 200) {
        console.log(result.data);
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
        setErrors("Login went wrong, please try again")
      }
    }).catch(e => {
      console.log(e.response);
      setIsError(true);
      if(e.response){
        setErrors(e.response.statusText)
      }else{
        setErrors("Database unavailable, try again later!")
      }
    });
  }

  if (isLoggedIn) {
    return <Navigate to={referer} />;
  }

  return (
    <div className="container d-flex flex-column align-items-center border border-secondary rounded m-l-5 sign-form">
      <div className="display-2 m-3">Sign In</div>
        <Form onSubmit={handleSubmit(postLogin)} className="d-flex flex-column align-items-center">
          
          <Form.Group controlId="formEmail">
            <Form.Text className="text-warning">
            {errors.email && <p>{errors.email.message}</p>} 
            </Form.Text>
              <FloatingLabel controlId="email" label="Email address" className="mb-3">
              <Controller control={control}
                name="email"                                            
                rules={{ required: "This field is required", pattern: { value: /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i, message: "Entered value does not match email format"}}}
                defaultValue=""                                                                        
                render={({ field: { onChange, value, ref } }) => (                             
                  <Form.Control onChange={onChange} value={value} ref={ref}                       
                  type="text"
                  isInvalid={errors.email}                                                          
                  placeholder="Email address" />)} />
              </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="formBasicPassword1">
            <Form.Text className="text-warning">
            {errors.password && <p>{errors.password.message}</p>} 
            </Form.Text>
            <FloatingLabel controlId="password1" label="Enter password" className="mb-3">
              <Controller control={control}
                name="password"
                rules={{ required: "This field is required" }}                                            
                defaultValue=""                                                                        
                render={({ field: { onChange, value, ref } }) => (                             
                  <Form.Control onChange={onChange} value={value} ref={ref}                            
                  type="password"
                  isInvalid={errors.password}                                                          
                  placeholder="Enter password" />)}
              />
            </FloatingLabel>
            <Controller control={control}                                                                
              render={({ field: { ref }, formState }) => (                                               
                <Button type="submit" disabled={formState.isSubmitting}                                  
                  className="btn mb-2 btn-primary">                                                          
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1" />}
                  Sign In                                                                                
                </Button>                                                                                
              )} />
          </Form.Group>

        </Form>

        <Link to="/signup">Don't have an account?</Link>
        { isError && <div className="bg-danger rounded-3 m-2 p-2 text-dark h6">{error}</div> }
      </div>
  );
}

export default Login;