import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectUserId(user) {
  return user.leaveId;
}

export const getLeaveTrackings = createAsyncThunk('userManagementApp/leaveTrackings/getLeaveTrackings', async () => {
  const response = await axios.get(`http://192.168.1.8/api/MyLeave/GetallLeave`);
  const data = await response.data;

  return data;
});


const leaveTrackingsAdapter = createEntityAdapter({
  selectId: selectUserId,
  selectIds: (state) => Object.values(state.entities).map(entity => entity.leaveId),
});

export const { selectAll: selectLeaveTrackings, selectById: selectMyleavesById } =
  leaveTrackingsAdapter.getSelectors((state) => state.userManagementApp.leaveTrackings);

const leaveTrackingsSlice = createSlice({
  name: 'userManagementApp/leaveTrackings',
  initialState: leaveTrackingsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setLeaveTrackingsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getLeaveTrackings.fulfilled]: leaveTrackingsAdapter.setAll,
   
  },
});

export const { setLeaveTrackingsSearchText } = leaveTrackingsSlice.actions;


export const selectLeaveTrackingsSearchText = ({ userManagementApp }) => userManagementApp.leaveTrackings.searchText;

export default leaveTrackingsSlice.reducer;
