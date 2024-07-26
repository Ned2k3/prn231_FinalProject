import React, { useState } from "react";
import SSOLogin from "./SSOLogin";
import "./Login.css";
import Logo from "./Logo";
import { Link } from 'react-router-dom';
import LoginForm from "./LoginForm";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here using username and password
    console.log("Logging in with:", username, password);
  };

  return (
    <div className="container">
      <Logo></Logo>
      <div className="login-card">
        <div className="row">
          <h1 className="w-100 text-center">Đăng nhập</h1>
          <p className="w-100 text-center">
            Bạn không có tài khoản? <Link className="custom-link" to="/Register">Đăng ký</Link>
          </p>
        </div>
        <br />
        <div className="row">
          <LoginForm></LoginForm>
          <div>
            <SSOLogin></SSOLogin>
          </div>
        </div>

        <div className="row login-card-footer">
          <p>Đăng nhập để trải nghiệm dịch vụ siêu hấp dẫn của chúng tôi!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
