import styled from 'styled-components';

export const AuthFormContainer = styled.div`
  width: 50%;
  height: 60%;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 3px 12px #1e36480a;
  border-radius: 8px;
  margin-top: 25px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  header {
    div {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
    }
    p {
      font-size: 15px;
      text-align: center;
      @media (max-width: 768px) {
        margin: 0;
      }
    }
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  footer {
    margin-top: 8px;
    color: #525252;
    font-size: 15px;
  }
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  position: relative;
  input {
    width: 80%;
    padding: 8px 5px;
    border-radius: 8px;
    font-size: 16px;
    color: #99a0a7;
    background-color: #f4f4f4;
    border: none;
    outline: none;
    :focus {
      background-color: #f0f8ff;
      outline: auto;
      outline-color: #4b9ce2;
    }
  }
  label {
    display: flex;
    width: 80%;
    font-size: 15px;
  }
  a {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    text-decoration: none;
  }
`;

export const Button = styled.button`
  display: flex;
  width: 80%;
  justify-content: center;
  padding: 5px;
  color: #ffffff;
  background-color: #4b9ce2;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-top: ${(props) => (props.title === 'Giriş Yap' ? '8px' : '15px')};
  :disabled {
    cursor: auto;
  }
`;

export const Error = styled.div`
  width: 80%;
  text-align: start;
  color: red;
`;

export const RouteAuth = styled.span`
  color: #4b9ce2;
  font-size: 15px;
  font-weight: bold;
  margin-left: 3px;
  cursor: pointer;
`;
