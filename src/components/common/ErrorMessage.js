import { Alert } from 'react-bootstrap';
import React from 'react';

export default function ErrorMessage({ message }) {
  return <Alert variant='danger'>{message}</Alert>;
}
