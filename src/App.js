import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import User from "./pages/User";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'

function App(props) {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className="d-flex flex-column vh-100">
          <Header />
          <div className="d-flex flex-row justify-content-center">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/user" component={User} />
          </div>
          <Footer/>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
/*<PrivateRoute path="/admin" component=<Private><Admin/></Private> />*/

export default App;