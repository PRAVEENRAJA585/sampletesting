import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectUserId(user) {
  return user.addManagerId;
}

export const getAddManagers = createAsyncThunk('userManagementApp/addManagers/getAddManagers', async () => {
  const response = await axios.get(`http://192.168.1.8/api/AddManager/GetAllManager`);
  const data = await response.data;
  return data;
});

export const removeAddManagers = createAsyncThunk(
  'userManagementApp/addManagers',
  async (userIds, { dispatch, getState }) => {
    await axios.delete(`http://192.168.1.8/api/User/DeleteUser?id=${userIds}`, { data: userIds.userId });
    return userIds;
  }

);

const addManagersAdapter = createEntityAdapter({
  selectId: selectUserId,
});

export const { selectAll: selectAddManagers, selectById: selectAddManagersById } =
  addManagersAdapter.getSelectors((state) => state.userManagementApp.addManagers);

const addManagersSlice = createSlice({
  name: 'userManagementApp/addManagers',
  initialState: addManagersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setAddManagersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getAddManagers.fulfilled]: addManagersAdapter.setAll,
    [removeAddManagers.fulfilled]: (state, action) =>
      addManagersAdapter.removeMany(state, action.payload),
  },
});

export const { setAddManagersSearchText } = addManagersSlice.actions;

export const selectAddManagersSearchText = ({ userManagementApp }) => userManagementApp.addManagers.searchText;

export default addManagersSlice.reducer;
