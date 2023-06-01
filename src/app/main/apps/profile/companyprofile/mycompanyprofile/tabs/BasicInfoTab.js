import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { Autocomplete, Button, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import HelpIcon from "@mui/icons-material/Help";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { selectDateFormat } from "../../../store/dateFormatSlice";
import { selectPhoneNoFormate } from "../../../store/phoneNoFormateSlice";
import { selectDefaultCountryCode } from "../../../store/defaultCountryCodeSlice";
import { selectCompanyProfile } from "../../../store/companyProfileSlice";

const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

function BasicInfoTab() {
  // const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
  //   {
  //     mode: "onChange",
  //     resolver: yupResolver(schema),
  //   }
  // );

  // const { isValid, dirtyFields, errors } = formState;
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;


  // const form = watch();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const dateFormat = useSelector(selectDateFormat);
  const phoneNoFormate = useSelector(selectPhoneNoFormate);
  const defaultCountryCode = useSelector(selectDefaultCountryCode);
  const companyProfile = useSelector(selectCompanyProfile);
  const [noCompanyProfile, setNoCompanyProfile] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  function isOptionEqualToValue(option, value) {
    return option === value || (option === "" && value === "");
  }

  const timezones = [
    { label: "(GMT-12:00) International Date Line West" },

    {
      label: "(GMT-11:00) Coordinated Universal Time-11",
    },
    {
      label: "(GMT-10:00) Hawaii",
    },
    {
      label: "(GMT-09:00) Alaska",
    },
    {
      label: "(GMT-08:00) Pacific Time (US & Canada)",
    },
    {
      label: "(GMT-07:00) Arizona",
    },
    {
      label: "(GMT-07:00) Mountain Time (US & Canada)",
    },
    {
      label: "(GMT-06:00) Central Time (US & Canada)",
    },
    {
      label: "(GMT-05:00) Eastern Time (US & Canada)",
    },
    {
      label: "(GMT-04:00) Atlantic Time (Canada)",
    },
    {
      label: "(GMT-03:30) Newfoundland",
    },
    {
      label: "(GMT-03:00) Brasilia",
    },
    {
      label: "(GMT-02:00) Coordinated Universal Time-02",
    },
    {
      label: "(GMT-01:00) Azores",
    },
    {
      label: "(GMT+00:00) London, Dublin, Edinburgh",
    },
    {
      label: "(GMT+01:00) Berlin, Vienna, Rome",
    },
    {
      label: "(GMT+02:00) Athens, Istanbul, Jerusalem",
    },
    {
      label: "(GMT+03:00) Moscow, St. Petersburg, Volgograd",
    },
    {
      label: "(GMT+03:30) Tehran",
    },
    {
      label: "(GMT+04:00) Dubai, Abu Dhabi, Muscat",
    },
    {
      label: "(GMT+04:30) Kabul",
    },
    {
      label: "(GMT+05:00) Islamabad, Karachi, Tashkent",
    },
    {
      label: "(GMT+05:30) Chennai, Kolkata, Mumbai",
    },
    {
      label: "(GMT+05:45) Kathmandu",
    },
    {
      label: "(GMT+06:00) Astana, Dhaka",
    },
    {
      label: "(GMT+06:30) Yangon (Rangoon)",
    },
    {
      label: "(GMT+07:00) Bangkok, Hanoi, Jakarta",
    },
    {
      label: "(GMT+08:00) Beijing, Hong Kong, Kuala Lumpur",
    },
    {
      label: "(GMT+08:45) Eucla",
    },
    {
      label: "(GMT+09:00) Tokyo, Seoul, Osaka",
    },
    {
      label: "(GMT+09:30) Adelaide",
    },
    {
      label: "(GMT+10:00) Canberra, Sydney, Melbourne",
    },
    {
      label: "(GMT+10:00) Brisbane",
    },
    {
      label: "(GMT+10:00) Hobart",
    },
    {
      label: "(GMT+10:00) Vladivostok",
    },
    {
      label: "(GMT+10:00) Guam, Port Moresby",
    },
    {
      label: "(GMT+11:00) Magadan, Solomon Islands, New Caledonia",
    },
    {
      label: "(GMT+12:00) Fiji Islands, Kamchatka, Marshall Islands",
    },
    {
      label: "(GMT+12:00) Auckland, Wellington",
    },
    {
      label: "(GMT+13:00) Nuku'alofa",
    },
  ];
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // useDeepCompareEffect(() => {
  //   function updateUserState() {
  //     const { userId } = routeParams;
  //     dispatch(getCompanyProfile(userId));
  //   }

  //   updateUserState();
  //   dispatch(getDateFormat());
  //   dispatch(getPhoneNoFormate());
  //   dispatch(getDefaultCountryCode());
  //   dispatch(getCountry());
  // }, [dispatch]);

  // console.log(companyProfile);

  // useEffect(() => {
  //   if (!companyProfile) {
  //     return;
  //   }
  //   reset(companyProfile);
  // }, [companyProfile, reset]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetCompanyProfile());
  //     setNoCompanyProfile(false);
  //   };
  // }, [dispatch]);

  // function handleSaveProfile() {
  //   dispatch(updateCompanyProfile(getValues()));
  // }

  // const [expanded, setExpanded] = React.useState(false);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  return (
    <>
      <Controller
        name="companyName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8"
            required
            autoFocus
            label="Company Name"
            placeholder="Company Name"
            id="companyName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        control={control}
        name="dateFormatId"
        render={({ field: { onChange, value } }) => {
          const options = dateFormat.map((option) => ({
            value: option.dateFormatId,
            label: option.dateFormatType || "",
          }));
          return (
            <Autocomplete
              id="dateFormatId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-16"
              options={dateFormat}
              disableCloseOnSelect
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              getOptionLabel={(option) =>
                option ? option.dateFormatType : " "
              }
              value={value ? _.find(dateFormat, { dateFormatId: value }) : null}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.dateFormatId : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Date Format"
                  placeholder="Date Format"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="phoneNoFormateId"
        defaultValue={0}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              id="phoneNoFormateId"
              className="mt-16"
              options={phoneNoFormate}
              disableCloseOnSelect
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              getOptionLabel={(option) =>
                option ? option.countryCode + ", " + option.number : ""
              }
              value={
                value ? _.find(phoneNoFormate, { phoneNoFormateId: value }) : 0
              }
              isOptionEqualToValue={isOptionEqualToValue}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.phoneNoFormateId : 0);
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Phone No. Format"
                  placeholder="Phone No. Format"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />

      <Controller
        control={control}
        defaultValue={0}
        name="defaultCountryCodeId"
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              id="defaultCountryCodeId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-16"
              options={defaultCountryCode}
              disableCloseOnSelect
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              getOptionLabel={(option) =>
                option ? option.countryName + ", " + option.countryCode : ""
              }
              value={
                value
                  ? _.find(defaultCountryCode, {
                      defaultCountryCodeId: value,
                    })
                  : 0
              }
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.defaultCountryCodeId : 0);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Default Country Code"
                  placeholder="Country Code"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />

      <div class="text-md font-medium flex mt-16">
        <Accordion
          style={{ boxShadow: "none", border: "1px solid #bdbdbd", width: '500ch' }}
          expanded={expanded === "panel"}
          onChange={handleChange("panel")}
        >
          <AccordionSummary
            className="ml-20"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "50ch", height: "3ch", flexShrink: 0 }}>
              Default Currency
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "row" }}>
            <div class="text-md font-medium ">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    width: "20ch",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                  name=" defaultCurrencySymbol"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="ml-20"
                      required
                      label="Symbol"
                      placeholder="Symbol"
                      id=" defaultCurrencySymbol"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </div>
            <div class="text-md font-medium ">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    width: "20ch",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                  name="defaultCurrencyAbbreviation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="ml-20"
                      required
                      label="Abbreviation"
                      placeholder="Abbreviation"
                      id="defaultCurrencyAbbreviation"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </div>
            <div class="text-md font-medium">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "20ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                  name="defaultCurrencyName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="ml-20"
                      required
                      label="Name"
                      placeholder="Name"
                      id="defaultCurrencyName"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <Controller
        name="timeZone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-16"
            options={timezones || []}
            error={!!errors.timeZone}
            helperText={errors?.timeZone?.message}
            value={value || ""}
            onChange={(event, newValue) => {
              onChange(newValue.label);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Time Zone"
                placeholder="Time Zone"
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
        name="website"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-16"
            label="Website"
            placeholder="Website"
            required
            id="website"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </>
  );
}

export default BasicInfoTab;
