import {
  deleteUser,
  errorDeletingUsers,
  errorFetchingUsers,
  errorSavingUsers,
  getUsers,
  saveFetchedUsers,
  saveSavedUser,
  saveUsers,
  updateDeletedUsers,
} from "../../redux/users/actions";
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
} from "../../redux/users/types";
import { mockUser } from "../../assets/mockUser";

describe("Testing User actions", () => {
  describe("Testing Fetching data", () => {
    it("getUsers", () => {
      expect(getUsers()).toEqual({
        type: GET_USERS_REQUEST,
      });
    });

    it("saveFetchedUsers", () => {
      expect(saveFetchedUsers({ users: [mockUser] })).toEqual({
        type: GET_USERS_SUCCESS,
        users: [mockUser],
      });
    });

    it("errorFetchingUsers", () => {
      expect(errorFetchingUsers()).toEqual({
        type: GET_USERS_FAILED,
      });
    });
  });

  describe("Testing save Data", () => {
    it("saveUsers", () => {
      expect(saveUsers({ user: mockUser })).toEqual({
        type: SAVE_USER_REQUEST,
        user: mockUser,
      });
    });

    it("saveSavedUser", () => {
      expect(saveSavedUser({ user: mockUser })).toEqual({
        type: SAVE_USER_SUCCESS,
        user: mockUser,
      });
    });

    it("errorSavingUsers", () => {
      expect(errorSavingUsers()).toEqual({
        type: SAVE_USER_FAILED,
      });
    });
  });

  describe("Testing delete Data", () => {
    it("deleteUser", () => {
      expect(deleteUser({ id: "test_id" })).toEqual({
        type: DELETE_USER_REQUEST,
        id: "test_id",
      });
    });

    it("updateDeletedUsers", () => {
      expect(updateDeletedUsers()).toEqual({
        type: DELETE_USER_SUCCESS,
      });
    });

    it("errorDeletingUsers", () => {
      expect(errorDeletingUsers()).toEqual({
        type: DELETE_USER_FAILED,
      });
    });
  });
});
