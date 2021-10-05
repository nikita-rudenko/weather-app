import { stringify } from "query-string";

import { BASE_URL, DEFAULT_LOCATION, SECRET_KEY } from "./constants";
import { Units } from "./types";

const defaultQuery = {
  q: DEFAULT_LOCATION,
  appid: SECRET_KEY,
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
