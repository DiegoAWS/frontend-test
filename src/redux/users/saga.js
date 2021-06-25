import { call, put, takeEvery } from "redux-saga/effects";
import {
  errorDeletingUsers,
  errorFetchingUsers,
  errorSavingUsers,
  saveFetchedUsers,
  saveSavedUser,
  updateDeletedUsers,
} from "./actions";
import { listAllUser, storeUser, deleteUser } from "./services";
import {
  DELETE_USER_REQUEST,
  GET_USERS_REQUEST,
  SAVE_USER_REQUEST,
} from "./types";

export function* fetchUsers() {
  try {
    const users = yield call(listAllUser);
    yield put(saveFetchedUsers({ users }));
  } catch (e) {
    yield put(errorFetchingUsers());
  }
}

export function* saveUser({ user }) {
  try {
    const userAdded = yield call(storeUser, user);
    yield put(saveSavedUser({ user: userAdded }));
  } catch (e) {
    yield put(errorSavingUsers());
  }
}

export function* removeUser({ id }) {
  try {
    const data = yield call(deleteUser, id);

    if (data !== 200) throw new Error();

    yield put(updateDeletedUsers());
  } catch (e) {
    yield put(errorDeletingUsers());
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS_REQUEST, fetchUsers);
  yield takeEvery(SAVE_USER_REQUEST, saveUser);
  yield takeEvery(DELETE_USER_REQUEST, removeUser);
}

export default usersSaga;
