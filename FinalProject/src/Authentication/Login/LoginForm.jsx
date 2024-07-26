import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import InputComponent from "./InputComponent";
import "./Login.css";
import axios from 'axios';
import config from '../../../config'

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const histories = useHistory();

  useEffect(()=>{
    const message = localStorage.getItem("message");
    if(message){
        alert(message);
        localStorage.removeItem('message');
    }
  },[]);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try{
        const response = await axios.post(config.loginApi, {email, password});

        //save the auth token
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("authUser", JSON.stringify(response.data.data.user));

        histories.push('/home');
    }catch(error){
        if(error.response){
            setErrorMessage(error.response.data.message);
        }
        else{
            setErrorMessage("Hệ thống tạm thời bị gián đoạn!");
        }
    }
  };

  return (
          <div>
            <form onSubmit={handleSubmit} className="login-form">
              <label className="decoration-label">hoặc</label>
              <InputComponent
                classNamed="minput-class"
                label="Email"
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
              <InputComponent
                classNamed="minput-class"
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <label className="text-danger" style={{ display: errorMessage ? 'block' : 'none' }}>{errorMessage}</label>
              <div>
                <input type="checkbox" />
                <label style={{color: "rgba(0,0,0,0.6)"}}>Ghi nhớ tài khoản</label>
              </div>
              <button type="submit">Đăng nhập</button>
              <div>
                <a className="forgot-password-link" href="#">Bạn đã quên mật khẩu?</a>
              </div>
            </form>
          </div>
  );
};

export default LoginForm;
