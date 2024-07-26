import React from 'react';
import './Login.css';
import google_pic from '/google-icon.png';
import facebook_pic from '/facebook-icon.png';

const SSOLogin = () => {
  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Logging in with Google...');
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login
    console.log('Logging in with Facebook...');
  };

  return (
    <div className='SSOComponent'>
      <p>Đăng nhập với SSO</p>
      <button className='SSOButton google' onClick={() => handleGoogleLogin}>
        <div className='SSOButton-icon'>
          <img src={google_pic}></img>
        </div>
        <div className='SSOButton-text'>
          Tiếp tục với Google
        </div>
      </button>

      <button className='SSOButton facebook' onClick={handleFacebookLogin}>
        <div className='SSOButton-icon'>
          <img src={facebook_pic}></img>
        </div>
        <div className='SSOButton-text'>
          Tiếp tục với Facebook
        </div>
      </button>
    </div>
  );
};

export default SSOLogin;