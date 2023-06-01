import React from 'react'
import { useThemeMediaQuery } from '@kyros/hooks';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded/KyrosPageCarded';
import CustomLogoHead from './CustomLogoHead';
import CustomLogo from './CustomLogo';

function CustomLogoView() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    return (
     <KyrosPageCarded
     header={<CustomLogoHead />}
       content={<CustomLogo />}
       scroll={isMobile ? 'normal' : 'content'}
     />
  )
}

export default CustomLogoView