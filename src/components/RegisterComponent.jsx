// import React, { useState } from "react";
// import LinkedinLogo from "../assets/linkedinLogo.png";
// import { useNavigate } from "react-router-dom";
// import { getUniqueID } from "../helpers/getUniqueId";
// import { registerAPI } from "../utils/user/login";
// import "../Sass/LoginComponent.scss";
// import { toast } from "react-toastify";

// export default function RegisterComponent() {
//   let navigate = useNavigate();
//   const [credentails, setCredentials] = useState({ name: "", email: "", password: ""});
  
//   const register = async () => {
    
//       const body =JSON.stringify({
//         name: credentails["name"],
//         email: credentails["email"],
//         password: credentails["password"],
//         appType: "linkedin",
//       });
//       const res = await registerAPI(body);
//       if (res.status === 201) {
//         toast.success("Account Created!");
       
//         localStorage.setItem("token" ,JSON.stringify(res.data.token));
//         localStorage.setItem("user", JSON.stringify(res.data.user.name));
//         navigate("/");
//       }
//       else{
//         toast.error("Incorrect Emailid or password");
//         setCredentials({ name: "", email: "", password: "" });
//      }

   
//   };


//   return (
//     <div className="login-wrapper">
//       <img src={LinkedinLogo} className="linkedinLogo" />

//       <div className="login-wrapper-inner">
//         <h1 className="heading">Make the most of your professional life</h1>

//         <div className="auth-inputs">
//           <input
//             onChange={(event) =>
//               setCredentials({ ...credentails, name: event.target.value })
//             }
//             value={credentails.name}
//             type="text"
//             className="common-input"
//             placeholder="Your Name"
//           />
//           <input
//             onChange={(event) =>
//               setCredentials({ ...credentails, email: event.target.value })
//             }
//             value={credentails.email}
//             type="email"
//             className="common-input"
//             placeholder="Email or phone number"
//           />
//           <input
//             onChange={(event) =>
//               setCredentials({ ...credentails, password: event.target.value })
//             }
//             value={credentails.password}
//             type="password"
//             className="common-input"
//             placeholder="Password (6 or more characters)"
//           />
//         </div>
//         <button onClick={register} className="login-btn">
//           Agree & Join
//         </button>
//       </div>
//       <hr class="hr-text" data-content="or" />
//       <div className="google-btn-container">
//         <p className="go-to-signup">
//           Already on LinkedIn?{" "}
//           <span className="join-now" onClick={() => navigate("/login")}>
//             Sign in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Input, Button, message, Form } from "antd";
import { useNavigate } from "react-router-dom";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { registerAPI } from "../utils/user/login";
import "../Sass/LoginComponent.scss";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
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
        localStorage.setItem("user", JSON.stringify(res.data.user.name));
        navigate("/");
        form.resetFields();
      } else {
        message.error("Incorrect Email or password");
        form.resetFields();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
            <Input placeholder="Your Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email or phone number" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Password (6 or more characters)" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-btn"
              loading={loading}
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

