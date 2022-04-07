import {
  ADD_TODO_ERROR,
  ADD_TODO_LOADING,
  ADD_TODO_SUCCESS,
} from "./actionType";
import { ADD_TODO } from "./actionTypes";
import { REMOVE_TODO } from "./actionType";

export const addTodo = (data) => ({
  type: ADD_TODO,
  payload: data,
});

export const addTodoLoading = () => {
  return {
    type: ADD_TODO_LOADING,
  };
};

export const addTodoSuccess = () => {
  return {
    type: ADD_TODO_SUCCESS,
  };
};

export const addTodoError = () => {
  return {
    type: ADD_TODO_ERROR,
  };
};
export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});
