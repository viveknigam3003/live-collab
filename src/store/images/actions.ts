import { createAction } from "@reduxjs/toolkit";
import { Image, ImageActions } from "./types";

export const fetchImagesRequest = createAction(ImageActions.FETCH_IMAGES);

export const fetchImagesSuccess = createAction<{ images: Image[] }>(
  ImageActions.FETCH_IMAGES_SUCCESS
);

export const fetchImagesError = createAction<{ message: string }>(
  ImageActions.FETCH_IMAGES_ERROR
);
