import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectUserId(user) {
  return user.salesGroupId;
}

export const getSalesGroups = createAsyncThunk('userManagementApp/salesGroups/getSalesGroups', async () => {
  const response = await axios.get(`http://192.168.1.8/api/User/GetAll`);
  const data = await response.data;

  return data;
});

export const removeSalesGroups = createAsyncThunk(
  'userManagementApp/salesGroups',
  async (userIds, { dispatch, getState }) => {
    await axios.delete(`http://192.168.1.8/api/User/DeleteUser?id=${userIds}`, { data: userIds.userId });
    return userIds;
  }

);

const salesGroupsAdapter = createEntityAdapter({
  selectId: selectUserId,
});

export const { selectAll: selectSalesGroups, selectById: selectUserById } =
  salesGroupsAdapter.getSelectors((state) => state.userManagementApp.salesGroups);

const salesGroupsSlice = createSlice({
  name: 'userManagementApp/salesGroups',
  initialState: salesGroupsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSalesGroupsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getSalesGroups.fulfilled]: salesGroupsAdapter.setAll,
    [removeSalesGroups.fulfilled]: (state, action) =>
      salesGroupsAdapter.removeMany(state, action.payload),
  },
});

export const { setSalesGroupsSearchText } = salesGroupsSlice.actions;

export const selectSalesGroupsSearchText = ({ userManagementApp }) => userManagementApp.salesGroups.searchText;

export default salesGroupsSlice.reducer;
