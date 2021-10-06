import { RadioGroup, Stack, FormControlLabel, Radio } from "@mui/material";
import { useStoreDispatch, useStoreSelector } from "store";
import { getForecast } from "..";
import { selectUnits, setUnits } from "../slice";
import { Units } from "../types";

const TempUnitSelector = () => {
  const dispatch = useStoreDispatch();
  const selectedUnits = useStoreSelector(selectUnits);

  return (
    <RadioGroup
      value={selectedUnits}
      name="temp-unit"
      onChange={(_, unit) => {
        dispatch(setUnits(unit as Units));
        dispatch(getForecast());
      }}
    >
      <Stack direction="row">
        <FormControlLabel value="metric" control={<Radio />} label="Celcius" />
        <FormControlLabel
          value="imperial"
          control={<Radio />}
          label="Fahrenheit"
        />
      </Stack>
    </RadioGroup>
  );
};

export default TempUnitSelector;
