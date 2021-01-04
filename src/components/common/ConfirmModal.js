import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import SpinnerButton from './SpinnerButton';

export default function ConfirmModal({
  title = 'Warning',
  message = 'Confirm Message',
  onHide,
  show,
  onConfirm,
  working = false
}) {
  return (
    <Modal show={show} onHide={onHide} centered >
      <Modal.Header closeButton className='modal-header'>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
        <div className='modal-button mt-3'>
          <Button onClick={onHide} variant='secondary mr-3'>Close</Button>
          <SpinnerButton disabled={working} working={working} onClick={onConfirm} className='btn-primary'>Yes</SpinnerButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}
