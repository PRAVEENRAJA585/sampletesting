import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectUserId(user) {
  return user.addManagerId;
}

export const getAddHolidaysCalendars = createAsyncThunk('userManagementApp/addHolidaysCalendars/getAddHolidaysCalendars', async () => {
  const response = await axios.get(`http://192.168.1.8/api/AddManager/GetAllManager`);
  const data = await response.data;
  return data;
});

export const removeAddHolidaysCalendars = createAsyncThunk(
  'userManagementApp/addHolidaysCalendars',
  async (userIds, { dispatch, getState }) => {
    await axios.delete(`http://192.168.1.8/api/User/DeleteUser?id=${userIds}`, { data: userIds.userId });
    return userIds;
  }

);

const addHolidaysCalendarsAdapter = createEntityAdapter({
  selectId: selectUserId,
});

export const { selectAll: selectAddHolidaysCalendars, selectById: selectAddHolidaysCalendarsById } =
  addHolidaysCalendarsAdapter.getSelectors((state) => state.userManagementApp.addHolidaysCalendars);

const addHolidaysCalendarsSlice = createSlice({
  name: 'userManagementApp/addHolidaysCalendars',
  initialState: addHolidaysCalendarsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setAddHolidaysCalendarsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getAddHolidaysCalendars.fulfilled]: addHolidaysCalendarsAdapter.setAll,
    [removeAddHolidaysCalendars.fulfilled]: (state, action) =>
      addHolidaysCalendarsAdapter.removeMany(state, action.payload),
  },
});

export const { setAddHolidaysCalendarsSearchText } = addHolidaysCalendarsSlice.actions;

export const selectAddHolidaysCalendarsSearchText = ({ userManagementApp }) => userManagementApp.addHolidaysCalendars.searchText;

export default addHolidaysCalendarsSlice.reducer;
