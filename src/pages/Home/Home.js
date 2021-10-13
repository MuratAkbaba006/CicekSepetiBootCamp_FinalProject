import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Banner from '../../components/Banner/Banner'
import CategoryArea from '../../components/CategoryArea/CategoryArea'
import Header from '../../components/Header/Header'
import ProductList from '../../components/ProductList/ProductList'
const Home = () => {
  const access = useSelector((state) => state.auth.auth_token)
  return (
    <HomeContainer>
      <Header/>
      <Banner/>
      <CategoryArea/>
      <ProductList/>
    </HomeContainer>
  )
}

export default Home

const HomeContainer = styled.div`
background-color: #F2F2F2;
display: flex;
flex-direction: column;
width: 100%;
height: 100vh;
align-items: center;
`

