import React, { useState, useEffect, useRef } from "react";
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

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
          {!isSignUp ? (
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field flex items-center rounded-full p-2">
                <FaUser className="text-gray-400 mx-2" />
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-transparent text-white outline-none flex-1 px-2"
                />
              </div>
              <div className="input-field flex items-center rounded-full p-2">
                <FaLock className="text-gray-400 mx-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent text-white outline-none flex-1 px-2"
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
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
          ) : (
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field flex items-center  rounded-full p-2 mb-4">
                <FaUser className="text-gray-400 mx-2" />
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-transparent text-white outline-none flex-1 px-2"
                />
              </div>
              <div className="input-field flex items-center  rounded-full p-2 mb-4">
                <FaEnvelope className="text-gray-400 mx-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent text-white outline-none flex-1 px-2"
                />
              </div>
              <div className="input-field flex items-center  rounded-full p-2 mb-4">
                <FaLock className="text-gray-400 mx-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent text-white outline-none flex-1 px-2"
                />
              </div>

              <input type="submit" className="btn" value="Sign up" />
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
          )}
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content mt-32 ">
            <h3>New here ?</h3>
            <p className="m-3">
            Connect with friends, family, and colleagues like never before. Our chat app makes it easy to stay in touch, no matter where you are. Sign up now to start messaging instantly!
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
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
            <button className="btn transparent" onClick={handleSignInClick}>
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
