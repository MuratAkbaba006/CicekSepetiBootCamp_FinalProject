import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import { ModalWrapper, ModalBackdrop, ModalBox } from './ScModal';

const Modal = forwardRef((props, ref) => {
  // function component'de ref yapısını kullanabilmek için forward ref içerisinde componenti kullanmalıyoz
  const [display, setDisplay] = useState(false);
  // modal açıdığında default değeri false

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
    };
  });
  // burada return etmiş olduğumuz metotlar Modal'ın referansının
  // currenti içerisinde yer alır

  if (display) {
    return ReactDOM.createPortal(
      <ModalWrapper>
        <ModalBackdrop onClick={close} />
        <ModalBox>{props.children}</ModalBox>
      </ModalWrapper>,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
});
export default Modal;
// ReactDOM.createPortal ile ilk parametre olarak portal açacağımız
// yerde bulunmasını istediğimiz içerik, ikinci parametre olarak ise
// portalın wrapperi
