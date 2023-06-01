import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import { lighten } from '@mui/material/styles';
import { removeUsers } from '../store/usersSlice';

const rows = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'First Name',
    sort: true,
  },

  {
    id: 'phoneMobile',
    align: 'left',
    disablePadding: false,
    label: 'Phone Number',
    sort: true,
  },
  {
    id: 'emailAddress',
    align: 'left',
    disablePadding: false,
    label: 'Email ID',
    sort: true,
  },

  {
    id: 'employeeId',
    align: 'left',
    disablePadding: false,
    label: 'Employee Id',
    sort: true,
  },
];

function UsersTableHead(props) {
  const { selectedUserIds } = props;
  const numSelected = selectedUserIds.length;

  const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedUsersMenu(event) {
    setSelectedUsersMenu(event.currentTarget);
  }

  function closeSelectedUsersMenu() {
    setSelectedUsersMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.default,
              }}
            >
              <IconButton
                aria-owns={selectedUsersMenu ? 'selectedUsersMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedUsersMenu}
                size="large"
              >
                <KyrosSvgIcon>heroicons-outline:dots-horizontal</KyrosSvgIcon>
              </IconButton>
              <Menu
                id="selectedUsersMenu"
                anchorEl={selectedUsersMenu}
                open={Boolean(selectedUsersMenu)}
                onClose={closeSelectedUsersMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(removeUsers(selectedUserIds));
                      props.onMenuItemClick();
                      closeSelectedUsersMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <KyrosSvgIcon>heroicons-outline:trash</KyrosSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default UsersTableHead;
