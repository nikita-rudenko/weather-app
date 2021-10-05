type Date = string;

export type Forecast = {
  date: Date;
  time: string;
  temperature: number | null;
  weatherType: string;
  weatherIcon: string | null;
};

export type HourlyForecastsByDay = { [key: Date]: Forecast[] };

export type DailyForecast = { [key: Date]: Forecast };

export type Units =
  | "metric" // Celcius
  | "imperial"; // Fahrenheit;
