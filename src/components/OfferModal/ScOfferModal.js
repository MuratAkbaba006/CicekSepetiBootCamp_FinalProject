import styled from 'styled-components';

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
    cursor: pointer;
  }
`;

export const SmallproductArea = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f0f8ff;
  border-radius: 10px;
  align-items: center;
  padding: 0 2px;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Offer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.offer.id === props.id ? '#F0F8FF' : '#FFFFFF'};
  width: 100%;
  padding: 9px;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 5px;
  border: 1px solid #e0e0e0;
  input {
  }
  label {
    font-size: 15px;
    color: ${(props) => (props.offer.id === props.id ? '#4B9CE2' : '#525252')};
  }
`;

export const CustomOffer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  input {
    width: 100%;
    margin-top: 5px;
    padding: 9px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: ${(props) =>
      props.error.message ? '#FFE5E5' : '#F4F4F4'};
    border: none;
    font-size: 16px;
    :focus {
      outline: none;
    }
  }
`;

export const Button = styled.button`
  width: 70%;
  background-color: #4b9ce2;
  margin-top: 5px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  padding: 5px;
  cursor: pointer;
  :disabled {
    cursor: auto;
  }
`;
