import { stringify } from "query-string";

import { BASE_URL, DEFAULT_LOCATION } from "./constants";
import { Units } from "./types";

const defaultQuery = {
  q: DEFAULT_LOCATION,
  appid: process.env.REACT_APP_WEATHER_PROVIDER_KEY,
  cnt: 40,
};

export async function fetchForecast(units: Units) {
  return await fetch(
    `${BASE_URL}?${stringify({ ...defaultQuery, units })}`
  ).then((response) => {
    if (response.ok || (response.status >= 200 && response.status < 300)) {
      return response.json();
    } else {
      throw new Error("Something went wrong");
    }
  });
}
