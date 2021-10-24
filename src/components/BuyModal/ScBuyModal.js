import styled from 'styled-components';

export const BuyModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 25px;
    font-weight: bold;
    color: #525252;
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 15px;
    color: #555555;
    margin-top: 12px;
  }
`;

export const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

export const Button = styled.button`
  margin: 5px;
  border: none;
  padding: 5px;
  font-size: 18px;
  font-weight: bold;
  width: 45%;
  border-radius: 8px;
  cursor: pointer;
`;

export const CancelButton = styled(Button)`
  background-color: #f0f8ff;
  color: #4b9ce2;
`;
export const BuyButton = styled(Button)`
  background-color: #4b9ce2;
  color: #f0f8ff;
`;
