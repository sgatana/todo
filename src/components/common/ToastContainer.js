import React from 'react';
import { Toast } from 'react-bootstrap';

export default function ToastContainer({ show, onHide, message }) {
  return (
    <Toast
      className='toast-container'
      show={show}
      onClose={onHide}
      delay={3000}
      autohide
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
