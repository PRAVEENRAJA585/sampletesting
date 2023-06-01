import React from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import { Select } from '@mui/material';
import { selectMyProfile, updateMyProfile } from '../store/myProfileSlice';
import NavLinkAdapter from '@kyros/core/NavLinkAdapter/NavLinkAdapter';
import { useForm } from 'react-hook-form';
// import { selectUsersSearchText, setUsersSearchText } from '../store/usersSlice';

function ProfileHeader(props) {
  const dispatch = useDispatch();
  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
    //   resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();
  const myProfile = useSelector(selectMyProfile)
//   const searchText = useSelector(selectUsersSearchText);

function handleSaveUser() {
  // const { userId } = routeParams;
  // // if (userId === 'new') {
  // //   dispatch(saveUser(getValues())).then(() => {
  // //     navigate(`/apps/usermanagement/users`);
  // //   });
  // // } else {
  //   dispatch(updateMyProfile(getValues())).then(() => {
  //     Navigate(`/apps/profile/myprofile`);
  //   });
  // // }
}
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        My Profile
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className=""
            component={NavLinkAdapter}
            to=
            {`/apps/profile/myprofile/${myProfile?.userId}/edit`}
            variant="contained"
            color="secondary"
            // onclick={handleSaveUser}
            // startIcon={<KyrosSvgIcon>heroicons-outline:plus</KyrosSvgIcon>}
          >
            Edit
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfileHeader;
