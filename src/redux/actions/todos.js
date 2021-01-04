import todosSlice from '../reducers/todos';
export const fetchTodos = (initalLoad = true, status = null) => {
  const url = process.env.REACT_APP_API_URL;
  const {
    listTodosFailure,
    listTodosRequest,
    listTodosSuccess,
  } = todosSlice.actions;
  return async dispatch => {
    try {
      if (initalLoad) {
        dispatch(listTodosRequest());
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch(listTodosSuccess(data));
    } catch (error) {
      dispatch(listTodosFailure(error.message));
    }
  };
};

export const fetchActiveTodos = () => {
  const { listActiveTodos } = todosSlice.actions;
  return async dispatch => {
    dispatch(listActiveTodos());
  };
};
export const fetchCompletedTodos = () => {
  const { listCompletedTodos } = todosSlice.actions;
  return async dispatch => {
    dispatch(listCompletedTodos());
  };
};

export const listAllTodos = () => {
  const { listTodos } = todosSlice.actions;
  return async dispatch => {
    dispatch(listTodos());
  };
};

