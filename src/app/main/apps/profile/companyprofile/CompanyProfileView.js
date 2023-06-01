import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import KyrosSvgIcon from "@kyros/core/KyrosSvgIcon";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMyProfile, selectMyProfile } from "../store/myProfileSlice";
import withRouter from "@kyros/core/withRouter/withRouter";
import { getCompanyProfile, selectCompanyProfile } from "../store/companyProfileSlice";

function CompanyProfileView() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const routeParams = useParams();
  const dispatch = useDispatch();
  const companyProfile = useSelector(selectCompanyProfile);
  useEffect(() => {
      dispatch(getCompanyProfile(2));
  }, [dispatch, routeParams]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-32 w-full"
    >
      <div className="md:flex">
        <div className="flex flex-row md:ltr:pr-32 md:ltr:pl-32">
          <Card
            component={motion.div}
            variants={item}
            // style={{ border: "1px solid #bdbdbd" }}
            className="w-full mb-32"
            elevation={5}
          >
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                Basic Details
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Company Name
                </Typography>
                <Typography>{companyProfile?.companyName}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Date Format
                </Typography>
                <Typography>{companyProfile?.dateFormatType}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                 Phone No. Format
                </Typography>
                <Typography>{companyProfile?.phoneNoFormate}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                Default Country Code
                </Typography>
                <Typography>{companyProfile?.defaultCountryCode}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
               Default Currency
                </Typography>
                <Typography>{companyProfile?.defaultCurrencySymbol +'' + companyProfile?.defaultCurrencyAbbreviation +''+companyProfile?.defaultCurrencyName }</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                 Time Zone
                </Typography>
                <Typography>{companyProfile?.timezones}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                 Website
                </Typography>
                <Typography>{companyProfile?.website}</Typography>
              </div>

            </CardContent>
          </Card>

          <Card
            component={motion.div}
            variants={item}
            // style={{ border: "1px solid #bdbdbd" }}
            elevation={5}
            className="w-full mb-32 ml-32"
          >
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
               Address Details
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Street1
                </Typography>
                <Typography>{companyProfile?.street1}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Street2
                </Typography>
                <Typography>{companyProfile?.street2}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  City
                </Typography>
                <Typography>{companyProfile?.city}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                 State
                </Typography>
                <Typography>{companyProfile?.state}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                 Country
                </Typography>
                <Typography>{companyProfile?.country}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                 Zip
                </Typography>
                <Typography>{companyProfile?.zip}</Typography>
              </div>
              
            </CardContent>
          </Card>  
          <Card
            component={motion.div}
            variants={item}
            // style={{ border: "1px solid #bdbdbd" }}
            elevation={5}
            className="w-full mb-32 ml-32"
          >
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
               Contact Details
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                 Fax
                </Typography>
                <Typography>{companyProfile?.fax}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                 Phone
                </Typography>
                <Typography>{companyProfile?.phone}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                Allowed User Email Domains
                </Typography>
                <Typography>{companyProfile?. allowedUserEmailDomains}</Typography>
              </div>
              </CardContent>
              </Card>
              
        
        </div>
      </div>
    </motion.div>
  );
}

export default withRouter(CompanyProfileView);
