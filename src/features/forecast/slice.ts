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
  daily: DailyForecast | null;
  hourly: HourlyForecastsByDay | null;
  error: any;
};

const initialState: ForecastState = {
  status: "initial",
  units: "metric",
  daily: null,
  hourly: null,
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
  },
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

export const selectUnits = (state: RootState) => state.forecast.units;

export const {
  actions: { setUnits },
} = forecastSlice;

export const { reducer } = forecastSlice;
