import { ADD_TODO } from "./actionType";

const init = { todo: [] };

export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [...payload],
      };
    default:
      return state;
  }
};
