const NotificationState = {
  notifications: [],
};

const NotificationReducer = (state = NotificationState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      return { ...state, notifications: [...state.notifications,action.payload] };
    }
    case 'REMOVE_NOTIFICATION':{
      const filteredNotifications = state.notifications.filter((noti) => noti.id !== action.payload)
      return {...state,notifications:filteredNotifications}
    }
    default:
      return state;
  }
};

export default NotificationReducer;
