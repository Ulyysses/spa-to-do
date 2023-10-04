import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import { saveState } from "./localStorage";

export const localStorageMiddleware: Middleware =
(store: MiddlewareAPI) =>
(next: Dispatch<AnyAction>) =>
(action: AnyAction) => {
    const result = next(action);
    saveState(store.getState());
    return result;
  };