import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useStoreDispatch, useStoreSelector } from "store";
import { selectUnits, setActiveDate } from "../slice";

type DailyForecastCardProps = {
  date: string;
  weatherIcon: string | null;
  temperature: number | null;
};

const DailyForecastCard = ({
  date,
  temperature,
  weatherIcon,
}: DailyForecastCardProps) => {
  const dispatch = useStoreDispatch();
  const activeDate = useStoreSelector((state) => state.forecast.activeDate);
  const selectedUnits = useStoreSelector(selectUnits);

  const tempSymbol = useMemo(() => {
    if (selectedUnits === "imperial") return `°F`;
    if (selectedUnits === "metric") return `°C`;
    return "";
  }, [selectedUnits]);

  return (
    <Box>
      <Box
        onClick={() => dispatch(setActiveDate(date))}
        sx={{
          boxSizing: "border-box",
          borderRadius: "8px",
          py: "8px",
          px: "14px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          border: activeDate === date ? "2px solid purple" : "none",
          cursor: "pointer",
        }}
      >
        <Stack>
          <Typography textAlign="center">
            {dayjs(date).format("dddd")}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography variant="h4">
              {temperature || temperature === 0
                ? `${temperature}${tempSymbol}`
                : "-"}
            </Typography>

            <img
              width="70px"
              height="70px"
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="Weather condition"
            />
          </Stack>

          <Typography textAlign="center">
            {dayjs(date).format("DD MMM YYYY")}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default DailyForecastCard;
