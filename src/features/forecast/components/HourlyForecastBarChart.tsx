import { useMemo } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useStoreSelector } from "store";
import { selectForecastActiveDate, selectHourlyForecast } from "../slice";

const HourlyForecastBarChart = () => {
  const activeDate = useStoreSelector(selectForecastActiveDate)!;
  const hourly = useStoreSelector(selectHourlyForecast)!;

  const data = useMemo(() => {
    return hourly[activeDate!].map(({ temperature, time }) => {
      return {
        name: time.slice(0, -3),
        temperature,
      };
    });
  }, [activeDate, hourly]);

  return (
    <ResponsiveContainer width="99%">
      <BarChart height={40} data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="temperature" fill="#6d67dd" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HourlyForecastBarChart;
