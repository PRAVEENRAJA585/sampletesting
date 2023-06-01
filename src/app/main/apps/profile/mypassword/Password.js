import React from 'react'
import PasswordForm from './PasswordForm';
import { useThemeMediaQuery } from '@kyros/hooks';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded/KyrosPageCarded';
import PasswordHeader from './PasswordHeader';

function Password() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    return (
     <KyrosPageCarded
     header={<PasswordHeader />}
       content={<PasswordForm />}
       scroll={isMobile ? 'normal' : 'content'}
     />
  )
}

export default Password