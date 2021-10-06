import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import LoadingView from "components/LoadingView";
import { getForecast } from "features/forecast";
import DailyForecastSlider from "features/forecast/components/DailyForecastSlider";
import HourlyForecastBarChart from "features/forecast/components/HourlyForecastBarChart";
import TempUnitSelector from "features/forecast/components/TempUnitSelector";
import useDelayedLoading from "hooks/useDelayedLoading";
import { useEffect } from "react";
import { useStoreDispatch, useStoreSelector } from "store";

function App() {
  const dispatch = useStoreDispatch();
  const data = useStoreSelector((state) => state.forecast);

  useEffect(() => {
    dispatch(getForecast());
  }, [dispatch]);

  const isReady = useDelayedLoading(data.status !== "loading");

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
      {isReady ? (
        <Stack
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TempUnitSelector />

          {data.status !== "loading" && data.daily && (
            <DailyForecastSlider daily={data.daily} />
          )}

          <Box sx={{ height: "400px", width: "100%", pt: 5 }}>
            <HourlyForecastBarChart />
          </Box>
        </Stack>
      ) : (
        <LoadingView />
      )}
    </Box>
  );
}

export default App;
