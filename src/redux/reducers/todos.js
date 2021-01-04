import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    error: '',
    todos: [],
    allTodos: [],
  },
  reducers: {
    listTodosRequest: state => {
      state.loading = true;
    },
    listTodosSuccess: (state, { payload }) => {
      state.todos = [...payload];
      state.allTodos = [...payload];
      state.loading = false;
    },
    listTodosFailure: (state, { payload }) => {
      state.error = payload;
      state.todos = [];
      state.loading = false;
    },
    listActiveTodos: (state) => {
      state.todos = state.allTodos.filter(todo => !todo.completed)
    },
    listCompletedTodos: (state) => {
      state.todos = state.allTodos.filter(todo => todo.completed)
    },
    listTodos: (state) => {
      state.todos = state.allTodos;
    },
  },
});

export default todosSlice;
