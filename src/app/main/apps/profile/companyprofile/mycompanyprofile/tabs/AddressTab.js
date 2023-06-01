import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { Autocomplete, Button, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import HelpIcon from "@mui/icons-material/Help";
// import withReducer from "app/store/withReducer";
// import reducer from "../store";
// import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useDeepCompareEffect } from "@kyros/hooks";
import { selectCountry } from "../../../store/countrySlice";
// import { getCompanyProfile } from "../../store/companyProfileSlice";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { selectCompanyProfile } from "../../../store/companyProfileSlice";


const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

function AddressTab() {
  // const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
  //   {
  //     mode: "onChange",
  //     resolver: yupResolver(schema),
  //   }
  // );
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  // const { isValid, dirtyFields, errors } = formState;

  // const form = watch();
  const routeParams = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const companyProfile = useSelector(selectCompanyProfile);
  const country = useSelector(selectCountry);
  const [noCompanyProfile, setNoCompanyProfile] = useState(false);

  function isOptionEqualToValue(option, value) {
    return option === value || (option === "" && value === "");
  }


  return (
    <>
            <Controller
              name="street1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  required
                  label="Street 1"
                  placeholder="Street 1"
                  id="street1"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
      
            <Controller
              name="street2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  required
                  label="Street 2"
                  placeholder="Street 2"
                  id="street2"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
        
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  required
                  label="City"
                  placeholder="City"
                  id="city"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
        
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  required
                  label="State"
                  placeholder="State"
                  id="state"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
       
            <Controller
              control={control}
              defaultValue={0}
              name="countryId"
              render={({ field: { onChange, value } }) => {
                return (
                  <Autocomplete
                    id="countryId"
                    isOptionEqualToValue={isOptionEqualToValue}
                    className="mt-5 mb-20"
                    options={country}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option ? option.countryName : " "
                    }
                    value={value ? _.find(country, { countryId: value }) : 0}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.countryId : 0);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        placeholder="Country"
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
              name="zip"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  required
                  label="Zip"
                  placeholder="Zip"
                  id="zip"
                  variant="outlined"
                  fullWidth
                />
              )}
           />       
                   
     
    </>
  );
}

export default AddressTab;
