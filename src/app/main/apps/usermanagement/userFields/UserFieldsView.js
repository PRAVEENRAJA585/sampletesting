import React from 'react'
import { useThemeMediaQuery } from '@kyros/hooks';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded/KyrosPageCarded';
import UserFields from './UserFields';
import UserFieldsHeader from './UserFieldsHeader';

function UserFieldsView() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    return (
     <KyrosPageCarded
     header={<UserFieldsHeader />}
       content={<UserFields />}
       scroll={isMobile ? 'normal' : 'content'}
     />
  )
}

export default UserFieldsView