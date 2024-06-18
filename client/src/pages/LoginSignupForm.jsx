import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Form.css";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaLinkedin,
} from "react-icons/fa";
import { createUser, loginUser } from "../../fetchAPI";
import { UserContext } from "../context/context";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({username, email, password})
      localStorage.setItem("ConnectifyLoggedIn", true);
      localStorage.setItem("ConnectifyUser", JSON.stringify(response.user));
      navigate('/home');
    } catch (error) {
      console.log(error);
    }    
  };

  return (
    <form onSubmit={handleSignup} className="sign-up-form">
      <h2 className="title">Sign up</h2>
      <div className="input-field flex items-center  rounded-full p-2 mb-4">
        <FaUser className="text-gray-400 mx-2" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e=> setUsername(e.target.value)}
          className="bg-transparent text-white outline-none flex-1 px-2"
          required
        />
      </div>
      <div className="input-field flex items-center  rounded-full p-2 mb-4">
        <FaEnvelope className="text-gray-400 mx-2" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-transparent text-white outline-none flex-1 px-2"
          required
        />
      </div>
      <div className="input-field flex items-center  rounded-full p-2 mb-4">
        <FaLock className="text-gray-400 mx-2" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=> setPassword(e.target.value)}
          className="bg-transparent text-white outline-none flex-1 px-2"
          required
        />
      </div>

      <button type="submit" className="btn" >Signup</button>
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
        <a href="#" className="social-icon">
          <FaFacebook />
        </a>
        <a href="#" className="social-icon">
          <FaTwitter />
        </a>
        <a href="#" className="social-icon">
          <FaGoogle />
        </a>
        <a href="#" className="social-icon">
          <FaLinkedin />
        </a>
      </div>
    </form>
  )
}

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({user_email : userEmail, password})
      localStorage.setItem("ConnectifyLoggedIn", true);
      localStorage.setItem("ConnectifyUser", JSON.stringify(response.user));
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSignin} className="sign-in-form">
      <h2 className="title">Sign in</h2>
      <div className="input-field flex items-center rounded-full p-2">
        <FaUser className="text-gray-400 mx-2" />
        <input
          type="text"
          placeholder="Username"
          value={userEmail}
          onChange={e=>setUserEmail(e.target.value)}
          className="bg-transparent text-white outline-none flex-1 px-2"
        />
      </div>
      <div className="input-field flex items-center rounded-full p-2">
        <FaLock className="text-gray-400 mx-2" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          className="bg-transparent text-white outline-none flex-1 px-2"
        />
      </div>
      <button type="submit" className="btn solid" >Login</button>
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        <a href="#" className="social-icon">
          <FaFacebook />
        </a>
        <a href="#" className="social-icon">
          <FaTwitter />
        </a>
        <a href="#" className="social-icon">
          <FaGoogle />
        </a>
        <a href="#" className="social-icon">
          <FaLinkedin />
        </a>
      </div>
    </form>
  )
}



const LoginSignupForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      if (isSignUp) {
        container.classList.add("sign-up-mode");
      } else {
        container.classList.remove("sign-up-mode");
      }
    }
  }, [isSignUp]);


  return (
    <div className="container" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
          {isSignUp ? <Signup /> : <Login />}
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content mt-32 ">
            <h3>New here ?</h3>
            <p className="m-3">
              Connect with friends, family, and colleagues like never before. Our chat app makes it easy to stay in touch, no matter where you are. Sign up now to start messaging instantly!
            </p>
            <button className="btn transparent" onClick={e => setIsSignUp(true)}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content mt-32">
            <h3>One of us ?</h3>
            <p className="m-3">
              Connect with friends, family, and colleagues like never before. Our chat app makes it easy to stay in touch, no matter where you are. Sign up now to start messaging instantly!
            </p>
            <button className="btn transparent" onClick={e => setIsSignUp(false)}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
