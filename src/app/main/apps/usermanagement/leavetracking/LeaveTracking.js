import React from 'react'
import { useThemeMediaQuery } from '@kyros/hooks';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded/KyrosPageCarded';
import LeaveTrackingHead from './LeaveTrackingHead';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import LeaveTrackingView from './LeaveTrackingView';


function LeaveTracking() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
<KyrosPageCarded
 header={<LeaveTrackingHead />}
content={<LeaveTrackingView/>}
scroll={isMobile ? 'normal' : 'content'}
/>
);
}

export default withReducer('userManagementApp', reducer)(LeaveTracking);