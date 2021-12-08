import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/" element={<Home/>} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user"
                element={
                  <PrivateRoute>
                    <User />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
          <Footer/>
        </div>
        
      </Router>
    </AuthContext.Provider>
  );
}

export default App;