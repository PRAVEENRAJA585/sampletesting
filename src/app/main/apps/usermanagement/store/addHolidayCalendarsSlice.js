import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectUserId(user) {
  return user.addManagerId;
}

export const getAddHolidayCalendars = createAsyncThunk('userManagementApp/addHolidayCalendars/getAddHolidayCalendars', async () => {
  const response = await axios.get(`http://192.168.1.8/api/Holiday/GetAllHoliday`);
  const data = await response.data;
  return data;
});

export const removeAddHolidayCalendars = createAsyncThunk(
  'userManagementApp/addHolidayCalendars',
  async (userIds, { dispatch, getState }) => {
    await axios.delete(`http://192.168.1.8/api/User/DeleteUser?id=${userIds}`, { data: userIds.userId });
    return userIds;
  }

);

const addHolidayCalendarsAdapter = createEntityAdapter({
  selectId: selectUserId,
});

export const { selectAll: selectAddHolidayCalendars, selectById: selectAddHolidayCalendarsById } =
  addHolidayCalendarsAdapter.getSelectors((state) => state.userManagementApp.addHolidayCalendars);

const addHolidayCalendarsSlice = createSlice({
  name: 'userManagementApp/addHolidayCalendars',
  initialState: addHolidayCalendarsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setAddHolidayCalendarsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getAddHolidayCalendars.fulfilled]: addHolidayCalendarsAdapter.setAll,
    [removeAddHolidayCalendars.fulfilled]: (state, action) =>
      addHolidayCalendarsAdapter.removeMany(state, action.payload),
  },
});

export const { setAddHolidayCalendarsSearchText } = addHolidayCalendarsSlice.actions;

export const selectAddHolidayCalendarsSearchText = ({ userManagementApp }) => userManagementApp.addHolidayCalendars.searchText;

export default addHolidayCalendarsSlice.reducer;
