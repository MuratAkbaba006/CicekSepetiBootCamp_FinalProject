import React from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { HeaderContainer, ButtonContainer, AddProductTitle } from './ScHeader';
import logo from '../../assets/Home/logo.svg';
import plus from '../../assets/Home/plus.svg';
import profile from '../../assets/Home/ProfileIcon.svg';

const Header = () => {
  const history = useHistory();
  const { auth_token } = Cookies.get();
  const access = useSelector((state) => state.auth.auth_token);
  return (
    <HeaderContainer>
      <img src={logo} alt="logo" onClick={() => history.push('/')} />
      <div>
        {auth_token !== undefined || access !== null ? (
          <>
            <ButtonContainer onClick={() => history.push('/upload_product')}>
              <img src={plus} alt="icon" />
              <AddProductTitle>ÜrünEkle</AddProductTitle>
            </ButtonContainer>
            <ButtonContainer onClick={() => history.push('/profile')}>
              <img src={profile} alt="icon" />
              <p>Hesabım</p>
            </ButtonContainer>
          </>
        ) : (
          <ButtonContainer onClick={() => history.push('/login')}>
            <img src={profile} alt="profile_icon" />
            <p>GirişYap</p>
          </ButtonContainer>
        )}
      </div>
    </HeaderContainer>
  );
};

export default React.memo(Header);
