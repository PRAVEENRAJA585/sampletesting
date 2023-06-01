import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { InputAdornment, useAutocomplete, Checkbox ,FormControl, FormControlLabel, FormLabel,Radio, RadioGroup} from '@mui/material';
import { DatePicker,TimePicker } from "@mui/x-date-pickers";
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import _ from '@lodash';
import { format, isValid } from "date-fns";
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { method } from "lodash";
import HolidaySelector from "./holidayselector/HolidaySelector";

function HolidayCalenderInfoTab(props) {
  const methods = useFormContext();
  const { control, watch, reset, handleSubmit, formState, getValues } = methods
  const { errors } = formState;
  let dirty = false;
  const { multiple, value, onChange, ...autocompleteProps } = useAutocomplete({...props,});
  dirty = dirty || (multiple ? value.length > 0 : value !== null);

   return (
      <div>
       <div
        className="flex -mx-4">
        <Controller
        name="CalenderYear"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
          className="mt-8 mb-16"
          views={["year"]}
          label="Calender Year"
          value={value ? new Date(value) : null}
          onChange={(date) => {
            onChange(isValid(date) ? format(date, "yyyy") : null);
          }}
          animateYearScrolling
            PopperProps={{
              placement: "bottom-start",
              style: {
                zIndex: 9999
              },
            }}
            renderInput={(props) => (
              <TextField {...props} variant="outlined" fullWidth />
            )}
            />
          )}
        />
       </div>
       <div
        className="flex -mx-4">
        <Controller
              name="calenderName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  required
                  label="Calender Name"
                  placeholder="Calender Name"
                  id="calenderName"
                  variant="outlined"
                  fullWidth
                />
              )}
            /></div>
       <div
        className="flex -mx-4">
         <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  required
                  label="Description"
                  placeholder="Description"
                  id="description"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
       </div>
       
</div>
  );
}

export default HolidayCalenderInfoTab;