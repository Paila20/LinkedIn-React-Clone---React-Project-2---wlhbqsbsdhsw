import React, { useState } from "react";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import { getUsers } from "../utils/user/login";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({ email: "", password: "" });

  const login = async () => {
    const body = JSON.stringify({
      email: credentails["email"],
      password: credentails["password"],
      appType: "linkedin",
    });
    console.log("Login");
    const res = await getUsers(body);
    console.log(res);
    if (res.status === 200) {
      toast.success("Signed In to Linkedin!");
      console.log(res);
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.data.name));
      navigate("/");
    } else {
      toast.error("Incorrect EmailId or Password");
      setCredentials({ email: "", password: "" });
    }
  };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            value={credentails.email}
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            value={credentails.password}
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>

        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}
