import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import '../pages/Login.css'
import { createUser } from "../../fetchAPI";

function Login() {
 const [name , setName] = useState("");
 const [phoneNumber , setphoneNumber] = useState("");
 const [password , setpassword] = useState("");

const [isSignIn, setIsSignIn] = useState(true);

const handleSignUp = async (e) =>{
  const obj = {name , phoneNumber , password }
  try {
    const response = await createUser(obj)
    console.log(response);
    console.log(response.data);

  } catch (error) {
    console.log(error)
  }
}
const handleSignIn = async () =>{
  const obj = {name : 'Rushikesh' , phoneNumber :'9867038967' , password : '1122334455'}
  try {
    const response = await createUser(obj)
    console.log(response);
    console.log(response.data);
  } catch (error) {
    console.log(error)
  }
}
const handleToggleForm = () => {
     setIsSignIn(!isSignIn);
  };
  return (
    <>
    {isSignIn ? (<>
     
        <div className="relative flex justify-center items-center h-screen">
        <img className="absolute top-0 left-0 w-full h-full object-cover" src="/bg1.jpg" alt="" />

      <div className="ring">
        <i style={{ '--clr': '#00ff0a' }}></i>
        <i style={{ '--clr': '#ff0057' }}></i>
        <i style={{ '--clr': '#fffd44' }}></i>
        <form onSubmit={handleSignIn}>
        <div className="login">
          <h2>{isSignIn ? 'Login' : 'Signup'}</h2>
          <div className="inputBx">
            <input type="text" placeholder="Phone Number" />
          </div>
          <div className="inputBx">
            <input type="text" placeholder="Username" />
          </div>
          <div className="inputBx">
            <input type="password" placeholder="Password" />
          </div>
          <div className="inputBx">
            <button type="submit">Sign in</button>
          </div>
          <div className="links">
            {isSignIn && <a href="#">Forget Password</a>}
            <a onClick={handleToggleForm} href="#">{isSignIn ? 'Sign up' : 'Sign in'}</a>
          </div>
        </div>
        </form>
      </div>
    </div>

    </>) : (<>
        <div className="relative flex justify-center items-center h-screen">
      <img className="absolute top-0 left-0 w-full h-full object-cover" src="/bg1.jpg" alt="" />
      <div className="ring">
        <i style={{ '--clr': '#00ff0a' }}></i>
        <i style={{ '--clr': '#ff0057' }}></i>
        <i style={{ '--clr': '#fffd44' }}></i>
        
        <form onSubmit={handleSignUp}>
        <div className="login">
          <h2>{isSignIn ? 'Login' : 'Signup'}</h2>
          <div className="inputBx">
            <input type="number" placeholder="Phone Number" name="PhoneNumber" onChange={(e)=>setphoneNumber(e.target.value)} />
          </div>
          <div className="inputBx">
            <input type="text" placeholder="Username" name="Name" onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="inputBx">
            <input type="password" placeholder="Password " name="Password" onChange={(e)=>setpassword(e.target.value)} />
          </div> 
          <div className="inputBx">
            <button type="submit"  >Sign up</button>
          </div>
          <div className="links">
            {/* {isSignIn && <a href="#">Forget Password</a>} */}
            <a onClick={handleToggleForm} href="#">{isSignIn ? 'Sign up' : 'Sign in'}</a>
          </div>
        </div>
        </form>
      </div>
    </div>
    </>)}
    
    </>
  )
}

export default Login
