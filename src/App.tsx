import { useEffect } from "react";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

import { useStoreDispatch, useStoreSelector } from "store";
import LoadingView from "components/LoadingView";
import {
  DailyForecastSlider,
  getForecast,
  HourlyForecastBarChart,
  TempUnitSelector,
} from "features/forecast";
import useDelayedLoading from "hooks/useDelayedLoading";
import ErrorView from "components/ErrorView";
import { selectForecastFetchStatus } from "features/forecast/slice";

function App() {
  const dispatch = useStoreDispatch();
  const status = useStoreSelector(selectForecastFetchStatus);

  useEffect(() => {
    dispatch(getForecast());
  }, [dispatch]);

  const isReady = useDelayedLoading(
    status !== "initial" && status !== "loading"
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        maxWidth: "700px",
        mx: "auto",
      }}
    >
      {!isReady && <LoadingView />}

      {isReady && status === "failed" && (
        <ErrorView title="Something went wrong" />
      )}

      {isReady && status !== "failed" && (
        <Stack
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TempUnitSelector />
          <DailyForecastSlider />
          <Box sx={{ height: "400px", width: "100%", pt: 5 }}>
            <HourlyForecastBarChart />
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export default App;
