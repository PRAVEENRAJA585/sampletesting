import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectMyLeave } from '../store/myLeaveSlice';


const rows = [
  {
    id: 'reason',
    align: 'left',
    disablePadding: false,
    label: 'Reason',
    sort: true,
  },

  {
    id: 'leaveType',
    align: 'left',
    disablePadding: false,
    label: 'Partial',
    sort: true,
  },
  {
    id: 'from',
    align: 'left',
    disablePadding: false,
    label: 'From',
    sort: true,
  },

  {
    id: 'to',
    align: 'left',
    disablePadding: false,
    label: 'To',
    sort: true,
  },
  // {
  //   id: 'modifiedBy',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Modified By',
  //   sort: true,
  // },
  // {
  //   id: 'modifiedOn',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Modified On',
  //   sort: true,
  // },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    label: 'Action',
    sort: true,
  },
];

function MyLeaveTableHead(props) {
  const { selectedMyLeaveIds } = props;
  const numSelected = selectedMyLeaveIds.length;

  const [selectedMyLeavesMenu, setSelectedMyLeavesMenu] = useState(null);

  const dispatch = useDispatch();
  const myLeave = useSelector(selectMyLeave);

  

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedMyLeavesMenu(event) {
    setSelectedMyLeavesMenu(event.currentTarget);
  }

  function closeSelectedMyLeavesMenu() {
    setSelectedMyLeavesMenu(null);
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
          // className="w-40 md:w-64 text-center z-99"
        >
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
              // className="p-4 md:p-16"
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

export default MyLeaveTableHead;
