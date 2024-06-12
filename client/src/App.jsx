import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignupForm from "./pages/LoginSignupForm";


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
  
  return (
    <>
     
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
