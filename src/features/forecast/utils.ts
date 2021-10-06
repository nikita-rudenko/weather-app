import { DailyForecast, Forecast, HourlyForecastsByDay } from "./types";

/**
 * Extracts forecast data used in UI
 */
export function normalizeForecasts(forecasts: any[]): Forecast[] {
  return forecasts.map((forecast) => {
    const [date, time] = forecast.dt_txt.split(" ");
    return {
      date,
      time,
      temperature: Math.round(forecast?.main?.temp) ?? null,
      weatherType: forecast?.weather[0]?.main ?? "Unknown",
      weatherIcon: forecast?.weather[0]?.icon ?? null,
    };
  });
}

/**
 * Groups hourly forecasts by day in a record
 */
export function groupForecastsByDay(
  forecasts: Forecast[]
): HourlyForecastsByDay {
  return forecasts.reduce((acc, forecast) => {
    const { date } = forecast;
    if (acc[date]) acc[date].push(forecast);
    else acc[date] = [forecast];
    return acc;
  }, {} as HourlyForecastsByDay);
}

/**
 * Creates a record of general forecasts for the days.
 * By default, the general forecast is taken from the forecast for midday (`12:00:00`).
 * If today's time is past midday, the general forecast is taken from the nearest one.
 * If the midday forecast for the last day is not available yet, the general forecast is taken from the farthest one.
 */
export function getDailyForecasts(forecastsRecord: HourlyForecastsByDay) {
  return Object.entries(forecastsRecord).reduce(
    (acc, [date, forecasts], index) => {
      const isTodayAfternoon =
        index === 0 && Number(forecasts[0].time.split(":")[0]) > 12;

      if (isTodayAfternoon) {
        acc[date] = forecasts[0];
      } else {
        acc[date] =
          forecasts.find((forecast) => forecast.time === "12:00:00")! ??
          forecasts[forecasts.length - 1];
      }

      return acc;
    },
    {} as DailyForecast
  );
}
