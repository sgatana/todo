import todoSlice from '../reducers/todo';
import { fetchTodos } from './todos';
import { convertUrlToHttps } from '../../utils/index';
export const addTodo = (todo, onSuccess) => {
  const url = process.env.REACT_APP_API_URL;
  const { addTodoFailure, addTodoRequest, addTodoSuccess } = todoSlice.actions;
  return async dispatch => {
    try {
      dispatch(addTodoRequest());
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(addTodoSuccess('Todo item successfully added'));
      if (onSuccess) onSuccess();
      // refresh the page
      dispatch(fetchTodos(false));
    } catch (error) {
      dispatch(addTodoFailure(error.message));
    }
  };
};
export const toggleTodo = (todo, onSuccess) => {
  const message = `Todo item has been marked as ${
    todo.completed ? 'active' : 'completed'
  }`;
  const { toggleTodoFailure, toggleTodoSuccess } = todoSlice.actions;
  return async dispatch => {
    let body = {
      completed: !todo.completed,
    };
   const url = convertUrlToHttps(todo.url)
    try {
      await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch (toggleTodoSuccess(message));
      if (onSuccess) onSuccess();
      // refresh the page
      dispatch(fetchTodos(false));
    } catch (error) {
      dispatch(toggleTodoFailure(error.message));
    }
  };
};
export const deleteTodo =  (todo, onSuccess) => {
  const message = `Todo item has been successfully deleted`
  const { deleteTodoSuccess, deleteTodoFailure, deleteTodoRequest } = todoSlice.actions;
  return async dispatch => {
    const url = convertUrlToHttps(todo.url)
    try {
      dispatch(deleteTodoRequest());
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(deleteTodoSuccess(message));
      if (onSuccess) onSuccess();
      // refresh the page
      dispatch(fetchTodos(false));
    } catch (error) {
      dispatch(deleteTodoFailure(error.message));
    }
  };
};
