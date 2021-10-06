import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

import { fetchForecast } from "./api";
import { DailyForecast, HourlyForecastsByDay, Units } from "./types";
import {
  getDailyForecasts,
  groupForecastsByDay,
  normalizeForecasts,
} from "./utils";

type ForecastState = {
  status: "initial" | "idle" | "loading" | "failed";
  units: Units;
  daily: DailyForecast;
  hourly: HourlyForecastsByDay;
  activeDate: string | null;
  error: any;
};

const initialState: ForecastState = {
  status: "initial",
  units: "metric",
  daily: {},
  hourly: {},
  activeDate: null,
  error: null,
};

export const getForecast = createAsyncThunk<any, void, { state: RootState }>(
  "forecast/get5Day3Hour",
  async (_, { rejectWithValue, getState }) => {
    try {
      const units = getState().forecast.units;
      return await fetchForecast(units);
    } catch (error) {
      return rejectWithValue({ error: (error as Error).message });
    }
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setUnits: (state, action: PayloadAction<Units>) => {
      state.units = action.payload;
    },
    setActiveDate: (state, action: PayloadAction<string>) => {
      state.activeDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getForecast.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        const forecasts = normalizeForecasts(action.payload.list);
        const hourlyForecastsByDay = groupForecastsByDay(forecasts);
        const dailyForecasts = getDailyForecasts(hourlyForecastsByDay);

        state.status = "idle";
        state.hourly = hourlyForecastsByDay;
        state.activeDate = Object.keys(hourlyForecastsByDay)[0];
        state.daily = dailyForecasts;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const selectDailyForecast = (state: RootState) => state.forecast.daily;
export const selectHourlyForecast = (state: RootState) => state.forecast.hourly;
export const selectUnits = (state: RootState) => state.forecast.units;
export const selectForecastFetchStatus = (state: RootState) =>
  state.forecast.status;
export const selectForecastActiveDate = (state: RootState) =>
  state.forecast.activeDate;

export const {
  actions: { setUnits, setActiveDate },
} = forecastSlice;

export const { reducer } = forecastSlice;
