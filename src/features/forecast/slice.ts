import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchForecast } from "./api";
import { DailyForecast, HourlyForecastsByDay, Units } from "./types";
import {
  getDailyForecasts,
  groupForecastsByDay,
  normalizeForecasts,
} from "./utils";

type ForecastState = {
  status: "idle" | "loading" | "failed";
  daily: DailyForecast | null;
  hourly: HourlyForecastsByDay | null;
  error: any;
};

const initialState: ForecastState = {
  status: "idle",
  daily: null,
  hourly: null,
  error: null,
};

export const getForecast = createAsyncThunk(
  "forecast/get5Day3Hour",
  async (units: Units, { rejectWithValue }) => {
    try {
      return await fetchForecast(units);
    } catch (error) {
      return rejectWithValue({ error: (error as Error).message });
    }
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getForecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        const forecasts = normalizeForecasts(action.payload.list);
        const hourlyForecastsByDay = groupForecastsByDay(forecasts);
        const dailyForecasts = getDailyForecasts(hourlyForecastsByDay);

        state.status = "idle";
        state.hourly = hourlyForecastsByDay;
        state.daily = dailyForecasts;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { reducer } = forecastSlice;
