import React, { useState } from 'react';
import InputComponent from './InputComponent';
import SSOLogin from './SSOLogin';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <div className='login-card'>
        <div className='row'>
          <h1 className='w-100 text-center'>Đăng nhập</h1>
          <p className='w-100 text-center'>Bạn không có tài khoản? <a href='#'>Đăng ký</a></p>
        </div><br/>
        <div className='row'>
          <div className='col-6'>
          <form onSubmit={handleSubmit}>
            <InputComponent
              label="Email"
              value={username}
              onChange={handleUsernameChange}
            />
            <InputComponent
              label="Mật khẩu"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Login</button>
          </form>
          </div>
          <div className='col-6'>
            <SSOLogin></SSOLogin>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login