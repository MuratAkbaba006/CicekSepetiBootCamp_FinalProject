import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const ImageArea = styled.div`
  width: 40%;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const FormArea = styled.div`
  width: 60%;
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
