import React, { useState } from "react";
import InputComponent from "../Login/InputComponent";
import "../Login/Login.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import config from '../../../config'

const RegisterForm = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const handleEmailChange = (value) => {
        setEmail(value);
      };
    
      const handlePasswordChange = (value) => {
        setPassword(value);
      };

      const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
      }

      const handleNameChange = (value) => {
        setName(value);
      }
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const response = await axios.post(config.registerApi, {email,password,name,confirmPassword});
            localStorage.setItem("message", response.data.message);
            history.push("/Login");
        }
        catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message);
            }
            else{
                setErrorMessage("Hệ thống tạm thời bị gián đoạn!");
            }
        }
      };

    return(
        <div>
            <form onSubmit={handleSubmit} className="login-form">
              <label className="decoration-label">hoặc</label>
              <InputComponent
                classNamed="minput-class"
                label="Họ và tên"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
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
              <InputComponent
                classNamed="minput-class"
                label="Xác nhận mật khẩu"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <label className="text-danger" style={{ display: errorMessage ? 'block' : 'none' }}>{errorMessage}</label>
              <button type="submit">Đăng ký</button>
            </form>
          </div>
    );
}

export default RegisterForm