import styled from "styled-components";
export const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
export const MailArea = styled.div`
  width: 86%;
  display: flex;
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0 4px;
  p {
    font-size: 15px;
    font-weight: bold;
    color: #525252;
    margin-left: 8px;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 86%;
  background-color: #ffffff;
  margin-top: 10px;
`;
export const ContentTitleArea = styled.div`
  width: 86%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #525252;
  box-sizing: border-box;
`;

export const ContentTitle = styled.div`
  border-bottom: ${(props) =>
    props.currentTitle === props.title ? '2px solid #4B9CE2' : ''};
  color: ${(props) =>
    props.currentTitle === props.title ? '#4B9CE2' : '#B1B1B1'};
  padding: 3px;
  margin-right: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;

export const OffersArea = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
