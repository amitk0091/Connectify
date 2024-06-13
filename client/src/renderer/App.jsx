import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LoginSignupForm from "../pages/LoginSignupForm";
import { useSelector } from "react-redux";


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
  const theme = useSelector((state) => state.theme);

  
  return (
    <>
     
      <div className={`${theme === 'light' ? '#fceff0' : '#111827'}flex-grow`}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
