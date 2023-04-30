import { createReducer } from "@reduxjs/toolkit";
import {
  fetchImagesError,
  fetchImagesRequest,
  fetchImagesSuccess,
} from "./actions";
import { Image } from "./types";

interface ImagesInitialState {
  data: Image[];
  uiState: {
    [key: string]: {
      status: "idle" | "loading" | "success" | "error";
      message: string;
    };
  };
}

export const imagesInitialState: ImagesInitialState = {
  data: [],
  uiState: {
    images: {
      status: "idle",
      message: "",
    },
  },
};

export const imagesReducer = createReducer(imagesInitialState, (builder) => {
  builder
    .addCase(fetchImagesRequest, (state) => {
      state.uiState.images.status = "loading";
    })
    .addCase(fetchImagesSuccess, (state, action) => {
      state.data = action.payload.images;
      state.uiState.images.status = "success";
    })
    .addCase(fetchImagesError, (state, action) => {
      state.uiState.images.status = "error";
      state.uiState.images.message = action.payload.message;
    });
});
