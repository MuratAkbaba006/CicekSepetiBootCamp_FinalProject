import Cookie from 'js-cookie';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import image from '../../assets/Auth/Image.avif';
import logo from '../../assets/Auth/Logo.svg';
import AuthForm from '../../components/AuthForm/AuthForm';
import { Container, ImageArea, FormArea } from '../Login/ScLogin';

const Register = () => {
  const access = useSelector((state) => state.auth.auth_token);
  const { auth_token } = Cookie.get();
  if (access || auth_token) return <Redirect to="/" />;
  return (
    <Container>
      <ImageArea>
        <img src={image} alt="" />
      </ImageArea>
      <FormArea>
        <img src={logo} alt="" />
        <AuthForm title="Üye Ol" />
      </FormArea>
    </Container>
  );
};

export default Register;
