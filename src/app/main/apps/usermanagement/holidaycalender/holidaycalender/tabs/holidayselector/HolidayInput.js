import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { format, isValid } from "date-fns";

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  label: yup.string(),
});


const defaultValues = {
 holidays:''
};

function HolidayInput(props) {
  const { value, hideRemove } = props;
  const methods = useFormContext({
    mode: 'onChange',
    defaultValues,
  });
  const { reset, watch, control,handleSubmit, onChange, formState, getValues } = methods;
  // const { control, formState, handleSubmit, reset } = useFormContext({
  //   mode: 'onChange',
  //   defaultValues,
  //   resolver: yupResolver(schema),
  // });

  useEffect(() => {
    reset(value);
  }, [reset, value]);

  const { dirtyFields, errors } = formState;

  function onSubmit(data) {
    props.onChange(data);
  }

  return (
  
    <form className="flex space-x-16 mb-16"
      onChange={handleSubmit(onSubmit)}
     >
  
      <Controller
        control={control}
        name="holidayName"
        render={({ field }) => (
          <TextField
            {...field}
            className=""
            label="Name"
             variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="holidayDate"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            disabledTextInput
            onChange={(date) => {
              const formattedDate = isValid(date) ? format(date, "yyyy-MM-dd") : null;
              onChange(formattedDate);
            }}
            value={value ? new Date(value) : null}
            label="Date"
            PopperProps={{
              style: {
                zIndex: 9999,
                position: "absolute",
                marginTop: "10px",
              },
            }}
            error={!!error}
            helperText={error ? error.message : null}
            renderInput={(props) => (
              <TextField {...props} variant="outlined" fullWidth />
            )}
          />
        )}
        rules={{ required: true }}
      />
      {!hideRemove && (
        <IconButton onClick={props.onRemove}>
          <KyrosSvgIcon size={20}>heroicons-solid:trash</KyrosSvgIcon>
        </IconButton>
      )}
  {/* //     <button type="submit">Submit</button> */}
  </form> 

  )

}

HolidayInput.defaultProps = {
  hideRemove: false,
};

export default HolidayInput;
