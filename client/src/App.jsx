import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import Home from "./pages/Home";
import Form from "./components/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Form/>,
  },
]);
function App() {
  return (
    <div className="flex-grow">
        <RouterProvider router={router} />
    </div>
  )
}

export default App

