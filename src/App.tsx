import { Box } from "@mui/system";
import { getForecast } from "features/forecast";
import { useEffect } from "react";
import { useStoreDispatch, useStoreSelector } from "store";

function App() {
  const dispatch = useStoreDispatch();
  const data = useStoreSelector((state) => state.forecast);

  useEffect(() => {
    dispatch(getForecast("metric"));
  }, [dispatch]);

  return <Box>{data.status}</Box>;
}

export default App;
