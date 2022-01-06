import React, { useState } from "react";
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import {Form, Button, FloatingLabel} from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";

function Signup() {
  const { handleSubmit, control, formState: {errors}, getValues, register } = useForm()
  const [isError, setIsError] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [error, setErrors] = useState("");
  
  const postSignup = (data) => {
    console.log(data);
      axios.post("https://relaxedtravelerbackend.herokuapp.com/register", {
        "email": data.email,
        "password": data.password,
        "username": data.username,
    }).then(result => {
        if(result.status === 201){
          setIsError(true);
          setTimeout(()=>setSignedUp(true), 5000)
          setErrors("Thank you for signing Up! You will be redirected shortly to login")
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

  if (signedUp) {
    return <Navigate to='/login' />;
  }
  return (

    <div className="container d-flex flex-column align-items-center border border-secondary rounded m-l-5 sign-form">

      <div className="display-2 m-3">Register</div>

      <Form onSubmit={handleSubmit(postSignup)} className="d-flex flex-column align-items-center">
        
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

        <Form.Group controlId="formBasicName">
        <Form.Text className="text-warning">
        {errors.username && <p>{errors.username.message}</p>} 
        </Form.Text>
        <FloatingLabel controlId="username" label="Enter username" className="mb-3">
          <Form.Control
                {...register("username", { required: "Username is required", minLength: {value:3, message: "Username must be 3 char long!"}})}
                type="text"                            
                isInvalid={errors.username}                                                          
                placeholder="Enter user name" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="formBasicPassword1">
        <Form.Text className="text-warning">
        {errors.password && <p>{errors.password.message}</p>} 
        </Form.Text>
        <FloatingLabel controlId="password1" label="Enter password" className="mb-3">
          <Controller control={control}
            name="password"
            rules={{ required: "This field is required", validate: value => value === getValues('password2') || 'Passwords need to match' }}                                            
            defaultValue=""                                                                        
            render={({ field: { onChange, value, ref } }) => (                             
              <Form.Control onChange={onChange} value={value} ref={ref}                            
              type="password"
              isInvalid={errors.password}                                                          
              placeholder="Enter password" />)}
          />
          </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="formBasicPassword2">
        <Form.Text className="text-warning">
        {errors.password2 && <p>{errors.password2.message}</p>} 
        </Form.Text>
        <FloatingLabel controlId="password2" label="Re-Enter password" className="mb-3">
          <Controller control={control}
            name="password2"
            rules={{ required: "This field is required", validate: value => value === getValues('password') || 'Passwords need to match'  }}                                            
            defaultValue=""                                                                        
            render={({ field: { onChange, value, ref } }) => (                             
              <Form.Control onChange={onChange} value={value} ref={ref}                            
              type="password"
              isInvalid={errors.password}                                                          
              placeholder="Re-Enter password" />)}
          />
          </FloatingLabel>
        </Form.Group>

        <Controller control={control}                                                                
          render={({ field: { ref }, formState }) => (                                               
            <Button type="submit" disabled={formState.isSubmitting}                                  
               className="btn mb-2 btn-primary">                                                          
               {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1" />}
               Sign Up                                                                                 
            </Button>                                                                                
          )} />
      </Form>

      <Link to="/login">Already have an account?</Link>
      { isError && <div className="bg-danger rounded-3 m-2 p-2 text-dark h6">{error}</div> }
    </div>
  );
}

export default Signup;