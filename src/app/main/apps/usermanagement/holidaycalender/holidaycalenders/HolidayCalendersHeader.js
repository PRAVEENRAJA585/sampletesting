import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import { Controller, FormProvider, useForm } from "react-hook-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import HolidayCalenderInfoTab from "../holidaycalender/tabs/HolidayCalenderInfoTab";
import HolidayTab from "../holidaycalender/tabs/HolidayTab";
import { resetAddHolidayCalendar, saveAddHolidayCalendar, selectAddHolidayCalendar } from "../../store/addHolidayCalendarSlice";
import withReducer from "app/store/withReducer";
import reducer from "../../store";
import { makeStyles } from "@material-ui/core";
import { selectAddHolidayCalendarsSearchText, setAddHolidayCalendarsSearchText } from "../../store/addHolidayCalendarsSlice";
import HolidaySelector from "../holidaycalender/tabs/holidayselector/HolidaySelector";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paper": {
      minWidth: 400,
    },
  },
}));

function HolidayCalendersHeader(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchText = useSelector(selectAddHolidayCalendarsSearchText);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const { reset, watch, control, onChange, formState, getValues } = methods;
 // const {getValues} = useForm()
  //const calenderName = watch("calenderName");

    
  const form = watch();
  const [open, setOpen] = React.useState(false);
  const [noAddHolidayCalendar, setNoAddHolidayCalendar] = useState(false);
  const addHolidayCalendar = useSelector(selectAddHolidayCalendar);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
   // dispatch(addHolidayCalender(getValues()))
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
 
  const { isValid, dirtyFields, errors } = formState;

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = (data) => {
    dispatch(saveAddHolidayCalendar(getValues()))
    console.log(getValues()); 
    setOpen(false);// handle form submission here
  };

  useEffect(() => {
    if (!addHolidayCalendar) {
      return;
    }
    reset(addHolidayCalendar);
  }, [addHolidayCalendar, reset]);

  useEffect(() => {
    return () => {
      dispatch(resetAddHolidayCalendar());
      setNoAddHolidayCalendar(false);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        HolidayCalenders
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <KyrosSvgIcon color="disabled">heroicons-solid:search</KyrosSvgIcon>

          <Input
            placeholder="Search holidaycalenders"
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={(ev) => dispatch(setAddHolidayCalendarsSearchText(ev))}
          />
        </Paper>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        ><Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>
     
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create Holiday Calendar
        </BootstrapDialogTitle>
        <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab className="h-64" label="Holiday Calender Info" />
                <Tab className="h-64" label="Holiday" />
              </Tabs>
            </Box>
            <div className={value !== 0 ? 'hidden' : ''}>
                <HolidayCalenderInfoTab />
              </div>
              <div className={value !== 1 ? 'hidden' : ''}>
              {/* <Controller
          control={control}
          name="Holidays"
          render={({ field }) => <HolidaySelector className="mt-32" {...field} />}
        /> */}
        <HolidayTab control={methods.control}/>
       
              </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button  type="submit" autoFocus >
            Save
          </Button>
        </DialogActions>
        </form>
        </FormProvider>
      </BootstrapDialog>
        </motion.div>
      </div>
    </div>
  );
}

export default withReducer('userManagementApp', reducer)(HolidayCalendersHeader);
