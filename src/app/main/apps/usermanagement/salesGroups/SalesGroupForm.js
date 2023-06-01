import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Popper } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { Autocomplete } from "@mui/material";
import { getUsers, selectUsers } from "../store/usersSlice";
import { useSelector } from "react-redux";
import { useDeepCompareEffect } from "@kyros/hooks";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAddManager, saveAddManager, selectAddManager } from "../store/addManagerSlice";
import { getSalesGroup } from "../store/salesGroupSlice";
import AddManagerView from "./AddManagerView";
import { useEffect } from "react";
import axios from "axios";
import SalesGroupView from "./SalesGroupView";
import { motion } from "framer-motion";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(name, viewLeads, modifyLeads, addUser) {
//   return { name, viewLeads, modifyLeads, addUser };
// }

// const rows = [
//   createData("Example", "Exapmle", "Exapmle", "Exapmle"),
//   createData("Exapmle", "Exapmle", "Exapmle", "Exapmle"),
 
// ];


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    borderRadius: "50%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listBoxContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const options = ["Arun", "Chandra", "Gokul", "Sabari"];

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function SalesGroupForm() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);

  const [addOpen, setAddOpen] = React.useState(false);

  const { control, watch, reset, handleSubmit, formState, getValues, onChange } = useForm(
    {
      mode: "onChange",
      // resolver: yupResolver(schema), 
    }
  );
  const dispatch = useDispatch();
 
  // const addManager = useSelector(selectAddManager)
  const routeParams = useParams();
  
  function isOptionEqualToValue(option, value) {
    return option === value || (option === "" && value === "");
  }

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();
  const addManager = useSelector(selectAddManager)
  // const rows = Array.isArray(addManager) ? addManager.map((group) => {
  //   return createData(group.user, group.viewallleadsofagroup, group.modifyallleadsofagroup, group. adduserstogroup);
  // }) : [];
  React.useEffect(() => {
    if (Array.isArray(addManager)) {
      const newRows = addManager.map((group) => {
        return {
          userId: group.userId,
          viewallleadsofagroup: group.viewallleadsofagroup,
          modifyallleadsofagroup: group.modifyallleadsofagroup,
          adduserstogroup: group.adduserstogroup,
        };
      });
    
      setRows(newRows);
    }
  }, [addManager]);

  useDeepCompareEffect(() => {
    function updateUserState() {
      const { userId } = routeParams;
     
      dispatch (getAddManager(2))
    }
    updateUserState();
    // // dispatch(getUsers()); //implement
    dispatch(getUsers(getValues()));
  }, [dispatch, routeParams]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddClickOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const handleAddManagerSave = () => {
    dispatch(saveAddManager(getValues()))
      // .then(() => {
        // navigate('/apps/usermanagement/salesgroups');
    // });
    setAddOpen(false);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dialogStyle = {
    height: "500px",
  };

  const classes = useStyles();
  // const [leftItems, setLeftItems] = useState(options);
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [leftFilter, setLeftFilter] = useState("");
  const [rightFilter, setRightFilter] = useState("");
  const users = useSelector(selectUsers);
  useEffect(() => {
   
    axios.get("http://192.168.1.8/api/User/GetAll")
      .then((response) => {
       
        const data = response.data;
        setLeftItems(data);
      })
      .catch((error) => {
        console.error("Error fetching left items:", error);
      });
  }, []);
  


  const handleMoveRight = () => {
    const selectedItems = document.querySelectorAll(
      `.${classes.list} .Mui-selected`
    );
    const items = Array.from(selectedItems).map((item) => item.textContent);
    const newLeftItems = leftItems.filter((item) => !items.includes(item));
    setLeftItems(newLeftItems);
    setRightItems([...rightItems, ...items]);
  };

  const handleMoveLeft = () => {
    const selectedItems = document.querySelectorAll(
      `.${classes.list} .Mui-selected`
    );

    const items = Array.from(selectedItems).map((item) => item.textContent);
    const newRightItems = rightItems.filter((item) => !items.includes(item));
    setRightItems(newRightItems);
    setLeftItems([...leftItems, ...items]);
  };

  const handleListItemClick = (event) => {
    event.target.classList.toggle("Mui-selected");
  };

  const handleLeftFilterChange = (event) => {
    const filterText = event.target.value;
    setLeftFilter(filterText);
    setLeftItems(
      options.filter((item) =>
        item.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  };

  const handleRightFilterChange = (event) => {
    const filterText = event.target.value;
    setRightFilter(filterText);
    setRightItems(
      options.filter((item) =>
        item.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  };

  const [checked, setChecked] = React.useState([]);
  // const [left, setLeft] = React.useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  
  useEffect(() => {
    setLeft(leftItems);
    setRight(rightItems);
  }, [leftItems, rightItems]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    setChecked([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  // const handleCheckedRight = () => {
  //   setRight([...right, ...leftChecked]);
  //   setLeft(left.filter((item) => !leftChecked.includes(item)));
  //   setChecked(not(checked, leftChecked));
  // };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.id}-label`;
          return (
            <ListItem key={value.id} role="listitem" onClick={handleToggle(value)}>
              <ListItemText disableTypography id={labelId} primary={`${value.firstName}`} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
  // const customList = (items) => (
  //   <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
  //     <List dense component="div" role="list">
  //       {items.map((value) => {
  //         const labelId = `transfer-list-item-${value}-label`;
  //         return (
  //           <ListItem key={value} role="listitem" onClick={handleToggle(value)}>
  //             <ListItemText disableTypography id={labelId} primary={`List item ${value + 1}`} />
  //           </ListItem>
  //         );
  //       })}
  //     </List>
  //   </Paper>
  // );

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
    <React.Fragment>
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        Holiday Calendar
      </Typography>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>
      {/* <SalesGroupView /> */}
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle>Create Sales Group</DialogTitle>
        <DialogContent dividers style={dialogStyle}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Sales Group Details" {...a11yProps(0)} />
                <Tab label="Managers" {...a11yProps(1)} />
                <Tab label="Sales Users" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "55ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="text-md font-medium flex">
                  <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
                    Sales Group Name
                  </div>
                  <div className=" text-left ">
                    <Controller
                      name="salesGroupName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          sx={{ m: 1, width: "40ch" }}
                          className="mt-8 mb-16"
                          id="salesGroupName"
                          variant="outlined"
                          label="Sales Group Name"
                          fullWidth
                          placeholder="Sales Group Name"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="text-md font-medium flex">
                  <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
                    Description
                  </div>
                  <div className=" text-left ">
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          multiline
                          rows={6}
                          sx={{ m: 1, width: "40ch" }}
                          className="mt-8 mb-16"
                          id="description"
                          label="Description"
                          variant="outlined"
                          placeholder="Description"
                          fullWidth
                        />
                      )}
                    />
                  </div>
                </div>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">
                        View Leads
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Modify Leads
                      </StyledTableCell>
                      <StyledTableCell align="right">Add User</StyledTableCell>
                     
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.userId}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.viewallleadsofagroup.toString()}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.modifyallleadsofagroup.toString()}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.adduserstogroup.toString()}
                        </StyledTableCell>
                       
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer> */}
              <AddManagerView />
              <DialogActions>
                <Button variant="outlined" onClick={handleAddClickOpen}>
                  Add Manager
                </Button>
              </DialogActions>
              <div>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={addOpen}
                >
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleAddClose}
                  >
                    Add Manager To This Group
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    {/* <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 400,
                      }}
                    > */}
                    {/* <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Type To Search"
                        inputProps={{ "aria-label": "search google maps" }}
                      /> */}
                    {/* </Paper> */}
                    <Controller
                      control={control}
                      name="userId"
                      defaultValue={0}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Autocomplete
                            id="userId"
                            PopperComponent={AutocompletePaper}
                            className="mt-8 mb-24"
                            size="small"
                            options={users}
                            getOptionSelected={(option, value) => option.value === value.value}
                            getOptionLabel={(option) => option ? option.firstName + " " + option.lastName : ' '}
                            value={value ? _.find(users, { userId: value }) : ''}
                            isOptionEqualToValue={isOptionEqualToValue}
                            onChange={(event, newValue) => {
                              onChange(newValue ? newValue.userId : '');
                            }}
                            renderInput={(params) => <TextField
                              sx={{ m: 1, width: "35ch" }}
                              {...params}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />} />
                        );
                      }}
                    />

          <div>  
      <Controller
        name="viewallleadsofagroup"
        defaultValue={false}
        control={control}
         render={({ field }) => (
          <Checkbox
            {...field}
            color="primary"
            label="Yes"
            // inputProps={{ "aria-label": "employee checkbox" }}
            inputProps={{ "aria-label": "employee checkbox" }}
            
            checked={field.value}
          />
        )}
      />
        View All Leads of a Group
        </div>
        <div>
                    <Controller
        name="modifyallleadsofagroup"
        defaultValue={false}
        control={control}
         render={({ field }) => (
          <Checkbox
            {...field}
            color="primary"
            label="Yes"
            inputProps={{ "aria-label": "modifyallleads" }}
            checked={field.value}
          />
        )}
      />
     Modify All Leads Of A Group
       </div>        
        <div>
                    <Controller
        name="adduserstogroup"
        defaultValue={false}
        control={control}
         render={({ field }) => (
          <Checkbox
            {...field}
            color="primary"
            label="Yes"
            inputProps={{ "aria-label": "addUserstoGroup" }}
            checked={field.value}
          />
        )}
      />
     Add Users To Group
       </div>        
                    {/* <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        name="viewAllLeadsofaGroup"
                        label="View All Leads Of A Group"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        name="modifyallleads"
                        label="Modify All Leads Of A Group"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        name="addUserstoGroup"
                        label="Add Users To Group"
                      />
                    </FormGroup> */}
                   
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleAddManagerSave} >
                      Save 
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>{customList(left)}</Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleAllRight}
                      disabled={left.length === 0}
                      aria-label="move all right"
                    >
                      ≫
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleAllLeft}
                      disabled={right.length === 0}
                      aria-label="move all left"
                    >
                      ≪
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList(right)}</Grid>
              </Grid>
            </TabPanel>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save
          </Button>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  );
}
