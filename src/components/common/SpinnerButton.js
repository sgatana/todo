import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

export default function SpinnerButton({
  disabled,
  working = false,
  type='button',
  className,
  onClick,
  children,
}) {
  return (
    <Button type={type} disabled={disabled} onClick={onClick} className={className}>
      {working && (
        <Spinner
          style={{ marginRight: 5 }}
          as='span'
          animation='border'
          size='sm'
          role='status'
        />
      )}
      {children}
    </Button>
  );
}
