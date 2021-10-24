import React from 'react';
import image from '../../assets/Auth/Image.png';
import AuthForm from '../../components/AuthForm/AuthForm';
import logo from '../../assets/Auth/Logo.svg';
import { Container, ImageArea, FormArea } from './ScLogin';
import Cookie from 'js-cookie';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const access = useSelector((state) => state.auth.auth_token);
  const { auth_token } = Cookie.get();

  if (access !== null || auth_token !== undefined) return <Redirect to="/" />;
  return (
    <Container>
      <ImageArea>
        <img src={image} alt="" />
      </ImageArea>
      <FormArea>
        <img src={logo} alt="logo"/>
        <AuthForm title="Giriş Yap" />
      </FormArea>
    </Container>
  );
};

export default Login;
