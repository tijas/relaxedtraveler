import React, { useState } from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import logoImg from "../img/logo.jpg";
import { Card, Logo, Form, Input, Button } from '../components/AuthForms';

function Signup(props) {
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const referer = '/user';

  function postSignup() {
    axios.post("http://localhost:3001/register", {
      "email": userName,
      "password": password
    }).then(result => {
      console.log(result, result.data);
      if (result.status === 201) {
        console.log(result, result.data);
        return <Redirect to={referer} />;
      } else {
        setIsError(true);
      }
    }).catch(e => {
      console.log(e);
      console.log(isError);
      setIsError(true);
    });
  }


  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
      <Input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="email"
        />
      <Input
        type="password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <Button onClick={postSignup}>Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;