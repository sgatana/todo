import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/actions/todo';
import ConfirmModal from './common/ConfirmModal';
export default function TodoCard({ todo, onToggleToast }) {
  const { title, completed } = todo;
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let { deleting } = useSelector(state => state.todo);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(toggleTodo(todo, onToggleToast));
    setChecked(e.target.checked);
  };

  const onToggleModal = () => {
    setShowModal(!showModal)
  }

  const onDelete = async () => {
      await dispatch(deleteTodo(todo, onToggleToast))
      onToggleToast()
  }

  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  return (
    <>
      <ConfirmModal show={showModal}
          title='Warning'
          message='Are you sure you want to delete this todo?'
          onHide={onToggleModal}
          working={deleting}
          onConfirm={onDelete}
           />
      <div className='col-1'>
        <Form.Check type='checkbox' checked={checked} onChange={onChange} />
      </div>
      <div className={classNames('col-9', completed && 'completed-todo')}>
        {title}
      </div>
      <div className='col-1'>
        <i className='fas fa-times-circle delete-icon' title='Delete todo' onClick={onToggleModal} />
      </div>
    </>
  );
}
