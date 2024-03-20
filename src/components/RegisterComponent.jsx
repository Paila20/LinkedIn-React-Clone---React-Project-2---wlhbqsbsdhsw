import React, { useState } from "react";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import { registerAPI } from "../utils/user/login";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const register = async () => {
    try {
      const body =JSON.stringify({
        name: credentails["name"],
        email: credentails["email"],
        password: credentails["password"],
        appType: "linkedin",
      });
      const res = await registerAPI(body);
      console.log(register)
      if (res.status === success) {
        toast.success("Account Created!");
       
        localStorage.setItem("token" ,JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user.name));
        navigate("/");
      }

    else if(res.status === "fail" && res.message === "User already exists"){
      alert(res.message);
      setCredentials(credentails.name(""));
      setCredentials(credentails.email(""));
      setCredentials(credentails.password(""));

     }
    } catch (err) {
      console.log(err);
      
    }
  };


  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            value={credentails.name}
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            value={credentails.email}
            type="email"
            className="common-input"
            placeholder="Email or phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            value={credentails.password}
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn" >
          Agree & Join
        </button>
      </div>
      <hr class="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
