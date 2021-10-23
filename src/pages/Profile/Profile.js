import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import ProfileIcon from '../../assets/Profile/Group 6876.svg';
import Cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getGivenOffers, getReceivedOffers } from '../../actions/Account';
import {
  CategoryAreaContainer,
  Category,
} from '../../components/CategoryArea/ScCategoryArea';
import Offer from '../../components/Offer/Offer';
const Profile = () => {
  const [currentTitle, setCurrentTitle] = useState('Teklif Aldıklarım');
  const { auth_token } = Cookie.get();
  const { email } = jwt_decode(auth_token);
  const dispatch = useDispatch();
  const givenOffers = useSelector((state) => state.account.givenOffers);

  const receivedOffers = useSelector((state) => state.account.receivedOffers);

  const status = useSelector((state) => state.account.status);
  const titles = ['Teklif Aldıklarım', 'Teklif Verdiklerim'];
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getReceivedOffers());
    }
  }, [dispatch, status]);

  const handleTitleChange = (title) => {
    setCurrentTitle(title);
    if (title === 'Teklif Verdiklerim') {
      dispatch(getGivenOffers());
    }
  };

  console.log(status);
  console.log(receivedOffers);
  return (
    <ProfileContainer>
      <Header />
      <MailArea>
        <img src={ProfileIcon} alt="" />
        <p>{email}</p>
      </MailArea>
      <Content>
        <ContentTitleArea>
          {titles.map((title, index) => (
            <ContentTitle
              key={index}
              currentTitle={currentTitle}
              title={title}
              onClick={() => handleTitleChange(title)}
            >
              {title}
            </ContentTitle>
          ))}
        </ContentTitleArea>
        <OffersArea>
          {(currentTitle === 'Teklif Aldıklarım'
            ? receivedOffers
            : givenOffers
          ).map((offer) => (
            <Offer key={offer.id} name={currentTitle} offer={offer} />
          ))}
        </OffersArea>
      </Content>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
const MailArea = styled.div`
  width: 86%;
  display: flex;
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0 4px;
  p {
    font-size: 15px;
    font-weight: bold;
    color: #525252;
    margin-left: 8px;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 86%;
  background-color: #ffffff;
  margin-top: 10px;
`;
const ContentTitleArea = styled.div`
  width: 86%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #525252;
  box-sizing: border-box;
`;

const ContentTitle = styled.div`
  border-bottom: ${(props) =>
    props.currentTitle === props.title ? '2px solid #4B9CE2' : ''};
  color: ${(props) =>
    props.currentTitle === props.title ? '#4B9CE2' : '#B1B1B1'};
  padding: 3px;
  margin-right: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;

const OffersArea = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
