import React, { useEffect, useState } from 'react';
import {
  ProfileContainer,
  MailArea,
  Content,
  ContentTitleArea,
  ContentTitle,
  OffersArea,
} from './ScProfile';
import Header from '../../components/Header/Header';
import ProfileIcon from '../../assets/Profile/Group 6876.svg';
import Cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getGivenOffers, getReceivedOffers,offerStatusIdle } from '../../actions/Account';
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

  useEffect(() => {
    return () => {
      dispatch(offerStatusIdle());
    }
  },[])

  const handleTitleChange = (title) => {
    setCurrentTitle(title);
    if (title === 'Teklif Verdiklerim') {
      dispatch(getGivenOffers());
    }
  };

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
