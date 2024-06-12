import { RouterProvider, createBrowserRouter } from "react-router-dom";
<<<<<<< HEAD:client/src/App.jsx
import Home from "./pages/Home";
import LoginSignupForm from "./pages/LoginSignupForm";
=======
import Home from "../pages/Home";
import Login from "../pages/Login";
>>>>>>> e112ad3e3ff8fae5f4cfc2ab4aa8cb56c091b890:client/src/renderer/App.jsx


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <LoginSignupForm />,
  },
]);
function App() {
  console.log("ere");
  
  return (
    <>
     
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
