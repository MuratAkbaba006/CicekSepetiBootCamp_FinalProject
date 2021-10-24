import styled from 'styled-components';
export const UploadImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px dashed #b1b1b1;
  border-radius: 2px;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  width: 80%;

  p {
    margin: 0;
  }
  div {
    color: #b1b1b1;
    background-color: #f4f4f4;
    border-radius: 8px;
    padding: 5px;
    cursor: pointer;
  }
`;

export const UploadedImage = styled.div`
  position: relative;
  margin-left: 8px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  img {
    width: 40%;
  }
  span {
    position: absolute;
    left: 37%;
    background-color: black;
    color: #ffffff;
    cursor: pointer;
    border-radius: 5px;
  }
`;

export const ProgressArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  p {
    margin: 0;
    color: #525252;
    font-size: 12px;
  }
  div {
    font-size: 12px;
    color: #525252;
  }
`;
