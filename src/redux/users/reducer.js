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
import { toast } from "react-toastify";
import {
  GENERIC_DELETING_ERROR,
  GENERIC_FETCHING_ERROR,
  GENERIC_SAVING_ERROR,
} from "../../helpers/errorsMessage";

export const initialUsersState = {
  users: [],
  oldUsers: [],
  loadingOnSave: false,
  errors: false,
};



export const usersReducer = (state = initialUsersState, action) => {
  switch (action.type) {

    case GET_USERS_REQUEST:
      return {
        ...state,
        errors: false,
      };
      
    case GET_USERS_SUCCESS:
      return {
        ...state,
        errors: false,
        users: action.users,
      };

    case GET_USERS_FAILED:
      toast.error(GENERIC_FETCHING_ERROR);
      return {
        ...state,
        errors: true,
      };





    case SAVE_USER_REQUEST:
      const newUser = {
        ...action.user,
        created_at: Date.now().toString(),
        id: "new_user",
      };

      return {
        ...state,
        oldUsers: [...state.users],
        users: [newUser,...state.users],
        loadingOnSave: true,
        errors: false,
      };

    case SAVE_USER_SUCCESS:
      
      return {
        ...state,
        loadingOnSave: false,
        errors: false,
        users:[action.user,...state.oldUsers],
        oldUsers: [],
      };

    case SAVE_USER_FAILED:
      toast.error(GENERIC_SAVING_ERROR);

      return {
        ...state,
        loadingOnSave: false,
        users: [...state.oldUsers],
        oldUsers: [],
        errors: true,
      };





    case DELETE_USER_REQUEST:
      const userTempList = state.users.filter((item) => item.id !== action.id);

      return {
        ...state,
        oldUsers: [...state.users],
        users: userTempList,
        errors: false,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        errors: false,
        oldUsers: [],
      };

    case DELETE_USER_FAILED:
      toast.error(GENERIC_DELETING_ERROR);

      return {
        ...state,
        oldUsers: [],
        users: [...state.oldUsers],
        errors: true,
      };

    default:
      return state;
  }
};
