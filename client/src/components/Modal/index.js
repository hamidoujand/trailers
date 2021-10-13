import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

let StyledModal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 4000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <StyledModal onClick={onClose}>{children}</StyledModal>,
    document.querySelector("#modal")
  );
}
