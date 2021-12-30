const initialState = "";

export const changeValue = (item) => {
  return {
    type: "VALUE_CHANGE",
    data: item,
  };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VALUE_CHANGE":
      return action.data;
    default:
      return state;
  }
};

export default filterReducer;
