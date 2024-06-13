import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LoginSignupForm from "../pages/LoginSignupForm";
import Contacts from "../pages/Contacts";


const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <LoginSignupForm />,
  },
  {
    path: "/*",
    element: <LoginSignupForm />,
  },
  {
    path: "/*",
    element: <Contacts />,
  },
]);
function App() {
  
  return (
    <>
     
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
