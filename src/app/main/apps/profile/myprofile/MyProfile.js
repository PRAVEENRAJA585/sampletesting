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

function MyProfile() {
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
  const myProfile = useSelector(selectMyProfile);
  const { userId } = routeParams;

  useEffect(() => {
    dispatch(getMyProfile(1));
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
                  First Name
                </Typography>
                <Typography>{myProfile?.firstName}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Last Name
                </Typography>
                <Typography>{myProfile?.lastName}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Date Of Birth
                </Typography>
                <Typography>{myProfile?.dateOfBirth}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Email Address
                </Typography>
                <Typography>{myProfile?.emailAddress}</Typography>
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
                Personal Details
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Skills
                </Typography>
                <Typography>{myProfile?.skills}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Phone (Main)
                </Typography>
                <Typography>{myProfile?.phoneMain}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Phone (Mobile)
                </Typography>
                <Typography>{myProfile?.phoneMobile}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Phone (Others)
                </Typography>
                <Typography>{myProfile?.phoneOthers}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Date Format
                </Typography>
                <Typography>{myProfile?.dateFormatType}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Time Zone
                </Typography>
                <Typography>{myProfile?.timeZone}</Typography>
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
                Role Details
              </Typography>
            </div>

            <CardContent className="px-32 py-24">

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Role
                </Typography>
                <Typography>{myProfile?.roleName}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Reporting To
                </Typography>
                <Typography>{myProfile?.reportingTo?.firstName}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Designation
                </Typography>
                <Typography>{myProfile?.designation}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Old Team
                </Typography>
                <Typography>{myProfile?.oldTeam}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Department
                </Typography>
                <Typography>{myProfile?.department}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Sales Regions
                </Typography>
                <Typography>{myProfile?.salesRegions?.districtName}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Agent Phone Numbers
                </Typography>
                <Typography>{myProfile?.agentPhoneNumbers}</Typography>
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
                Work Details
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Team
                </Typography>
                <Typography>{myProfile?.team?.teamName}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Is Employee
                </Typography>
                <Typography>{myProfile?.employee}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Employee Id
                </Typography>
                <Typography>{myProfile?.employeeId}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Date Of Joining
                </Typography>
                <Typography>{myProfile?.dateOfJoining}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Date Of Resignation
                </Typography>
                <Typography>{myProfile?.dateOfResignation}</Typography>
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
                Location Details
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Location Name
                </Typography>
                <Typography>{myProfile?.locationName}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Address
                </Typography>
                <Typography>{myProfile?.address}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  City
                </Typography>
                <Typography>{myProfile?.city}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  State
                </Typography>
                <Typography>{myProfile?.state}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Country
                </Typography>
                <Typography>{myProfile?.countryName}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Zip Code
                </Typography>
                <Typography>{myProfile?.zipCode}</Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default MyProfile;
