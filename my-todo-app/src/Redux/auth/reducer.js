import { LOGIN_FAILURE, LOGIN_SUCCESS } from "./actionTypes";

const initState = { token: loadData("token") || "", isAuth: false };

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: payload,
      };
    case LOGIN_FAILURE: {
      return {
        ...state,
        isAuth: false,
        token: "",
      };
    }
    default:
      return state;
  }
};
