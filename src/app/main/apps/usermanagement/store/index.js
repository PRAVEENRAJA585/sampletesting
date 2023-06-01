import { combineReducers } from '@reduxjs/toolkit';
import user from './userSlice';
import users from './usersSlice';
import reportingTo from './reportingToSlice';
import role from './roleSlice';
import userType from './userTypeSlice';
import timeZone from './timeZoneSlice';
import dateFormat from './dateFormatSlice';
import team from './teamSlice';
import holidayCalender from './holidayCalenderSlice';
import workDayTemplate from './workDayTemplateSlice';
import country from './countrySlice';
import salesRegions from './salesRegionsSlice';
import salesGroup from './salesGroupSlice';
import addManager from './addManagerSlice';
import addManagers from './addManagersSlice';
import salesGroups from './salesGroupsSlice';
import addHolidayCalendar from './addHolidayCalendarSlice';
import addHolidayCalendars from './addHolidayCalendarsSlice';
import leaveTracking from './LeaveTrackingSlice';
import leaveTrackings from './LeaveTrackingsSlice';


const reducer = combineReducers({
  users,
  user,
  reportingTo,
  role,
  userType,
  timeZone,
  dateFormat,
  team,
  holidayCalender,
  workDayTemplate,
  country,
  salesRegions, 
  salesGroup,
  salesGroups,
  addManager,
  addManagers,
  addHolidayCalendar,
  addHolidayCalendars,
  leaveTracking,
  leaveTrackings,
  
    
});

export default reducer;
