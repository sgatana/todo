import { combineReducers } from '@reduxjs/toolkit';
import todo from './reducers/todo';
import todos from './reducers/todos';

const rootReducer = combineReducers({
  todo: todo.reducer,
  todos: todos.reducer,
});

export default rootReducer;
