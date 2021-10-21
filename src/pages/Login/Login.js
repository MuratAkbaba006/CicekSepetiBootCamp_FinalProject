import React, { useEffect } from 'react'
import styled from 'styled-components'
import image from '../../assets/Auth/Image.png'
import AuthForm from '../../components/AuthForm/AuthForm'
import logo from '../../assets/Auth/Logo.svg'
import { Container,ImageArea,FormArea } from './ScLogin'
import Cookie from 'js-cookie'
import { useSelector,useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import {v4 as uuid} from 'uuid';
import { addNotification } from '../../actions/Notification'
const Login = () => {
  const access = useSelector((state) => state.auth.auth_token)
  const {auth_token} = Cookie.get();
  const status = useSelector((state) => state.auth.status)
  const dispatch = useDispatch();


  //if(status === 'loading') return <Loading/>
  if (access || auth_token) return <Redirect to="/"/>
  return (
    <Container>
      <ImageArea>
        <img src={image} alt="" />
      </ImageArea>
      <FormArea>
        <img src={logo}></img>
        <AuthForm title="Giriş Yap"/>
      </FormArea>
    </Container>
  )
}

export default Login




