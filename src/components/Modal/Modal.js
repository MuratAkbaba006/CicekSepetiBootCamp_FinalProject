import React, { useState,forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
const Modal = forwardRef((props,ref) => {
// function component'de ref yapısını kullanabilmek için forward ref içerisinde componenti kullanmalıyoz
  const [display, setDisplay] = useState(false);
  // modal açıdığında default değeri true

  useImperativeHandle(ref, () => {
    return {
      openModal : () => open(),
      closeModal : () => close()
    }
  })
  // burada return etmiş olduğumuz metotlar Modal'ın referansının
  // currenti içerisinde yer alır


  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <ModalWrapper style={{}}>
        <ModalBackdrop onClick={close} />
        <Modal_Box>{props.children}</Modal_Box>
      </ModalWrapper>,
      document.getElementById("modal-root")
    );
  }
  // ReactDOM.createPortal ile ilk parametre olarak portal açacağımız
  // yerde bulunmasını istediğimiz içerik, ikinci parametre olarak ise
  // portalın wrapperi
  else {
    return null;
  }
})
export default Modal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Modal_Box = styled.div`
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
  @media (max-width: 768px){
    width:90%;
    top:35%;
  }
`;