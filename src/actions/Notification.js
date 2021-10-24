export const addNotification = (data) => (dispatch) => {
  dispatch({ type: 'ADD_NOTIFICATION', payload: data });
};

export const removeNotification = (id) => (dispatch) => {
  dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
};
