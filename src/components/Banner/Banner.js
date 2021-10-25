import React from 'react';
import styled from 'styled-components';
import banner from '../../assets/Home/Banner1.avif';

const Banner = () => {
  return (
    <BannerContainer>
      <img src={banner} alt="" />
    </BannerContainer>
  );
};

export default React.memo(Banner);

const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  img {
    width: 86%;
    border-radius: 8px;
  }
`;
