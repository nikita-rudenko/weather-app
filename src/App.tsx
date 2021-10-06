import { Box } from "@mui/system";
import LoadingView from "components/LoadingView";
import { getForecast } from "features/forecast";
import DailyForecastSlider from "features/forecast/components/DailyForecastSlider";
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
      }}
    >
      {isReady ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TempUnitSelector />

          {data.status !== "loading" && data.daily && (
            <DailyForecastSlider daily={data.daily} />
          )}
        </Box>
      ) : (
        <LoadingView />
      )}
    </Box>
  );
}

export default App;
