import { configureStore, EnhancedStore, Slice } from "@reduxjs/toolkit";
import { rootReducer, createReducer } from "./rootReducer";

export const setupStore: EnhancedStore<any, any, any> & {
  asyncReducers?: Record<string, React.Reducer<any, any>>;
} = configureStore({
  reducer: rootReducer,
});
setupStore.asyncReducers = {};

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;

export const useAsyncSlice = (
  asyncSlice: Record<string, Slice>,
  initialState: any = null
) => {
  const [[key, slice]] = Object.entries(asyncSlice);

  const currentState = setupStore.getState();
  if (!(key in currentState)) {
    setupStore.asyncReducers = {
      ...setupStore.asyncReducers,
      ...{ [key]: slice.reducer },
    };
    // @ts-ignore
    const newReducer = createReducer(setupStore.asyncReducers);
    setupStore.replaceReducer(newReducer);
  }
  if (!("resetState" in slice.actions))
    throw new Error("resetState method not implemented!");
  if (initialState) setupStore.dispatch(slice.actions.resetState(initialState));

  return setupStore;
};
