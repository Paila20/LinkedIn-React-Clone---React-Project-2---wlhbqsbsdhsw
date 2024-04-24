import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Groups from "../components/common/Groups";
import ProfilePopup from "../components/common/ProfilePopup";
import { AuthContextProvider } from "../helpers/AuthContext";
import  Premium from "../components/common/Premium";
import GroupProfile from "../components/common/GroupProfile";
import Maintenance from "../helpers/Maintenance";
import { HomeComponent } from "../components/HomeComponent";
import RegisterComponent from "../components/RegisterComponent";
import LoginComponent from "../components/LoginComponent";
import ProfileCard from "../components/common/ProfileCard";


function App() {
  


 
 

  return (
    <div>
    <AuthContextProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/" element={<HomeComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route
            path="/profile/:id"

            element={<ProfileCard  />}
          />
           <Route path="/group" element={<Groups />} />
           <Route path="/trypremium" element={<Premium/>} />
           <Route path="/theme" element={<ProfilePopup />} />
           <Route path="/groupprofile/:id" element={<GroupProfile/>} />
           <Route path="/maintenance" element={<Maintenance />} />
        </Routes>
      </Router>
      </AuthContextProvider>
    </div>
  );
}
export default App;
