// function Login() {
//     let navigate = useNavigate();
//     return (
//         <div>This is the Login Page!
//             <button onClick={() => { navigate("/home"); }}>
//                 {" "} Sign in
//             </button>
//         </div>
//     );
// }

// export default Login;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../images/ukglogo.png";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = React.useState({ error: false, message: "" });

  const clickLogin = (e) => {

    e.preventDefault();

    fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password })
    })
      .then(res => {
        if (res.redirected) {
          window.location.href = res.url;
        }
        return res;
      })
      .then(res => res.text())
      .then(data => { console.log(data) 
        setErrorMessage({error: true, message: data}); })
   
    setPassword("");
  }

  return (
    <div>
      <div className="background-image">
        <main className="login-center-container">
          <div className="login-container">
            <div className="logo-container">
              {<img className="ukglogo" src={logo} alt="UKG Logo" />}
            </div>
            <p id='err-msg'>{errorMessage.error ? errorMessage.message : ""}</p>
            <form className="login-form">
              <input
                className="inputForm"
                type="text"
                placeholder="Email"
                name="email"
                aria-label="email input for login"
              />
              <input
                className="inputForm"
                type="password"
                placeholder="Password"
                aria-label="password input for login"
                id="password"
                name="password"
              />
              <button
                id="login-button"
                onClick={() => {
                  navigate("/home");
                }}
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
