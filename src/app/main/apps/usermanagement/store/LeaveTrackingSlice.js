import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';



export const getLeaveTracking = createAsyncThunk('userManagementApp/leaveTracking/getLeaveTracking', async (userId) => {

     const response = await axios.get(`http://192.168.1.8/api/LeaveTracking/GetLeaveById/${userId}`)
     const data = await response.data;
    console.log(data,"cha")

    return data === undefined ? " " : data;
});


export const saveLeaveTracking = createAsyncThunk(
    'userManagementApp/leaveTracking/saveLeaveTracking',
    async (userData, { dispatch, getState }) => {
        try {
            const response = await axios.post(`http://192.168.1.8/api/LeaveTracking/AddLeaveTracking`, userData);
            return response.data;
        } catch (error) {
            // Handle error here
            console.log('Error saving LeaveTracking:', error);
            throw error; // Rethrow the error so it can be caught by the rejected action
        }
    }
);

export const removeLeaveTracking = createAsyncThunk(
    'userManagementApp/leaveTracking/removeLeaveTracking',
    async (userId, { dispatch, getState }) => {
      const response = await axios.delete(`http://192.168.1.8/api/LeaveTracking/DeleteLeave?id=${userId}`);
      const data = await response.data;
      return data;
    }
  );
  
 const leaveTrackingSlice = createSlice({
    name: 'userManagementApp/leaveTracking',
    initialState: null,
    reducers: {
        resetLeaveTracking: () => null,
        newLeaveTracking: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    leaveType: '',
                    userId:'',
                    days: '',
                    from: '',
                    to: '',
                   reason:'',
                },
            }),
        },
    },
//    
    extraReducers: {
        [getLeaveTracking.fulfilled]: (state, action) => action.payload,
        // [updateLeaveTracking.fulfilled]: (state, action) => action.payload,

    },
});

export const { newLeaveTracking, resetLeaveTracking } = leaveTrackingSlice.actions;

export const selectLeaveTracking = ({ userManagementApp }) => userManagementApp.leaveTracking;

export default leaveTrackingSlice.reducer;
