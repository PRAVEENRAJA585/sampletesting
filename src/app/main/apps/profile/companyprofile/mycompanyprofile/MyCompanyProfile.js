import React, { useEffect, useState } from 'react';
import KyrosLoading from '@kyros/core/KyrosLoading';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded';
import { useDeepCompareEffect } from '@kyros/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@kyros/hooks/useThemeMediaQuery';
import reducer from '../../store';
import { getCompanyProfile, newCompanyProfile, resetCompanyProfile, selectCompanyProfile } from '../../store/companyProfileSlice';
import { getDateFormat, selectDateFormat } from '../../store/dateFormatSlice';
import { getPhoneNoFormate, selectPhoneNoFormate } from '../../store/phoneNoFormateSlice';
import { getDefaultCountryCode, selectDefaultCountryCode } from '../../store/defaultCountryCodeSlice';
import { getCountry, selectCountry } from '../../store/countrySlice';
import MyCompanyProfileHeader from './MyCompanyProfileHead';
import BasicInfoTab from './tabs/BasicInfoTab';
import AddressTab from './tabs/AddressTab';
import ContactTab from './tabs/ContactTab';

const schema = yup.object().shape({
  firstName: yup
    .string('Please enter your first name')
    .required('You must enter a first name'),

});

function MyCompanyProfile(props) {
  const dispatch = useDispatch();
  const companyProfile = useSelector(selectCompanyProfile);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noCompanyProfile, setNoCompanyProfile] = useState(false);
  const dateFormat = useSelector(selectDateFormat);
  const phoneNoFormate = useSelector(selectPhoneNoFormate);
  const defaultCountryCode = useSelector(selectDefaultCountryCode);
  const country = useSelector(selectCountry);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, getValues } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateUserState() {
      const { companyProfileId } = routeParams;
      if (companyProfileId === 'new') {
        dispatch(newCompanyProfile());
      } else {
        dispatch(getCompanyProfile(companyProfileId)).then((action) => {
          if (!action.payload) {
            setNoCompanyProfile(true);
          }
        });
      }
    }
    updateUserState();
    dispatch(getCompanyProfile());
    dispatch(getDateFormat());
    dispatch(getPhoneNoFormate());
    dispatch(getDefaultCountryCode());
    dispatch(getCountry());
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!companyProfile) {
      return;
    }
    reset(companyProfile);
  }, [companyProfile, reset]);

  useEffect(() => {
    return () => {
      dispatch(resetCompanyProfile());
      setNoCompanyProfile(false);
    };
  }, [dispatch]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  return (
    <FormProvider {...methods}>
      <KyrosPageCarded
        header={<MyCompanyProfileHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-64 border-b-1' }}
            >
              <Tab className="h-64" label="Basic Info" />
              <Tab className="h-64" label="Address Details" />
              <Tab className="h-64" label="Contact Details" />
              </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>

              <div className={tabValue !== 1 ? 'hidden' : ''}>
                <AddressTab />
              </div>

              <div className={tabValue !== 2 ? 'hidden' : ''}>
                <ContactTab/>
              </div>
             
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('ProfileApp', reducer)(MyCompanyProfile);

