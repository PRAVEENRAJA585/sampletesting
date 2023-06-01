// import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
// import Button from '@mui/material/Button';
// import { forwardRef, useState } from 'react';
// import clsx from 'clsx';
// import HolidayInput from './HolidayInput';

// const HolidaySelector = forwardRef(({ className,onChange }, ref) => {
//   const [holidays, setHolidays] = useState([{ holidayName: '', holidayDate: '' }]);

//   const handleAddHoliday = () => {
//     setHolidays([...holidays, { holidayName: '', holidayDate: '' }]);
//   };

//   const handleRemoveHoliday = (index) => {
//     const updatedHolidays = holidays.filter((_, i) => i !== index);
//     setHolidays(updatedHolidays);
//   };

//   const handleChangeHoliday = (index, updatedHoliday) => {
//     const updatedHolidays = holidays.map((holiday, i) =>
//       i === index ? { ...holiday, ...updatedHoliday } : holiday
//     );
//     setHolidays(updatedHolidays);
//   };

//   return (
    
//     <div className={clsx('w-full', className)} ref={ref}>
//       {holidays.map((item, index) => (
//         <HolidayInput
//           key={index}
//           value={item}
//           onChange={(val) => handleChangeHoliday(index, val)}
//           onRemove={() => handleRemoveHoliday(index)}
//           hideRemove={holidays.length === 1}
//         />
//       ))}
//       <Button
//         className="group inline-flex items-center mt-2 -ml-4 py-2 px-4 rounded cursor-pointer"
//         onClick={handleAddHoliday}
//       >
//         <KyrosSvgIcon size={20}>heroicons-solid:plus-circle</KyrosSvgIcon>
//         <span className="ml-8 font-medium text-secondary group-hover:underline">
//           Add a Holiday Name and Date
//         </span>
//       </Button>
//     </div>
//   );
// });

// export default HolidaySelector;//correct code


// import React, { forwardRef } from 'react';
// import { Controller } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
// import { DatePicker } from '@mui/x-date-pickers';
// import { format, isValid } from "date-fns";
// import { Button, IconButton } from '@mui/material';
// import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon/KyrosSvgIcon';

// const HolidaySelector = forwardRef(({ className, holidays,control, onChange }, ref) => {


//   const handleHolidayNameChange = (index, value) => {
//     const updatedHolidays = [...holidays];
//     updatedHolidays[index].holidayName = value;
//     onChange(updatedHolidays);
//   };

//   const handleHolidayDateChange = (index, date) => {
//     const formattedDate = isValid(date) ? format(date, "yyyy-MM-dd") : null;
//     const updatedHolidays = [...holidays];
//     updatedHolidays[index].holidayDate = formattedDate;
//     onChange(updatedHolidays);
//   };

//   const handleRemoveHoliday = (index) => {
//     const updatedHolidays = holidays.filter((_, i) => i !== index);
//     onChange(updatedHolidays);
//   };

//   const handleAddHoliday = () => {
//     const updatedHolidays = [...holidays, { holidayName: '', holidayDate: '' }];
//     onChange(updatedHolidays);
//   };

//   return (
//     <div className={className} ref={ref}>
//       {holidays?.map((holiday, index) => (
//         <div key={index} className="flex space-x-16 mb-16">
//           <Controller
//             name={`holidays[${index}].holidayName`}
//             control={control}
//             defaultValue={holiday.holidayName}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 className=""
//                 label="Name"
//                 variant="outlined"
//                 fullWidth
//                 onChange={(e) => handleHolidayNameChange(index, e.target.value)}
//               />
//             )}
//             rules={{ required: true }}
//           />
//           <Controller
//             name={`holidays[${index}].holidayDate`}
//             control={control}
//             defaultValue={holiday.holidayDate}
//             render={({ field: { onChange, value }, fieldState: { error } }) => (
//               <DatePicker
//                 disabledTextInput
//                 onChange={(date) => handleHolidayDateChange(index, date)}
//                 value={value ? new Date(value) : null}
//                 label="Date"
//                 PopperProps={{
//                   style: {
//                     zIndex: 9999,
//                     position: "absolute",
//                     marginTop: "10px",
//                   },
//                 }}
//                 error={!!error}
//                 helperText={error ? error.message : null}
//                 renderInput={(props) => (
//                   <TextField {...props} variant="outlined" fullWidth />
//                 )}
//               />
//             )}
//             rules={{ required: true }}
//           />
//           {(
//             <IconButton onClick={() => handleRemoveHoliday(index)}>
//               <KyrosSvgIcon size={20}>heroicons-solid:trash</KyrosSvgIcon>
//             </IconButton>
//           )}
//         </div>
//       ))}
//       <Button
//         className="group inline-flex items-center mt-2 -ml-4 py-2 px-4 rounded cursor-pointer"
//         onClick={handleAddHoliday}
//       >
//         <KyrosSvgIcon size={20}>heroicons-solid:plus-circle</KyrosSvgIcon>
//         <span className="ml-8 font-medium text-secondary group-hover:underline">
//           Add a Holiday Name and Date
//         </span>
//       </Button>
//     </div>
//   );
// });

// export default HolidaySelector;
import React, { forwardRef } from 'react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { format, isValid } from 'date-fns';
import { Button, IconButton } from '@mui/material';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon/KyrosSvgIcon';

const HolidaySelector = forwardRef(({ className,value,onChange }, ref) => {
  const { error,control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'holidays',
  });

  const handleAddHoliday = () => {
    append({ holidayName: '', holidayDate: '' });
  };

  const handleRemoveHoliday = (index) => {
    remove(index);
  };

  return (
    <div className={className} ref={ref}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-16 mb-16">
          <Controller
            name={`holidays[${index}].holidayName`}
            control={control}
            defaultValue={field.holidayName}
            render={({ field }) => (
              <TextField
                {...field}
                className=""
                label="Name"
                variant="outlined"
                fullWidth
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name={`holidays[${index}].holidayDate`}
            control={control}
            defaultValue={field.holidayDate}
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
          <IconButton onClick={() => handleRemoveHoliday(index)}>
            <KyrosSvgIcon size={20}>heroicons-solid:trash</KyrosSvgIcon>
          </IconButton>
        </div>
      ))}
      <Button
        className="group inline-flex items-center mt-2 -ml-4 py-2 px-4 rounded cursor-pointer"
        onClick={handleAddHoliday}
      >
        <KyrosSvgIcon size={20}>heroicons-solid:plus-circle</KyrosSvgIcon>
        <span className="ml-8 font-medium text-secondary group-hover:underline">
          Add a Holiday Name and Date
        </span>
      </Button>
    </div>
  );
});

export default HolidaySelector;

