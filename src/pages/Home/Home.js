import React, { useEffect} from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Banner from '../../components/Banner/Banner'
import CategoryArea from '../../components/CategoryArea/CategoryArea'
import Header from '../../components/Header/Header'
import ProductList from '../../components/ProductList/ProductList'
import { useDispatch } from 'react-redux'
import { addNotification } from '../../actions/Notification'
import {ClearStatusCode} from '../../actions/Auth';
import {v4 as uuid} from 'uuid';
const Home = () => {
  const statusCode = useSelector((state) => state.auth.statusCode)
  const dispatch = useDispatch();
useEffect(() => {
  if(statusCode.code === 201 )
  {
    if(statusCode.url === '/signin')
    {

      dispatch(addNotification({id:uuid(),type:'SUCCESS',message:'Giriş işlemi başarılı'}))
    }
    else{
      dispatch(addNotification({id:uuid(),type:'SUCCESS',message:'Kayıt işlemi başarılı'}))
    }
  }
  return ()=>{
    dispatch(ClearStatusCode());
  }
},[])
  return (
    <HomeContainer>
      <Header/>
      <Banner/>
      <CategoryArea/>
      <ProductList/>
    </HomeContainer>
  )
}

export default React.memo(Home)

const HomeContainer = styled.div`
background-color: #F2F2F2;
display: flex;
flex-direction: column;
width: 100%;
height: 100vh;
align-items: center;
`

