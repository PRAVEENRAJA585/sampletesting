import React from "react";
import KyrosPageCarded from '@kyros/core/KyrosPageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@kyros/hooks/useThemeMediaQuery';
import reducer from '../../store';
import HolidayCalendersTable from './HolidayCalendersTable';
import HolidayCalendersHeader from "./HolidayCalendersHeader";
import { FormProvider, useForm } from "react-hook-form";

function HolidayCalenders() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <KyrosPageCarded
      header={<HolidayCalendersHeader />}
      content={<HolidayCalendersTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('userManagementApp', reducer)(HolidayCalenders);