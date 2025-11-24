// src/components/LoginSignupPage.js

import React from 'react';
import LoginPage from '@react-login-page/page8';
import "../assets/css/style.css";

import {
  Logo,
  TitleLogin,
  TitleSignup,
  Footer,
  Username,
  Password,
  Submit,
} from '@react-login-page/page8';

const LoginSignupPage = () => {
  return (
    <LoginPage>
      <TitleLogin>Login</TitleLogin>
      <TitleSignup>Signup</TitleSignup>
      <Logo> </Logo>
      
      <Username panel="login" placeholder="Email or Username" />
      <Password panel="login" placeholder="Password" />
      <Submit panel="login">Login</Submit>
      <Username panel="signup" placeholder="E-mail" type="email" />
      <Password panel="signup" placeholder="Password" />
      <Password panel="signup" placeholder="Confirm Password" />
      <Footer>
        Bạn quên mật khẩu? <a href="/forgot-password"><u>Khôi phục ngay</u></a>
      </Footer>


    </LoginPage>
  );
};

export default LoginSignupPage;
