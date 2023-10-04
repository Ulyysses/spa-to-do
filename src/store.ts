import { createStore, applyMiddleware, combineReducers } from "redux";
import { rootReducer } from "./services/reducers/rootReducer";
import { localStorageMiddleware } from "./utils/localStorageMiddleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadState } from "./utils/localStorage";

const middlewares = [localStorageMiddleware];

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch
