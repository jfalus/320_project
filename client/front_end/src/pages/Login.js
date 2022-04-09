import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../images/ukglogo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const clickLogin = (e) => {
    
    e.preventDefault();
    fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password })
    }).then(res =>{
      if(res.redirected){
        window.location.href = res.url;
      }
    })
    
      // .then((data) => {
      //   if(data.url.substring(data.url.length-4) === "home"){
      //     navigate("/home", { replace: true })
      //   }
      // });
  }

  return (
    <div>
      <div className="background-image">
        <main className="login-center-container">
          <div className="login-container">
            <div className="logo-container">
              {<img className="ukglogo" src={logo} alt="UKG Logo" />}
            </div>
            <form className="login-form">
              <input
                className="inputForm"
                type="text"
                placeholder="Email"
                name="email"
                aria-label="email input for login"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <input
                className="inputForm"
                type="password"
                placeholder="Password"
                aria-label="password input for login"
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                id="login-button"
                onClick={clickLogin}
              >
                Log in
              </button>
              <a href="" id="reset-password">
                Reset Password?
              </a>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;