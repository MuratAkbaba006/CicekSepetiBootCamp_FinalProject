import Cookie from 'js-cookie'
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import image from '../../assets/Auth/Image.png'
import logo from '../../assets/Auth/Logo.svg'
import AuthForm from '../../components/AuthForm/AuthForm'
import Loading from '../../components/Loading/Loading'
import { Container,ImageArea,FormArea } from '../Login/ScLogin'
import { ClearStatusCode } from '../../actions/Auth'
const Register = () => {
  const access = useSelector((state) => state.auth.auth_token);
  const {auth_token} = Cookie.get();
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  useEffect(() => {

    return () => {
      console.log('çalıştımmm');
      dispatch(ClearStatusCode());
    }
  })
  //if(status === 'loading') return <Loading/>
  if(access || auth_token) return <Redirect to="/"/>
  return (
    <Container>
      <ImageArea>
        <img src={image} alt="" />
      </ImageArea>
      <FormArea>
        <img src={logo} alt="" />
        <AuthForm title="Üye Ol"/>
      </FormArea>
    </Container>
  )
}

export default Register


