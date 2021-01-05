import React, { useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { addTodo } from '../redux/actions/todo';
import { fetchActiveTodos, fetchCompletedTodos, fetchTodos, listAllTodos } from '../redux/actions/todos';
import ErrorMessage from './common/ErrorMessage';
import ToastContainer from './common/ToastContainer';
import TodoCard from './TodoCard';
import SpinnerButton from './common/SpinnerButton';
import Loader from './common/Loader';
export default function Todos() {
  const [todo, setTodo] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);

  let { loading, todos = [] } = useSelector(state => state.todos);
  let { message, error, working } = useSelector(state => state.todo);

  const dispatch = useDispatch();

  const onChange = todo => {
    setTodo(todo);
  };

  const filterByStatus = status => {
    switch (status) {
      case 'active':
        dispatch(fetchActiveTodos())
        setSelectedFilter(status);
        break;
      case 'completed':
        dispatch(fetchCompletedTodos() )
        setSelectedFilter(status);
        break;

      default:
        dispatch(listAllTodos() )
        setSelectedFilter('all');
        break;
    }
  };

  const onToggleToast = () => {
    setShowToast(!showToast);
  };

  const saveTodo = e => {
    if (e) {
      e.preventDefault();
    }
    dispatch(addTodo({ title: todo }, onToggleToast));
    setTodo('');
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);


  return (
    <>
      <ToastContainer
        show={showToast}
        onHide={onToggleToast}
        message={message}
      />
      <div className='todo-container'>
        <h5>Getir Todo List</h5>
        <div className='add-todo'>
          <Form onSubmit={saveTodo}>
            <Form.Group as={Row}>
              <div className='col-9'>
                <Form.Control
                  placeholder='Please type in your todo'
                  value={todo}
                  onChange={({ target }) => onChange(target.value)}
                />
              </div>
              <div className='col-3'>
                <SpinnerButton type='submit' working={working} disabled={working} block>
                  Save
                </SpinnerButton>
              </div>
            </Form.Group>
          </Form>
        </div>
        {error && <ErrorMessage message={error} />}
        <div className='filters'>
          <p>
            Show:
            <span
              className={classNames(selectedFilter === 'all' && 'bold')}
              role='button'
              onClick={() => filterByStatus('all')}
            >
              All
            </span>
            <span
              className={classNames(selectedFilter === 'active' && 'bold')}
              role='button'
              onClick={() => filterByStatus('active')}
            >
              Active
            </span>
            <span
              className={classNames(selectedFilter === 'completed' && 'bold')}
              role='button'
              onClick={() => filterByStatus('completed')}
            >
              Completed
            </span>
          </p>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className='todo-list'>
            {todos.length
              ? todos.map(todo => {
                  return (
                    <div key={todo.url} className='row todo-item'>
                      <TodoCard onToggleToast={onToggleToast} todo={todo} />
                    </div>
                  );
                })
              : <p>No todos found please add one!</p>}
          </div>
        )}
      </div>
    </>
  );
}
