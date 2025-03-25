import React, { useState, useEffect } from 'react';
import './Gift';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword'

const LoginSignup = () => {

  const navigate = useNavigate(); // Hook to navigate
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [redirect, setRedirect] = useState(""); // Store the type of redirection (empty, login, or home)
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Handle redirection after successful login or signup
  useEffect(() => {
    if (redirect === "home") {
      window.location.replace("/"); // Redirect to homepage after login
    } else if (redirect === "login") {
      setState("Login"); // Switch to login page after signup
    }
  }, [redirect]);

  const login = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    if (!isChecked) {
      alert("Please agree to the terms of use & privacy policy");
      return; // Stop further execution if checkbox is not checked
    }

    console.log("Login Function Executed", formData);
    try {
      let response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      let responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        setFormData({  email: "", password: "" });
        setRedirect("home"); // Trigger redirect to homepage after login
      } else {
        alert(responseData.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      alert("There was an error, please try again later.");
    }
  }; 

  const signup = async () => {
    if (!formData.email || !formData.password || !formData.username) {
      alert("Please fill in all fields");
      return;
    }
    if (!isChecked) {
      alert("Please agree to the terms of use & privacy policy");
      return; // Stop further execution if checkbox is not checked
    }
    console.log("Signup Function Executed", formData);
    try {
      let response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: {
          'accept': 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.username, // Send 'name' field instead of 'username'
          email: formData.email,
          password: formData.password
        }),
      });

      let responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        setFormData({ username: "", email: "", password: "" });
        setShowVerificationModal(true); // Trigger redirect to login page after signup
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
      alert("There was an error, please try again later.");
    }
  };
  const verifyCode = async () => {
    if (!formData.verificationCode) {
      alert("Please enter the verification code");
      return;
    }
    try {
      let response = await fetch('http://localhost:4000/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: formData.verificationCode
        }),
      });

      let responseData = await response.json();

      if (responseData.success) {
        setShowVerificationModal(false); // Close the modal
        setRedirect("login"); // Redirect to the login page after verification
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error occurred during verification:", error);
      alert("There was an error, please try again later.");
    }
    
  };
  return (
    
    <div className='loginsignup'>
      <button className='Backbutton' onClick={() => navigate('/')}>Back</button>
      <div className={`loginsignup-container ${state === "ForgotPassword" ? "forgot-password" : ""}`}>

      {state === "ForgotPassword" ? (
          <>
            <ForgotPassword />  {/* Render ForgotPassword Component */}
            <p className="loginsignup-login">
              Remembered your password? <span onClick={() => setState("Login")}>Login here</span>
            </p>
          </>
        ) : (
          <>
        <h1>{state}</h1>
        <form>
          <div className="loginsignup-fields">
            
            {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />}
            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
          </div>
          {state === "Login" && <p className="loginsignup-forgot"><span onClick={() => { setState("ForgotPassword"); }}>Forgot Password?</span></p>}
          <button type="button" onClick={(e) => { e.preventDefault(); state === "Login" ? login() : signup(); }}>Continue</button>
        </form>

        {state === "Sign Up" ?
          <p className="loginsignup-login">Already have an account?<span onClick={() => { setState("Login"); }}>Login here</span></p> :
          <p className="loginsignup-login">Create an account?<span onClick={() => setState("Sign Up")}>Click here</span></p>
        }

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' checked={isChecked} onChange={handleCheckboxChange}/>
          <p>By Continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {showVerificationModal && (
          <div className="verification-modal">
            <h2>Enter Verification Code</h2>
            <input 
              name="verificationCode" 
              value={formData.verificationCode} 
              onChange={changeHandler} 
              type="text" 
              placeholder="Enter Code" 
            />
            <button type="button" onClick={verifyCode}>Verify</button>
          </div>
          )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
