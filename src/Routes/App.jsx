import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function App() {
  const { Navigate } = useNavigate;
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    if (Object.keys(userData).length > 0) {
      setAuthenticated(true);
      setCurrentUser(userData);
    } else {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {}, [currentUser]);

  return (
    <div>
      {console.log(authenticated)}
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomeLayout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfileLayout />} />
          <Route path="/connections" element={<ConnectionLayout />} />
        </Routes>
      </Router>
      {/* <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {authenticated !== false && (
            <Route path="/" element={<HomeLayout />} />
          )}
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfileLayout />} />
          <Route path="/connections" element={<ConnectionLayout />} />
        </Routes>
      </Router> */}
    </div>
  );
}
export default App;
