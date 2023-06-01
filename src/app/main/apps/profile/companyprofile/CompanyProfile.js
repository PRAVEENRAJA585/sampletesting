import React from 'react'
import { useThemeMediaQuery } from '@kyros/hooks';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded/KyrosPageCarded';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import CompanyProfileHeader from './CompanyProfileHeader';
import CompanyProfileView from './CompanyProfileView';

function CompanyProfile() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
<KyrosPageCarded
 header={<CompanyProfileHeader />}
content={<CompanyProfileView/>}
scroll={isMobile ? 'normal' : 'content'}
/>
);
}

export default withReducer('profileApp', reducer)(CompanyProfile);