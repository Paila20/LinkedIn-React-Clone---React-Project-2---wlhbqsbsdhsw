// import React, { useState } from "react";
// import LinkedinLogo from "../assets/linkedinLogo.png";
// import { useNavigate } from "react-router-dom";
// import "../Sass/LoginComponent.scss";
// import { toast } from "react-toastify";
// import { getUsers } from "../utils/user/login";

// export default function LoginComponent() {
//   let navigate = useNavigate();
//   const [credentails, setCredentials] = useState({ email: "", password: "" });

//   const login = async () => {
//     const body = JSON.stringify({
//       email: credentails["email"],
//       password: credentails["password"],
//       appType: "linkedin",
//     });
//     const res = await getUsers(body);
//     if (res.status === 200) {
//       toast.success("Signed In to Linkedin!");
//       localStorage.setItem("userData", JSON.stringify(res.data));
//       localStorage.setItem("token", JSON.stringify(res.data.token));
//       localStorage.setItem("user", JSON.stringify(res.data.data.name));
//       navigate("/");
//     } else {
//       toast.error("Incorrect EmailId or Password");
//       setCredentials({ email: "", password: "" });
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <img src={LinkedinLogo} className="linkedinLogo" />

//       <div className="login-wrapper-inner">
//         <h1 className="heading">Sign in</h1>
//         <p className="sub-heading">Stay updated on your professional world</p>

//         <div className="auth-inputs">
//           <input
//             onChange={(event) =>
//               setCredentials({ ...credentails, email: event.target.value })
//             }
//             value={credentails.email}
//             type="email"
//             className="common-input"
//             placeholder="Email or Phone"
//           />
//           <input
//             onChange={(event) =>
//               setCredentials({ ...credentails, password: event.target.value })
//             }
//             value={credentails.password}
//             type="password"
//             className="common-input"
//             placeholder="Password"
//           />
//         </div>

//         <button onClick={login} className="login-btn">
//           Sign in
//         </button>
//       </div>
//       <hr className="hr-text" data-content="or" />
//       <div className="google-btn-container">
//         <p className="go-to-signup">
//           New to LinkedIn?{" "}
//           <span className="join-now" onClick={() => navigate("/register")}>
//             Join now
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/user/login";
import LinkedinLogo from "../assets/linkedinLogo.png";
import "../Sass/LoginComponent.scss";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Initialize form instance

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
      localStorage.setItem("user", JSON.stringify(res.data.data.name));
      navigate("/");
      form.resetFields(); // Reset form fields
    } else {
      message.error("Incorrect Email or Password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src={LinkedinLogo} className="linkedin-logo" alt="LinkedIn Logo" />
        <div className="login-wrapper-inner">
          <h1 className="heading">Sign in</h1>
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
              
                placeholder="Email or Phone"
                className="common-input"
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
                className="common-input"
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
};

export default LoginComponent;
