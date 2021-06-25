import {
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USERS_FAILED,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  SAVE_USER_FAILED,
  SAVE_USER_REQUEST,
  SAVE_USER_SUCCESS,
} from "./types";

export const getUsers = () => {
  return {
    type: GET_USERS_REQUEST,
  };
};

export const saveFetchedUsers = ({ users }) => {
  if (!Array.isArray(users)) throw new Error("Data Malformed");
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
};

export const errorFetchingUsers = () => {
  return {
    type: GET_USERS_FAILED,
  };
};

export const saveUsers = ({ user }) => {
  return {
    type: SAVE_USER_REQUEST,
    user,
  };
};

export const saveSavedUser = ({ user }) => {
  if(user.id?.length<36) throw new Error("Data Malformed");
  return {
    type: SAVE_USER_SUCCESS,
    user,
  };
};

export const errorSavingUsers = () => {
  return {
    type: SAVE_USER_FAILED,
  };
};

export const deleteUser = ({ id }) => {
  return {
    type: DELETE_USER_REQUEST,
    id,
  };
};

export const updateDeletedUsers = () => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};

export const errorDeletingUsers = () => {
  return {
    type: DELETE_USER_FAILED,
  };
};
