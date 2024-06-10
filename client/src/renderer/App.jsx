import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Login />,
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
