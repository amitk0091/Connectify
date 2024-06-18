import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/context'
import LoginSignupForm from '../pages/LoginSignupForm'
import Home from '../pages/Home'
import { useNavigate } from 'react-router-dom';

function Protected({ component}) {
    const  loggedIn = localStorage.getItem("ConnectifyLoggedIn");
    const navigate = useNavigate();
    useEffect(()=>{
       if(!loggedIn || !component ) navigate('/signin');
       else navigate('/home');
    },[])
    return (
        (component ==="LoginSignupForm" && !loggedIn ? <LoginSignupForm /> : <Home/>)
    )
}

export default Protected;