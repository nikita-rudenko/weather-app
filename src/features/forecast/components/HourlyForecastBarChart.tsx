import { useMemo } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useStoreSelector } from "store";

const HourlyForecastBarChart = () => {
  const activeDate = useStoreSelector((store) => store.forecast.activeDate)!;
  const hourly = useStoreSelector((store) => store.forecast.hourly)!;

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
