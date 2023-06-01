import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import HelpIcon from "@mui/icons-material/Help";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import { getMyPassword, saveMyPassword } from "../store/myPasswordSlice";
import { selectMyPassword } from "../store/myPasswordSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyProfile, selectMyProfile } from "../store/myProfileSlice";

const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});


function PasswordForm() {
  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    // {
    //   mode: "onChange",
    //   resolver: yupResolver(schema),
    // }
    {
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
          Currentpassword: "",
          NewPassword: "",
          ConfirmPassword: "",
        },
      }
  );

  const handleCancelPassword= () => {
    reset();
  };

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myPassword = useSelector(selectMyPassword);

  useEffect(() => {
    dispatch(getMyPassword(1));
  }, [dispatch]);

  const email = myPassword?.emailAddress;

  function handleSavePassword() {
    const data = { ...getValues(), email };
    dispatch(saveMyPassword(data)).then(() => {
      navigate("/apps/profile/mypassword");
    });
  }
  
  

  return (
    <>
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="text-md font-medium ml-20 pt-20 flex">
            <Controller
              name="Currentpassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8"
                  label="Current Password"
                  placeholder="Current Password"
                  required
                  autoFocus
                  id="currentpassword"
                  variant="outlined"
                />
              )}
            />
          </div>

          <div className="text-md font-medium ml-20 pt-20 flex">
            <Controller
              name="NewPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-8"
                  label="New Password"
                  placeholder="New Password"
                  required
                  id="NewPassword"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div className="text-md font-medium ml-20 pt-20 flex">
            <Controller
              name="ConfirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-10"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  required
                  id="confirmPassword"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div className="ml-20 pt-20">
            <Button
              className="ml-25 mr-20"
              variant="contained"
              color="secondary"
              onClick={handleSavePassword}
              style={{
                WebkitAppearance: "button",
                backgroundColor: "rgb(55, 48, 163)",
                backgroundImage: "none",
              }}
            >
              Save
            </Button>
            <Button
              className="ml-25 "
              variant="contained"
              color="secondary"
              onClick={handleCancelPassword}
              style={{
                WebkitAppearance: "button",
                backgroundColor: "rgb(55, 48, 163)",
                backgroundImage: "none",
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}

export default withReducer("profileApp", reducer)(PasswordForm);
