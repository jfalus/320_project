
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
    let navigate = useNavigate();
    return (
        <div>
            <div className='background-image'>
                <main className='login-center-container'>
                    <div className='login-container'>
                        <div className='logo-container'>
                            {<img className='ukglogo' src={logo} alt='UKG Logo' />}
                        </div>
                        <form className='login-form'>
                            <input
                                className='inputForm'
                                type='text'
                                placeholder='Email'
                                name='email'
                                aria-label='email input for login'
                            />
                            <input
                                className='inputForm'
                                type='password'
                                placeholder='Password'

                                aria-label='password input for login'
                                id='password'
                                name='password'
                            />
                            <button id="login-button" onClick={() => { navigate("/home"); }}>
                                Log in
                            </button>
                            <a href='' id='reset-password'>Reset Password?</a>
                        </form>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default Login;