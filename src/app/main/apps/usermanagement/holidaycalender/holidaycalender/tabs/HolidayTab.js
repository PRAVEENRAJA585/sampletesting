// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   IconButton,
//   Button,
//   makeStyles,
// } from "@material-ui/core";
// import DateRangeIcon from "@material-ui/icons/DateRange";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { useFormContext } from "react-hook-form";

// const useStyles = makeStyles({
//   input: {
//     width: "100%",
//   },
//   dateInput: {
//     display: "flex",
//     alignItems: "center",
//   },
//   dateIcon: {
//     marginRight: "0.5rem",
//   },
// });

// function EditableRow({ rowData, handleInputChange, handleDeleteRow }) {
//   const classes = useStyles();

//   const { id, name, date } = rowData;

//   return (
//     <TableRow>
//       <TableCell component="th" scope="row">
//         {/* <TextField
//           name="holidayName"
//           value={name}
//           className={classes.input}
//           onChange={(event) => handleInputChange(event, id)}
//         /> */}
//       </TableCell>
//       <TableCell>
//         <div className={classes.dateInput}>
//           <DateRangeIcon className={classes.dateIcon} />
//           <TextField
//             name="holidayDate"
//             type="date"
//             placeholder="Date"
//             value={date}
//             className={classes.input}
//             onChange={(event) => handleInputChange(event, id)}
//           />
//         </div>
//       </TableCell>
//       <TableCell>
//         <IconButton onClick={() => handleDeleteRow(id)}>
//           <DeleteIcon />
//         </IconButton>
//       </TableCell>
//     </TableRow>
//   );
// }

// function HolidayList() {
//   const methods = useFormContext();
//   const { control, watch, reset, handleSubmit, formState, getValues } = methods
//   const [rows, setRows] = useState([{ id: 1, name: "", date: "" }]);
//   const [saveDisabled, setSaveDisabled] = useState(true);

//   const handleInputChange = (event, id) => {
//     const { name, value } = event.target;
//     const updatedRows = rows.map((row) =>
//       row.id === id ? { ...row, [name]: value } : row
//     );
//     setRows(updatedRows);
//     setSaveDisabled(false);
//   };

//   const handleAddRow = () => {
//     const newRow = { id: rows.length + 1, name: "", date: "" };
//     setRows([...rows, newRow]);
//   };

//   const handleDeleteRow = (id) => {
//     const updatedRows = rows.filter((row) => row.id !== id);
//     setRows(updatedRows);
//   };

//   const handleSaveChanges = () => {
//     setSaveDisabled(true);
//   };

//   return (
//     <div>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((rowData) => (
//               <EditableRow
//                 key={rowData.id}
//                 rowData={rowData}
//                 handleInputChange={handleInputChange}
//                 handleDeleteRow={handleDeleteRow}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Button onClick={handleAddRow}>Add Row</Button>
//       <Button onClick={handleSaveChanges} disabled={saveDisabled}>
//         Save Changes
//       </Button>
//     </div>
//   );
// }

// export default HolidayList;


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import HolidaySelector from './holidayselector/HolidaySelector';
import { useDispatch } from 'react-redux';
import { newAddHolidayCalendar } from '../../../store/addHolidayCalendarSlice';
import { useState } from 'react';

function HolidayTab(props) {
  const methods = useFormContext();
  const { control, formState, handleSubmit, getValues } = methods;
  const dispatch = useDispatch();
  // const [value, setHolidays] = useState([]);
  const [holidays, setHolidays] = useState([{ holidayName: '', holidayDate: '' }]);

  
  const handleChangeHolidays = (updatedHolidays) => {
    setHolidays(updatedHolidays);
  };
     
  return (
    <div>
     
     <Controller
          control={control}
          name="holidays"
          render={({ field}) => <HolidaySelector holidays={holidays} onChange={handleChangeHolidays} className="mt-32" {...field} />}
        />
                
    </div>
  );
}

export default HolidayTab;//correct code
// import React, { useState } from 'react';
// import { useForm, useFormContext } from 'react-hook-form';
// import HolidaySelector from './holidayselector/HolidaySelector';

// const HolidayTab = () => {
//   const [holidays, setHolidays] = useState([{ holidayName: '', holidayDate: '' }]);
//   const { handleSubmit, control } = useFormContext();
//   // const methods = useFormContext();
//   // const { control, formState, handleSubmit, getValues } = methods;
//   const handleHolidayChange = (updatedHolidays) => {
//     setHolidays(updatedHolidays);
//   };

//   const onSubmit = (data) => {
//     // Access the updated holidays array here
//     const { holidays } = data;
//     console.log(holidays);
//   };

//   return (
//     <div>
//         <HolidaySelector
//           className="mt-32"
//           holidays={holidays}
//           onChange={handleHolidayChange}
          
//         />
//     </div>
//   );
// };

// export default HolidayTab;
