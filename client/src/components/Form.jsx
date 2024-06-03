import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSignup, handleSignin, handleGoogleSignin, handleGithubSignin, handleforgetPassword } from '../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const email = useRef();
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const jsonData = Object.fromEntries(formdata.entries());
    const { auth, error } = await handleSignup(jsonData);
    if (auth.length > 0) {
      navigate('/unitwise/authtoken', { state: { auth: auth } });
    } else {
      toast.error(error);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const jsonData = Object.fromEntries(formdata.entries());
    const { auth, error } = await handleSignin(jsonData);
    if (auth.length > 0) {
      navigate('/unitwise/authtoken', { state: { auth: auth } });
    } else {
      toast.error(error);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    const { auth, error } = await handleGoogleSignin();
    if (auth.length > 0) {
      navigate('/unitwise/authtoken', { state: { auth: auth } });
    } else {
      toast.error(error);
    }
  };

  const handleGithub = async (e) => {
    e.preventDefault();
    const { auth, error } = await handleGithubSignin();
    if (auth.length > 0) {
      navigate('/unitwise/authtoken', { state: { auth: auth } });
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
    <video  className="absolute w-full h-full object-cover" src="/video1.mp4" autoPlay loop muted></video>
    <div className="relative z-10 w-full max-w-md p-8  rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <img className="w-32 h-32" src="/Logo.png" alt="Connectify" />
        {/* <span className="mt-2 text-3xl font-bold text-white">Connectify</span> */}
      </div>
      {isSignIn ? (
        <form id="signin" onSubmit={handleSubmit2}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input ref={email} id="email" name="email" type="email" required className="w-full px-3 py-2 mt-1 text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input name="password" type="password" required className="w-full px-3 py-2 mt-1 text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" />
              <div className="mt-2 text-sm text-right text-white cursor-pointer hover:text-blue-300" onClick={() => handleforgetPassword(email.current.value)}>Forgot your password?</div>
            </div>
            <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-800 rounded-md hover:bg-blue-600">Sign in</button>
            <div className="flex items-center justify-center mt-4 space-x-2 text-white">
              <span>Or sign in with</span>
            </div>
            <div className="flex space-x-2">
              <button type="button" onClick={handleGoogle} className="flex items-center justify-center w-full py-2 text-white border border-white rounded-md hover:bg-white hover:text-gray-900">
                <img className="w-5 h-5 mr-2" src="/google.png" alt="Google" /> Google
              </button>
              <button type="button" onClick={handleGithub} className="flex items-center justify-center w-full py-2 text-white border border-white rounded-md hover:bg-white hover:text-gray-900">
                <img className="w-5 h-5 mr-2" src="/github.png" alt="Github" /> Github
              </button>
            </div>
            <div className="mt-4 text-sm text-center text-white cursor-pointer hover:text-blue-300" onClick={handleToggleForm}>
              Don't have an account? Sign up
            </div>
          </div>
        </form>
      ) : (
        <form id="signup" onSubmit={handleSubmit1}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input id="email" name="email" type="email" required className="w-full px-3 py-2 mt-1 text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input name="password" type="password" required className="w-full px-3 py-2 mt-1 text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" />
            </div>
            <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-800 rounded-md hover:bg-blue-600">Sign up</button>
            <div className="flex items-center justify-center mt-4 space-x-2 text-white">
              <span>Or sign up with</span>
            </div>
            <div className="flex space-x-2">
              <button type="button" onClick={handleGoogle} className="flex items-center justify-center w-full py-2 text-white border border-white rounded-md hover:bg-white hover:text-gray-900">
                <img className="w-5 h-5 mr-2" src="/google.png" alt="Google" /> Google
              </button>
              <button type="button" onClick={handleGithub} className="flex items-center justify-center w-full py-2 text-white border border-white rounded-md hover:bg-white hover:text-gray-900">
                <img className="w-5 h-5 mr-2" src="/github.png" alt="Github" /> Github
              </button>
            </div>
            <div className="mt-4 text-sm text-center text-white cursor-pointer hover:text-blue-300" onClick={handleToggleForm}>
              Already have an account? Sign in
            </div>
          </div>
        </form>
      )}
      <ToastContainer toastStyle={{ backgroundColor: 'black' }} />
    </div>
  </div>
  );
};

export default Form;
