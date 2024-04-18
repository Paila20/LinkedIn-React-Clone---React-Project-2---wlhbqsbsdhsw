

import React, { useState } from "react";
import { Input, Button, message, Form } from "antd";
import { useNavigate } from "react-router-dom";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { registerAPI } from "../utils/user/login";
import "../css/LoginComponent.css";
import { UseAuthContext } from "../helpers/AuthContext";

export default function RegisterComponent() {

  const {setLoginToken} =UseAuthContext();
  let navigate = useNavigate();
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    
     
      const body = JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        appType: "linkedin",
      });
      const res = await registerAPI(body);
      if (res.status === 201) {
        message.success("Account Created!");
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setLoginToken(res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user.name));
        localStorage.setItem("userData", JSON.stringify(res.data));
        navigate("/login");
        form.resetFields();
      } else {
        message.error("User Already Exists");
        form.resetFields();
      }
    
  };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" alt="LinkedIn Logo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Your Name"   className="common-input"/>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email or phone number"  className="common-input" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Password (6 or more characters)"  className="common-input"/>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-btn"
             
            >
              Agree & Join
            </Button>
          </Form.Item>
        </Form>
      </div>
      <hr className="hr-text" data-content="or" />
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
