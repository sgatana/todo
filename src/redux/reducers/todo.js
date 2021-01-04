import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    working: false,
    deleting: false,
    message: '',
    error: '',
  },
  reducers: {
    addTodoRequest: state => {
      state.working = true;
    },
    addTodoSuccess: (state, { payload }) => {
      state.message = payload;
      state.working = false;
    },
    addTodoFailure: (state, { payload }) => {
      state.error = payload;
      state.message = '';
      state.working = false;
    },
    deleteTodoSuccess: (state, { payload }) => {
      state.message = payload;
      state.deleting = false;
    },
    deleteTodoRequest: (state) => {
      state.deleting = true;
    },
    deleteTodoFailure: (state, { payload }) => {
      state.error = payload;
      state.deleting = false;
    },
    toggleTodoSuccess: (state, { payload }) => {
      state.message = payload;
    },
    toggleTodoFailure: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export default todoSlice;
