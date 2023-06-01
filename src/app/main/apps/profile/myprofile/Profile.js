import React from 'react';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@kyros/hooks/useThemeMediaQuery';
import reducer from '../store';
import ProfileView from './ProfileView';
import ProfileHeader from './ProfileHeader';
import MyProfile from './MyProfile';

function Profile() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
   return (
    <KyrosPageCarded
      header={<ProfileHeader />}
      // content={<ProfileView />}
      content={<MyProfile/>}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('profileApp', reducer)(Profile);
