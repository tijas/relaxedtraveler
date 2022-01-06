import React from "react";
import { Button } from 'react-bootstrap';
import { useAuth } from "../context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;