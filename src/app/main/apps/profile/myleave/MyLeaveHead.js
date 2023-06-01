import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete, Popper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveMyLeave } from "../store/myLeaveSlice";
import { motion } from "framer-motion";

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

export default function MyLeaveView() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
    }
  );

  const form = watch();
  const [days, setDays] = React.useState("");

  React.useEffect(() => {
    const fromDate = new Date(form.from);
    const toDate = new Date(form.to);
    const daysDiff = getBusinessDays(fromDate, toDate);
    setDays(daysDiff);
  }, [form.from, form.to]);

  function getBusinessDays(fromDate, toDate) {
    let count = 0;
    let currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  }

  const leave = [
    {
      id: 1,
      label: "FullDay",
    },
    {
      id: 2,
      label: "Partial",
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    const data = { ...getValues(), days };
    dispatch(saveMyLeave(data));
    setOpen(false);
  };

  const AutocompletePaper = React.forwardRef(
    ({ style, ...otherProps }, ref) => (
      <Popper
        {...otherProps}
        ref={ref}
        style={{
          ...style,
          zIndex: 9999,
          position: "absolute",
          marginTop: "10px",
        }}
      />
    )
  );

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        My Leave
      </Typography>

      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Add Leave
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
          New Leave
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Controller
            name="leaveType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                PopperComponent={AutocompletePaper}
                className="mt-8"
                options={leave || []}
                value={value || ""}
                onChange={(event, newValue) => {
                  onChange(newValue.label);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ m: 1, width: "62ch" }}
                    {...params}
                    id="leaveType"
                    label="Leave Type"
                    placeholder="Leave Type"
                    required
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={""}
            name="from"
            render={({ field }) => (
              <DatePicker
                {...field}
                variant="inline"
                format="DD/MM/YYYY"
                clearable
                PopperProps={{
                  style: {
                    zIndex: 9999,
                    position: "absolute",
                    marginTop: "10px",
                  },
                }}
                renderInput={(_props) => (
                  <TextField
                    sx={{ m: 1, width: "62ch" }}
                    {..._props}
                    className="mt-8"
                    id="from"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    label="From"
                    fullWidth
                    error={false}
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={""}
            name="to"
            render={({ field }) => (
              <DatePicker
                {...field}
                format="DD/MM/YYYY"
                className="mt-8"
                clearable
                PopperProps={{
                  style: {
                    zIndex: 9999,
                    position: "absolute",
                    marginTop: "10px",
                  },
                }}
                renderInput={(_props) => (
                  <TextField
                    sx={{ m: 1, width: "62ch" }}
                    {..._props}
                    className="mt-8"
                    id="to"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    label="To"
                    fullWidth
                    error={false}
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="days"
            render={({ field }) => (
              <TextField
                sx={{ m: 1, width: "62ch" }}
                {...field}
                className="mt-8"
                label="Days"
                value={days}
              />
            )}
          />
          <Controller
            control={control}
            name="reason"
            render={({ field }) => (
              <TextField
                sx={{ m: 1, width: "62ch" }}
                {...field}
                className="mt-8"
                variant="outlined"
                label="Reason"
                placeholder="Reason"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
