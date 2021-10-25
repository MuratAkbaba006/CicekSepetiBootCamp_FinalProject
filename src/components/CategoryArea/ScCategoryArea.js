import styled from 'styled-components';

export const CategoryAreaContainer = styled.div`
  width: 86%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #525252;
  flex-wrap: wrap;
`;
export const Category = styled.div`
  border-bottom: ${(props) => (props.current === props.id ? '2px solid #4B9CE2' : '')};
  color: ${(props) => (props.current === props.id ? '#4B9CE2' : '#525252')};
  padding: 3px;
  cursor: pointer;
`;
