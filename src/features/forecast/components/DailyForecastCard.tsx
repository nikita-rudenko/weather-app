import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";

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
  return (
    <Box>
      <Box
        sx={{
          boxSizing: "border-box",
          borderRadius: "8px",
          py: "8px",
          px: "14px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <Stack>
          <Typography textAlign="center">
            {dayjs(date).format("dddd")}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography variant="h4">
              {temperature || temperature === 0 ? `${temperature}°C` : "-"}
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
