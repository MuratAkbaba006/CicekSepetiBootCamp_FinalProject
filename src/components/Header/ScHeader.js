import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: #ffffff;
  justify-content: space-between;
  padding: 12px;
  align-items: center;
  box-sizing: border-box;
  img {
    display: flex;
    margin-left: 7%;
    cursor: pointer;
  }
  div {
    display: flex;
    flex-direction: row;
    margin-right: 7%;
  }
`;
export const ButtonContainer = styled.div`
  border-radius: 8px;
  background-color: #f0f8ff;
  font-size: 15px;
  margin: 5px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  p {
    color: #4b9ce2;
    font-size: 15px;
    margin: 0 7px;
    width: 100%;
    cursor: pointer;
  }
`;

export const AddProductTitle = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`;
