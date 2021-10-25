import styled from 'styled-components';

export const ProductDetailContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    height: 100%;
  }
`;
export const ImageArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  img {
    border-radius: 8px;
    width: 75%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const ProductArea = styled.div`
  background-color: #ffffff;
  width: 86%;
  height: 78%;
  margin-top: 20px;
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;

  @media (max-width: 768px) {
    display: block;
    height: 100%;
    width: 90%;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.div`
  color: #555555;
  font-size: 34px;
  margin-bottom: 18px;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    font-size: 18px;
  }
`;
export const Info = styled.div`
  div {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    width: 50%;

    label {
      color: #525252;
      font-size: 15px;
      font-weight: bold;
      min-width: 200px;
      margin: 0;
    }
    p {
      color: #525252;
      font-size: 15px;
      margin-left: 15px;
      margin: 0;
    }
  }
`;
export const Price = styled.div`
  color: #525252;
  font-size: 25px;
  font-weight: bold;
  margin-top: 9px;
`;
export const ButtonArea = styled.div`
  display: flex;
  margin-top: 30px;
  button {
    width: 35%;
    margin-right: 10px;
    padding: 7px;
    border-radius: 8px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    background-color: #f0f8ff;
    color: #4b9ce2;
    &:hover {
      background-color: #4b9ce2;
      color: #ffffff;
    }
  }
`;
export const Description = styled.div`
  margin-top: 25px;
  label {
    margin: 0;
    font-size: 18px;
    color: #525252;
    font-weight: bold;
  }
  p {
    margin: 0;
    font-size: 15px;
    color: #555555;
  }
`;
export const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 25px;
    font-weight: bold;
    color: #525252;
    margin: 0;
  }
  img {
    margin: 0;
  }
`;

export const SmallproductArea = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f0f8ff;
  border-radius: 10px;
  align-items: center;
  padding: 2px;
  div {
    height: 10%;
    display: flex;
    img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
    }
    p {
      font-size: 13px;
      color: #555555;
    }
  }
  p {
    font-size: 18px;
    font-weight: bold;
    color: #525252;
  }
`;

export const Information = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 50%;
  text-align: center;
  padding: 5px;
  border-radius: 8px;
  margin-top: 10px;
`;
export const BuyInformation = styled(Information)`
  background-color: #fff0e2;
  color: #faad60;
`;

export const OfferInformation = styled(Information)`
  background-color: #f2f2f2;
  font-size: 15px;
  color: #525252;

  label {
    color: #b1b1b1;
    font-weight: 600;
  }
`;
