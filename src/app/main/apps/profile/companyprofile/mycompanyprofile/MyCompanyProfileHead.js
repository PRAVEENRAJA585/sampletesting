import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useForm, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import { saveCompanyProfile, selectCompanyProfile, updateCompanyProfile } from '../../store/companyProfileSlice';
import { useSelector } from 'react-redux';

function MyCompanyProfileHeader(props) {
  const dispatch = useDispatch();
  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
    }
  );

  const form = watch();
  const theme = useTheme();
  const navigate = useNavigate();
  const companyProfile = useSelector(selectCompanyProfile)
  
  const routeParams = useParams();
  const { companyProfileId } = routeParams;
  function handleSaveCompanyProfile() {
    // if (companyProfileId === 'new') {
    //   dispatch(saveCompanyProfile(getValues())).then(() => {
    //     navigate(`/apps/profile/companyprofiles`);
    //   });
    // } else {
      const data = {...getValues(), companyProfileId }
      dispatch(updateCompanyProfile(data))
       .then(() => {
        navigate(`/apps/profile/companyprofile`);
      });
    // }
  }

  function handleRemoveCompanyProfile() {
        navigate('/apps/profile/companyprofile');

  
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/profile/companyProfile"
            color="inherit"
          >
            <KyrosSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </KyrosSvgIcon>
            <span className="flex mx-4 font-medium">CompanyProfiles</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || 'New CompanyProfile'}
            </Typography>
            <Typography variant="caption" className="font-medium">
              CompanyProfile Detail
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={handleRemoveCompanyProfile}
          style={{
            WebkitAppearance: "button",
            backgroundColor: "rgb(55, 48, 163)",
            backgroundImage: "none",
          }}
          startIcon={<KyrosSvgIcon className="sm:flex">heroicons-outline:trash</KyrosSvgIcon>}
        >
         Cancel
        </Button>
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          // disabled={
          //   !formState.dirtyFields.firstName || !formState.dirtyFields.lastName || !formState.dirtyFields.emailAddress || !formState.dirtyFields.roleId || !formState.dirtyFields.phoneMobile || !formState.dirtyFields.companyProfileTypeId || !formState.dirtyFields.reportingToId}
          onClick={handleSaveCompanyProfile}
          style={{
            WebkitAppearance: "button",
            backgroundColor: "rgb(55, 48, 163)",
            backgroundImage: "none",
          }}
        >
          Save
        </Button>
      </motion.div>
    </div>
  );
}

export default MyCompanyProfileHeader;
