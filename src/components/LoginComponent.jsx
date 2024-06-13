

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/user/login";
import LinkedinLogo from "../assets/linkedinLogo.png";
import "../css/LoginComponent.css";
import { UseAuthContext } from "../helpers/AuthContext";

const LoginComponent = () => {

  const {setLoginToken, darkmode ,toggleDarkMode} =UseAuthContext();
  const navigate = useNavigate();
 
  const [form] = Form.useForm(); 

  const onFinish = async (values) => {
    const { email, password } = values;
    const body = JSON.stringify({
      email,
      password,
      appType: "linkedin",
    });
 
    const res = await getUsers(body);

    if (res.status === 200) { 
      message.success("Signed In to LinkedIn!");
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setLoginToken(true);
      localStorage.setItem("user", JSON.stringify(res.data.data.user.name));
      navigate("/");
      form.resetFields(); 
    } else {
      message.error("Incorrect Email or Password");
    }
  };

 

  return (
    <div className="login-wrapper" 
     style={{ backgroundColor: darkmode ? 'black' : '' ,
     color : darkmode ? 'white' :  ''}}>
      <div className="login-container"  style={{ backgroundColor: darkmode ? 'black' : '' }}>
        <img src={LinkedinLogo} className="linkedinLogo" alt="LinkedIn Logo" />
        <div className="login-wrapper-inner">
          <h1 className="head" style ={{color : darkmode ? 'white' : ''}}>Sign in</h1>
          <p className="sub-heading">Stay updated on your professional world</p>
          <div className="auth-inputs">
          <Form form={form} name="login" onFinish={onFinish} initialValues={{ remember: true }}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid email address!" },
              ]}
            >
              <Input
            
                placeholder="Email "
             
                className={darkmode ? "input-dark-mode " : "common-input"}
              />
            </Form.Item>
            <Form.Item
            
              name="password"
              rules={[{ required: true, message: "Please input your Password!" },
                     { min: 6, message: "Password must be at least 6 characters!" },
            ]}
            >
              <Input
                
                placeholder="Password"
                // className="common-input"
                className={darkmode ? "input-dark-mode " : "common-input"}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-btn">
                Sign in
              </Button>
            </Form.Item>
          </Form>
          </div>
        </div>
      </div>

      <hr className="hr-text" data-content="or"   style={{ backgroundColor: darkmode ? 'black' : '',color : darkmode ? 'white': '' }}/>

      <div className="google-btn-container"  style={{ backgroundColor: darkmode ? 'black' : '' }}>
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
        <Switch   className = 'themebtn' style={{ color: darkmode ? 'black' : '' }} onClick={toggleDarkMode} />
      </div>
    </div>
  );
};

export default LoginComponent;
