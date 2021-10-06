import Slider from "react-slick";
import DailyForecastCard from "./DailyForecastCard";
import { DailyForecast } from "../types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

function DailyForecastSlider({ daily }: { daily: DailyForecast }) {
  return (
    <Slider
      infinite={false}
      speed={500}
      slidesToShow={3}
      arrows
      responsive={[
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
    >
      {Object.values(daily).map(({ date, temperature, weatherIcon }) => {
        return (
          <DailyForecastCard
            key={date}
            date={date}
            temperature={temperature}
            weatherIcon={weatherIcon}
          />
        );
      })}
    </Slider>
  );
}

export default DailyForecastSlider;
