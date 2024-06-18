import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserProvider } from "../context/context";
import Protected from "./Protected";

function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <>
      <div className={`${theme === 'light' ? '#fceff0' : '#111827'}flex-grow`}>
        <UserProvider>
          <Router>
            <Routes>
              <Route>
                <Route path="/home" element={<Protected component={"Home"}/>} />
                <Route path="/signin" element={<Protected component={"LoginSignupForm"}/>} />
                <Route path="/*" element={<Protected />} />
              </Route>
            </Routes>
          </Router>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
