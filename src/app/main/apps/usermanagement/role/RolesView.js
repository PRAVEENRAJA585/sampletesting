import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles } from "@material-ui/core/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,   
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.common.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(role, permission, action) {
  return { role, permission, action };
}

const rows = [
  createData("Administrator"),
  createData(
    "Marketing User",
    "Marketing User Permissions",
    <button>
      <SettingsIcon fontSize="small" color="disabled" />
    </button>
  ),
  createData(
    "Sales Manager",
    "Sales Manager Permissions",
    <button>
      <SettingsIcon fontSize="small" color="disabled" />
    </button>
  ),
  createData(
    "Sales User",
    "Sales User Permissions",
    <button>
      <SettingsIcon fontSize="small" color="disabled" />
    </button>
  ),
];

const useStyles = makeStyles(({
  table: {
    minWidth: 700,
    border: "1px solid black",
  },
  cell: {
    borderBottom: "1px solid black",
  },
}));

export default function RolesView() {
  const classes = useStyles();
  return (
    <div class="ml-10 mt-10">
      <h1 class="text-2xl">
        Roles <HelpIcon fontSize="small" color="disabled" />
      </h1>
      <h1 class="text-sm" style={{ color: "gray" }}>
        Manage Permission Template For Roles
      </h1>
      <hr className="border-t-2 border-black-400 " />
      <TableContainer component={Paper} class="mt-10 mr-10">
        <Table
          sx={{ minWidth: 700 }}
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell align="left">
                Permission Templates
              </StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.role}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className={classes.cell}
                >
                  {row.role}
                </StyledTableCell>
                <StyledTableCell align="left" className={classes.cell}>
                  {row.permission}
                </StyledTableCell>
                <StyledTableCell align="right" className={classes.cell}>
                  {row.action}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
