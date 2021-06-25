import { toast } from "react-toastify";
import { mockUser } from "../../assets/mockUser";
import {
  GENERIC_FETCHING_ERROR,
  GENERIC_SAVING_ERROR,
} from "../../helpers/errorsMessage";
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

import { initialUsersState, usersReducer } from "../../redux/users/reducer";

describe("Initial State", () => {
  it("Shoud return the initial State", () => {
    expect(usersReducer(undefined, initialUsersState)).toEqual(
      initialUsersState
    );
  });
});

describe("Testing reducer fetching data", () => {
  it("GET_USERS_REQUEST", () => {
    expect(usersReducer(initialUsersState, getUsers())).toEqual({
      errors: false,
      loadingOnSave: false,
      oldUsers: [],
      users: [],
    });
  });

  it("GET_USERS_SUCCESS", () => {
    expect(
      usersReducer(initialUsersState, saveFetchedUsers({ users: [mockUser] }))
    ).toEqual({
      errors: false,
      users: [mockUser],
      loadingOnSave: false,
      oldUsers: [],
    });
  });

  it("GET_USERS_FAILED", () => {
    const mockToast = jest.fn();
    toast.error = mockToast;

    expect(mockToast).toHaveBeenCalledTimes(0);
    expect(usersReducer(initialUsersState, errorFetchingUsers())).toEqual({
      errors: true,
      loadingOnSave: false,
      oldUsers: [],
      users: [],
    });
    expect(mockToast).toHaveBeenCalledWith(GENERIC_FETCHING_ERROR);
  });
});

describe("Testing reducer Saving Data", () => {
  it("SAVE_USER_REQUEST", () => {
    const { users, ...stateWithoutUsers } = usersReducer(
      initialUsersState,
      saveUsers({ user: mockUser })
    );

    expect(stateWithoutUsers).toEqual({
      oldUsers: [],
      loadingOnSave: true,
      errors: false,
    });

    const [{ created_at, ...mockedResult }] = users;
    expect(created_at).toBeDefined();
    expect(mockedResult).toEqual({ id: "new_user", ...mockUser });
  });

  it("SAVE_USER_SUCCESS", () => {
    expect(
      usersReducer(initialUsersState, saveSavedUser({ user: mockUser }))
    ).toEqual({
      loadingOnSave: false,
      errors: false,
      users: [mockUser],
      oldUsers: [],
    });
  });

  it("SAVE_USER_FAILED", () => {
    const mockToast = jest.fn();
    toast.error = mockToast;

    expect(mockToast).toHaveBeenCalledTimes(0);
    expect(usersReducer(initialUsersState, errorSavingUsers())).toEqual({
      loadingOnSave: false,
      users: [],
      oldUsers: [],
      errors: true,
    });
    expect(mockToast).toHaveBeenCalledWith(GENERIC_SAVING_ERROR);
  });
});

describe("Testing reducer Deleting Data", () => {
  it("DELETE_USER_REQUEST", () => {
    const mockState = {
      users: [{ id: "test_id", ...mockUser }],
      ...initialUsersState,
    };

    expect(usersReducer(mockState, deleteUser({ id: "test_id" }))).toEqual({
      oldUsers: [],
      loadingOnSave: false,
      users: [],
      errors: false,
    });
  });

  it("DELETE_USER_SUCCESS", () => {
    expect(usersReducer(initialUsersState, updateDeletedUsers())).toEqual({
      errors: false,
      oldUsers: [],
      loadingOnSave: false,
      users: [],
    });
  });

  it("DELETE_USER_FAILED", () => {
    const mockState = {
      oldUsers: [mockUser],
      ...initialUsersState,
    };
    expect(usersReducer(mockState, errorDeletingUsers())).toEqual({
      loadingOnSave: false,
      oldUsers: [],
      users: [],
      errors: true,
    });
  });
});
