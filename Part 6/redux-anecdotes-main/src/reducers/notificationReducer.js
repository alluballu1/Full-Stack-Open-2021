const tempNotification = null;

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION",
    data: null,
  };
};
export const newNotification = (notification) => {
  return {
    type: "NEW_NOTIFICATION",
    data: notification,
  };
};

const notificationReducer = (state = tempNotification, action) => {
  console.log(action.data);
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
