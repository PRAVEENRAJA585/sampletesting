import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Teams from './teams/Teams';
import Role from './role/Role';
import LeadAssignmentQuota from './leadassignmentquota/LeadAssignmentQuota';
import LeaveTracking from './leavetracking/LeaveTracking';
import HolidayCalenders from './holidaycalender/holidaycalenders/HolidayCalenders';


const User = lazy(() => import('./user/User'));
const Users = lazy(() => import('./users/Users'));
const SalesGroups = lazy(() => import('./salesGroups/SalesGroups'));
const UserFieldsView = lazy(() => import('./userFields/UserFieldsView'));

const UserManagementAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/usermanagement/users',
      element: <Users />,
    },
    {
      path: 'apps/usermanagement/users/:userId/*',   
      element:<User />,
    },
    
    {
      path: 'apps/usermanagement/salesgroups',   
      element:<SalesGroups />,
    },
    {
      path: 'apps/usermanagement/userfields',   
      element:<UserFieldsView />,
    },
    {
      path: 'apps/usermanagement/role',   
      element:<Role />,
    },
    {
      path: 'apps/usermanagement/teams',   
      element:<Teams />,
    },
    {
      path: 'apps/usermanagement/leadassignmentquota',   
      element:<LeadAssignmentQuota />,
    },
    {
      path: 'apps/usermanagement/holidaycalendar',   
      element:<HolidayCalenders />,
    },
    {
      path: 'apps/usermanagement/leavetracker',   
      element:<LeaveTracking />,
    },
    
   
    {
      path: 'apps/usermanagement',
      element: <Navigate to="users" />,
    },
  ],
};

export default UserManagementAppConfig;
