import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as forecastReducer } from "features/forecast";

export const store = configureStore({
  reducer: {
    forecast: forecastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
