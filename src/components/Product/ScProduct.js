import styled from 'styled-components';

export const GridItem = styled.div`
  background-color: #ffffff;
  padding: 10px;
  font-size: 30px;
  //text-align: center;
  border-radius: 8px;
  cursor: pointer;
`;

export const ProductInfoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
    justify-content: center;
  }
`;

export const BrandTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #4b9ce2;
`;

export const Color = styled.div`
  display: flex;
  align-items: center;

  label {
    font-weight: bold;
    color: #3e3e3e;
    font-size: 13px;
    margin-right: 2px;
  }
  p {
    color: #3e3e3e;
    font-size: 13px;
  }
`;

export const Price = styled.div`
  color: #3e3e3e;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
`;

export const ProductImageArea = styled.div`
  max-width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    width: 100%;
    object-fit: fill;
    height: 250px;
    border-radius: 8px;
  }
`;
