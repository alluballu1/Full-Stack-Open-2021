const tempNotification = null;
let notificationID;

export const newNotification = (notification, time) => {
  return async (dispatch) => {
    if (notificationID) {
      clearTimeout(notificationID);
    }
    dispatch({
      type: "NEW_NOTIFICATION",
      data: notification,
    });
    notificationID = setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
        data: null,
      });
    }, 1000 * time);
  };
};

const notificationReducer = (state = tempNotification, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data;
    case "HIDE_NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
