import * as slices from "./AuthSlice";
import * as actions from "./actions";

export const reducers = {
  auth: slices.AuthSlice.reducer,
};

export { actions };
