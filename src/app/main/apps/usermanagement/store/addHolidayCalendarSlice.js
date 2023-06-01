import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';

export const getAddHolidayCalendar = createAsyncThunk('userManagementApp/addHolidayCalendar/getAddHolidayCalendar', async (userId) => {

  const response = await axios.get(`http://192.168.1.8/api/Holiday/GetHolidayById/${userId}`)
  
  const data = await response.data;

  return data === undefined ? " " : data;
});

// export const removeAddHolidayCalendar = createAsyncThunk(
//   'userManagementApp/addHolidayCalendar/removeAddHolidayCalendar',
//   async (userId, { dispatch, getState }) => {
//     const response = await axios.delete(`http://192.168.1.8/api/AddHolidayCalendar/DeleteAddHolidayCalendar?id=${userId}`);
//     const data = await response.data;
//     return data;
//   }
// );
export const saveAddHolidayCalendar = createAsyncThunk(
  'userManagementApp/addHolidayCalendar/saveAddHolidayCalendar',
  async (userData, { dispatch, getState }) => {
    const response = await axios.post(`https://636499fa8a3337d9a2fa509b.mockapi.io/userReacttoolkit`, userData);
    const data = await response.data;
    return data;
  }
);

// export const updateAddHolidayCalendar = createAsyncThunk(
//   'userManagementApp/addHolidayCalendar/updateAddHolidayCalendar',
//   async (userId, { dispatch, getState }) => {
//     try {
//       console.log(userId);
//       const response = await axios.put(`http://192.168.1.8/api/AddHolidayCalendar/UpdateAddHolidayCalendar?id=${userId.userId}`, userId);
//       const data = await response.data;
//       return data;
//     } catch (error) {
//       console.error(error.response);
//       throw new Error(error.response.data.message);
//     }
//   }
// );

// const addHolidayCalendarSlice = createSlice({
//   name: 'userManagementApp/addHolidayCalendar',
//   initialState: null,
//   reducers: {
//     resetAddHolidayCalendar: () => null,
//     newAddHolidayCalendar: {
//       reducer: (state, action) => action.payload,
//       prepare: (event) => ({
//         payload: {
//           calenderName: '',
//           calenderYear: '',
//           description: '',
//           holidayName: '',
//           holidayDate: '',
//         },
//       }),
//     },
//   },

  const addHolidayCalendarSlice = createSlice({
  name: 'userManagementApp/addHolidayCalendar',
  initialState: {
    calenderName: '',
    calenderYear: '',
    description: '',
    holidays: [],
  },
  reducers: {
    resetAddHolidayCalendar: () => ({
      calenderName: '',
      calenderYear: '',
      description: '',
      holidays: [],
    }),
    newAddHolidayCalendar: {
      reducer: (state, action) => action.payload,
      prepare: () => ({
        payload: {
          calenderName: '',
          calenderYear: '',
          description: '',
          holidays: [],
        },
      }),
    },
  },
  extraReducers: {
    [getAddHolidayCalendar.fulfilled]: (state, action) => action.payload,
    [saveAddHolidayCalendar.fulfilled]: (state, action) => action.payload,
    // [updateAddHolidayCalendar.fulfilled]: (state, action) => action.payload,
    // [removeAddHolidayCalendar.fulfilled]: (state, action) => null,
  },
});

export const { newAddHolidayCalendar, resetAddHolidayCalendar } = addHolidayCalendarSlice.actions;

export const selectAddHolidayCalendar = ({ userManagementApp }) => userManagementApp.addHolidayCalendar;

export default addHolidayCalendarSlice.reducer;
