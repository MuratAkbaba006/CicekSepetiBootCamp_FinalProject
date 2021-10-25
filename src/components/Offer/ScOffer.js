import styled from 'styled-components';

export const OfferContainer = styled.div`
  border: 1px solid #f2f2f2;
  display: flex;
  width: 98%;
  margin: 5px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const ContentArea = styled.div`
  display: flex;
`;
export const ButtonArea = styled.div`
  margin-right: 15px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
    margin-right: 8%;
  }
`;
export const Button = styled.button`
  margin-left: 5px;
  cursor: pointer;
  padding: 3px 15px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 15px;
`;

export const RejectButton = styled(Button)`
  background-color: #f77474;
`;

export const ConfirmButton = styled(Button)`
  background-color: #4b9ce2;
`;
export const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    color: #555555;
    font-size: 18px;
    margin: 0 5px;
  }
  div {
    background-color: #f2f2f2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 5px 15px;
    margin: 0 5px;
    p {
      margin: 0;
      font-size: 15px;
      font-weight: bold;
      color: #525252;
    }
    label {
      font-size: 15px;
      color: #b1b1b1;
      margin-right: 2px;
    }
  }
`;

export const StatusLabel = styled.div`
  margin-right: 15px;
  color: ${(props) => {
    if (props.status === 'rejected') return '#F77474';
    else if (props.status === 'offered') return 'orange';
    else {
      return '#4B9CE2';
    }
  }};
`;

export const ImageArea = styled.div`
  max-width: 100px;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
    @media (max-width: 768px) {
      width: 70%;
    }
  }
`;

export const GaveOffersAcceptArea = styled.div`
  display: flex;
`;

export const BuyButton = styled(Button)`
  background-color: #4b9ce2;
  margin-right: 10px;
`;
