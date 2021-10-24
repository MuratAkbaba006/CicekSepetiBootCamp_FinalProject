import styled from 'styled-components'
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 86%;
  height: 50%;
  background-color: #ffffff;
  margin-top: 15px;
  border-radius: 8px;
  button {
    display: flex;
    background-color: #4B9CE2;
    width: 22%;
    justify-content: center;
    align-items: center;
    color:#FFFFFF;
    margin:10px;
    border:none;
    border-radius: 8px;
    padding:5px;
    font-size: 18px;
    font-weight:bold;
    cursor:pointer;
    :disabled{
      cursor:auto
    }
    @media (max-width: 768px){
    width:100%;
  }
  }
`;

export const Content = styled.div`
  display: flex;
  @media (max-width: 768px){
    display: block;
  }
`;
export const ProductDetail = styled.div`
  display: flex;
  width: 55%;
  border-right: 1px solid #F2F2F2;
  flex-direction: column;
  align-items: center;
  margin-top:5px;
  h4{
    color:#525252;
    font-size:25px;
    font-weight:bold;
    width:90%;
    margin:15px 0px 18px 0px;
  }
  @media (max-width: 768px){
    width:100%;
  }
`;

export const ProductImageArea = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  align-items: center;
  h4{
    color:#525252;
    font-size:25px;
    font-weight:bold;
    width:90%;
    margin:15px 0px 18px 0px;
  }
  @media (max-width: 768px){
    width:100%;
  }
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

  label {
    display: flex;
    align-items: flex-start;
    width: 90%;
    font-size: 15px;
    color: #525252;
  }
  input {
    width: 90%;
    background-color: #f4f4f4;
    font-size: 16px;
    color: #99a0a7;
    border: none;
    border-radius: 8px;
    padding: 10px 12px;
    outline: none;
    box-sizing: border-box;
    :focus {
      background-color: #f0f8ff;
    }
  }
`;
export const Description = styled(Name)``;
export const SelectAreaOne = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  @media (max-width: 768px){
    display:block;
  }
`;
export const Category = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-bottom: 5px;
  label {
    font-size: 15px;
    color: #525252;
  }
  select {
    background-color: #f4f4f4;
    border-radius: 8px;
    color: #99a0a7;
    font-size: 16px;
    outline: none;
    padding: 5px;
    border: none;
  }
  @media (max-width: 768px){
    width:100%;
  }
`;
export const Brand = styled(Category)``;
export const SelectAreaTwo = styled(SelectAreaOne)``;
export const Color = styled(Category)``;
export const Status = styled(Category)``;
export const Offer = styled(Name)`
  align-items: flex-start;
  margin-left: 10%;
  input {
    width: 30%;
    margin-bottom: 10px;
    @media (max-width: 768px){
    width:90%;
  }
  }
  div {
    display: flex;
    width: 30%;
    justify-content: space-around;
    align-items: center;
    label {
      margin: 0px;
      padding: 0px;
    }
    @media (max-width: 768px){
    width:100%;
  }
  }
`;

export const Error = styled.div`
text-align: start;
color:red;
`