import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';

export const getSalesGroup = createAsyncThunk('userManagementApp/salesGroup/getSalesGroup', async (userId) => {

  const response = await axios.get(`http://192.168.1.8/api/SalesGroup/GetSalesGroupById${userId}`)

  const data = await response.data;

  return data === undefined ? " " : data;
});

export const removeSalesGroup = createAsyncThunk(
  'userManagementApp/salesGroup/removeSalesGroup',
  async (userId, { dispatch, getState }) => {
    const response = await axios.delete(`http://192.168.1.8/api/SalesGroup/DeleteSalesGroup?id=${userId}`);
    const data = await response.data;
    return data;
  }
);
export const saveSalesGroup = createAsyncThunk(
  'userManagementApp/salesGroup/saveSalesGroup',
  async (userData, { dispatch, getState }) => {
    const response = await axios.post(`http://192.168.1.8/api/Password/Register`, userData);
    const data = await response.data;
    return data;
  }
);

export const updateSalesGroup = createAsyncThunk(
  'userManagementApp/salesGroup/updateSalesGroup',
  async (userId, { dispatch, getState }) => {
    try {
      console.log(userId);
      const response = await axios.put(`http://192.168.1.8/api/SalesGroup/UpdateSalesGroup?id=${userId.userId}`, userId);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error.response);
      throw new Error(error.response.data.message);
    }
  }
);

const salesGroupSlice = createSlice({
  name: 'userManagementApp/salesGroup',
  initialState: null,
  reducers: {
    resetSalesGroup: () => null,
    newSalesGroup: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          salesGroupName: '',
          description: '',
          addManagerId: '',
          assignedUsersId: '',
                   
        },
      }),
    },
  },
  extraReducers: {
    [getSalesGroup.fulfilled]: (state, action) => action.payload,
    [saveSalesGroup.fulfilled]: (state, action) => action.payload,
    [updateSalesGroup.fulfilled]: (state, action) => action.payload,
    [removeSalesGroup.fulfilled]: (state, action) => null,
  },
});

export const { newSalesGroup, resetSalesGroup } = salesGroupSlice.actions;

export const selectSalesGroup = ({ userManagementApp }) => userManagementApp.salesGroup;

export default salesGroupSlice.reducer;
