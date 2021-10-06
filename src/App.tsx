import { Box } from "@mui/system";
import { getForecast } from "features/forecast";
import DailyForecastSlider from "features/forecast/components/DailyForecastSlider";
import TempUnitSelector from "features/forecast/components/TempUnitSelector";
import { useEffect } from "react";
import { useStoreDispatch, useStoreSelector } from "store";

function App() {
  const dispatch = useStoreDispatch();
  const data = useStoreSelector((state) => state.forecast);

  useEffect(() => {
    dispatch(getForecast());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TempUnitSelector />

      {data.status === "idle" && data.daily && (
        <DailyForecastSlider daily={data.daily} />
      )}
    </Box>
  );
}

export default App;
