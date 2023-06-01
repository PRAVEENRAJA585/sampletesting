import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { Autocomplete, Button, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import HelpIcon from "@mui/icons-material/Help";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const schema = yup.object().shape({
    name: yup.string().required("You must enter a name"),
});

function ContactTab() {
    // const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    //     {
    //         mode: "onChange",
    //         resolver: yupResolver(schema),
    //     }
    // );

    // const { isValid, dirtyFields, errors } = formState;
    const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;


    // const form = watch();
    const [options, setOptions] = useState([]);
 
    function isOptionEqualToValue(option, value) {
        return option === value || (option === "" && value === "");
    }
      
    return (
        <>
            <Controller
                name="fax"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Fax"
                        placeholder="Fax"
                        id="fax"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Phone"
                        placeholder="Phone"
                        id="phone"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="allowedUserEmailDomains"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Allowed User Email Domains"
                        placeholder="Allowed User Email Domains"
                        id="allowedUserEmailDomains"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

        </>
    );
}

export default ContactTab;
