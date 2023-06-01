import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';

export const getAddManager = createAsyncThunk('userManagementApp/addManager/getAddManager', async (userId) => {

  const response = await axios.get(`http://192.168.1.8/api/AddManager/GetManagerById?id=${userId}`)
  
  const data = await response.data;

  return data === undefined ? " " : data;
});

// export const removeAddManager = createAsyncThunk(
//   'userManagementApp/addManager/removeAddManager',
//   async (userId, { dispatch, getState }) => {
//     const response = await axios.delete(`http://192.168.1.8/api/AddManager/DeleteAddManager?id=${userId}`);
//     const data = await response.data;
//     return data;
//   }
// );
export const saveAddManager = createAsyncThunk(
  'userManagementApp/addManager/saveAddManager',
  async (userData, { dispatch, getState }) => {
    const response = await axios.post(`http://192.168.1.8/api/AddManager/AddingAddManager`, userData);
    const data = await response.data;
    return data;
  }
);

// export const updateAddManager = createAsyncThunk(
//   'userManagementApp/addManager/updateAddManager',
//   async (userId, { dispatch, getState }) => {
//     try {
//       console.log(userId);
//       const response = await axios.put(`http://192.168.1.8/api/AddManager/UpdateAddManager?id=${userId.userId}`, userId);
//       const data = await response.data;
//       return data;
//     } catch (error) {
//       console.error(error.response);
//       throw new Error(error.response.data.message);
//     }
//   }
// );

const addManagerSlice = createSlice({
  name: 'userManagementApp/addManager',
  initialState: null,
  reducers: {
    resetAddManager: () => null,
    newAddManager: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          userId: '',
          viewallleadsofagroup: '',
          modifyallleadsofagroup: '',
          adduserstogroup:'',

        
        },
      }),
    },
  },
  extraReducers: {
    [getAddManager.fulfilled]: (state, action) => action.payload,
    [saveAddManager.fulfilled]: (state, action) => action.payload,
    // [updateAddManager.fulfilled]: (state, action) => action.payload,
    // [removeAddManager.fulfilled]: (state, action) => null,
  },
});

export const { newAddManager, resetAddManager } = addManagerSlice.actions;

export const selectAddManager = ({ userManagementApp }) => userManagementApp.addManager;

export default addManagerSlice.reducer;
