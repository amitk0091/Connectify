import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/context'
import LoginSignupForm from '../pages/LoginSignupForm'
import Home from '../pages/Home'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

function Protected({ component }) {
    const loggedIn = localStorage.getItem("ConnectifyLoggedIn");
    const token = Cookies.get('token');
    const navigate = useNavigate();
    if (component === "LoginSignupForm") {
        Cookies.remove('token');
        localStorage.removeItem("ConnectifyLoggedIn");
        localStorage.removeItem("ConnectifyUser");
    }
    // console.log(token);
    if (component === "Home") {
        if (loggedIn===null || token===undefined || token === null) {
            Cookies.remove('token');
            localStorage.removeItem("ConnectifyLoggedIn");
            localStorage.removeItem("ConnectifyUser");
            window.location.href = "/signin"
        }
    }
    return (
        (component === "LoginSignupForm" ? <LoginSignupForm /> : <Home />)
    )
}

export default Protected;