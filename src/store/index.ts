import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { imagesInitialState, imagesReducer } from "./images/reducer";
import rootSaga from "./saga";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  images: imagesReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

const preloadedState: ApplicationState = {
  images: imagesInitialState,
};

const sagaMiddleware = createSagaMiddleware();

const configureAppStore = (preloadedState: ApplicationState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    preloadedState,
    enhancers: [],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};


export const store = configureAppStore(preloadedState);
