import React, { useState } from "react";
import "../Login/Login.css";
import Logo from "../Login/Logo";
import { Link } from 'react-router-dom';
import RegisterForm from "./RegisterForm";
import SSOLogin from "../Login/SSOLogin";


const Register = () => {
  return (
    <div className="container">
      <Logo></Logo>
      <div className="login-card">
        <div className="row">
          <h1 className="w-100 text-center">Đăng ký tài khoản</h1>
          <p className="w-100 text-center">
            Bạn đã có tài khoản? <Link className="custom-link" to="/Login">Đăng nhập</Link>
          </p>
        </div>
        <br />
        <div className="row">
          <RegisterForm></RegisterForm>
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

export default Register;
