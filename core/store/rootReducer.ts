import type { Reducer } from "react";
import { combineReducers } from "@reduxjs/toolkit";
import { reducers as auth } from "@modules/auth/reducer";

const staticReducers = {
  ...auth,
};

export function createReducer(asyncReducers?: Reducer<never, never>) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

export const rootReducer = createReducer();
