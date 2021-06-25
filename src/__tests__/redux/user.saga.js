import { call, put, takeEvery } from "redux-saga/effects";
import { mockUser } from "../../assets/mockUser";
import {
  errorDeletingUsers,
  errorFetchingUsers,
  errorSavingUsers,
  saveFetchedUsers,
  saveSavedUser,
  updateDeletedUsers,
} from "../../redux/users/actions";
import usersSaga, {
  fetchUsers,
  removeUser,
  saveUser,
} from "../../redux/users/saga";
import { deleteUser, listAllUser, storeUser } from "../../redux/users/services";
import {
  DELETE_USER_REQUEST,
  GET_USERS_REQUEST,
  SAVE_USER_REQUEST,
} from "../../redux/users/types";

describe("Testing usersSaga generator", () => {
  const usersSagaGen = usersSaga();
  it("GET_USERS_REQUEST should call fetchUsers", () => {
    expect(usersSagaGen.next().value).toEqual(
      takeEvery(GET_USERS_REQUEST, fetchUsers)
    );
  });

  it("SAVE_USER_REQUEST should call saveUser", () => {
    expect(usersSagaGen.next().value).toEqual(
      takeEvery(SAVE_USER_REQUEST, saveUser)
    );
  });
  it("DELETE_USER_REQUEST should call removeUser", () => {
    expect(usersSagaGen.next().value).toEqual(
      takeEvery(DELETE_USER_REQUEST, removeUser)
    );
  });
  it("usersSaga should be Done", () => {
    expect(usersSagaGen.next().done).toBeTruthy();
  });
});

describe("Testing fetchUsers generator", () => {
  it("Succefully Trigger saveFetchedUsers", () => {
    const fetchUsersGen = fetchUsers();

    expect(fetchUsersGen.next().value).toEqual(call(listAllUser));
    expect(fetchUsersGen.next([mockUser]).value).toEqual(
      put(saveFetchedUsers({ users: [mockUser] }))
    );
    expect(fetchUsersGen.next().done).toBeTruthy();
  });

  it("Error handler when fetching", () => {
    const fetchUsersGen = fetchUsers();

    expect(fetchUsersGen.next().value).toEqual(call(listAllUser));
    expect(fetchUsersGen.next(null).value).toEqual(put(errorFetchingUsers()));
    expect(fetchUsersGen.next().done).toBeTruthy();
  });
});

describe("Testing saveUser generator", () => {
  it("Succefully Trigger storeUser", () => {
    const saveUsersGen = saveUser({ user: mockUser });

    expect(saveUsersGen.next().value).toEqual(call(storeUser, mockUser));
    expect(saveUsersGen.next(mockUser).value).toEqual(
      put(saveSavedUser({ user: mockUser }))
    );
    expect(saveUsersGen.next().done).toBeTruthy();
  });

  it("Error handler when storing data", () => {
    const saveUsersGen = saveUser({ user: mockUser });

    expect(saveUsersGen.next().value).toEqual(call(storeUser, mockUser));
    expect(saveUsersGen.next(null).value).toEqual(put(errorSavingUsers()));
    expect(saveUsersGen.next().done).toBeTruthy();
  });
});

describe("Testing removeUser generator", () => {
  it("Succefully Trigger deleteUser", () => {
    const deleteUsersGen = removeUser({ id: "test_id" });

    expect(deleteUsersGen.next().value).toEqual(call(deleteUser, "test_id"));
    expect(deleteUsersGen.next(200).value).toEqual(put(updateDeletedUsers()));
    expect(deleteUsersGen.next().done).toBeTruthy();
  });
  it("Error handler when deleting data", () => {
    const deleteUsersGen = removeUser({ id: "test_id" });

    expect(deleteUsersGen.next().value).toEqual(call(deleteUser, "test_id"));
    expect(deleteUsersGen.next(500).value).toEqual(put(errorDeletingUsers()));
    expect(deleteUsersGen.next().done).toBeTruthy();
  });
});
