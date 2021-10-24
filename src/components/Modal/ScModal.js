import styled from 'styled-components'
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalBox = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 20%;
  overflow-y: auto;
  width: 25%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 101;
  padding: 10px;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 90%;
    top: 35%;
  }
`;