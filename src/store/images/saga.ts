import { Action } from "@reduxjs/toolkit";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  fetchImagesError,
  fetchImagesRequest,
  fetchImagesSuccess,
} from "./actions";
import { fetchImages } from "./api";
import { Image } from "./types";

function* fetchImagesSaga(action: Action) {
  if (!fetchImagesRequest.match(action)) {
    return;
  }

  try {
    const images: Image[] = yield call(fetchImages);
    yield put(fetchImagesSuccess({ images: images }));
  } catch (error) {
    yield put(fetchImagesError({ message: "Cannot fetch images" }));
  }
}

function* watchFetchRequest() {
  yield takeLatest(fetchImagesRequest.type, fetchImagesSaga);
}

export default function* imagesSaga() {
  yield all([fork(watchFetchRequest)]);
}
