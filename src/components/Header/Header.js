import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import logo from '../../assets/Home/logo.svg'
import plus from '../../assets/Home/plus.svg'
import profile from '../../assets/Home/ProfileIcon.svg'
const Header = () => {
  const history = useHistory();
  return (
    <HeaderContainer>
      <img src={logo} alt="" onClick={() => history.push('/') } />
      <div>
        <ButtonContainer>
        <img src={plus}></img>
        <p>ÜrünEkle</p>
        </ButtonContainer>
        <ButtonContainer onClick={() => history.push('/profile')}>
          <img src={profile} alt="" />
          <p>Hesabım</p>
        </ButtonContainer>
      </div>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
width: 100%;
display: flex;
background-color: #FFFFFF;
justify-content: space-between;
padding: 12px;
align-items: center;
box-sizing: border-box;
img{
  display: flex;
  margin-left: 7%;
  cursor:pointer;
}
div{
  display: flex;
  flex-direction: row;
  margin-right: 7%;
}
`
const ButtonContainer = styled.div`
border-radius: 8px;
background-color: #F0F8FF;
font-size: 15px;
margin:5px;
padding: 10px;
justify-content: center;
align-items: center;
width: 100%;
cursor:pointer;
p{
  color:#4B9CE2;
font-size: 15px;
margin: 0 7px;
width: 100%;
}
`