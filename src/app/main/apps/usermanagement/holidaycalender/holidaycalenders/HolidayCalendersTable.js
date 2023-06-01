import React,{ useEffect, useState } from 'react';
import KyrosScrollbars from '@kyros/core/KyrosScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@kyros/core/withRouter';
import KyrosLoading from '@kyros/core/KyrosLoading';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import { getAddHolidayCalendars, selectAddHolidayCalendars, selectAddHolidayCalendarsSearchText } from '../../store/addHolidayCalendarsSlice';
import HolidayCalendersTableHead from './HolidayCalendersTableHead';

function HolidayCalendersTable(props) {
  const dispatch = useDispatch();
  const addHolidaycalendars = useSelector(selectAddHolidayCalendars);
  const searchText = useSelector(selectAddHolidayCalendarsSearchText);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(addHolidaycalendars);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });
 
  useEffect(() => {
    dispatch(getAddHolidayCalendars()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setData(addHolidaycalendars);

  }, [addHolidaycalendars]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(addHolidaycalendars, (item) => item.holidaycalenderName.toLowerCase().includes(searchText.toLowerCase()))
      );
      setPage(0);
    } else {
      setData(addHolidaycalendars);
    }
  }, [addHolidaycalendars, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.Id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/apps/usermanagement/holidaycalender/holidaycalenders/${item.holidaycalenderId}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <KyrosLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no holidaycalenders!
        </Typography>
      </motion.div>
    );
  }

 return (
    <div className="w-full flex flex-col min-h-full">
      <KyrosScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <HolidayCalendersTableHead
            selectedAddHolidayCalendarIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [order.addHolidayCalendarId,order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.holidaycalenderId) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.holidaycalenderId}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.holidaycalenderId)}
                      />
                    </TableCell> <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.calenderName}
                    </TableCell>
                     <TableCell className="p-4 md:p-16" component="th" scope="row">
                     {n.calenderYear && parseInt(n.calenderYear.replace(/\D/g, ''))}

                    </TableCell> 
                     
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.description}
                    </TableCell>
{/* 
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.holidayName}
                    </TableCell>
                    
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.holidayDate}
                    </TableCell> */}
                    {/* {n.holidays.map((holiday, index) => (
  <React.Fragment key={index}>
    <TableCell className="p-4 md:p-16" component="th" scope="row">
      {holiday.holidayName}
    </TableCell>
  
    <TableCell className="p-4 md:p-16" component="th" scope="row">
      {holiday.holidayDate}
    </TableCell>
  </React.Fragment>
))} */}
                    
                    
                    </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </KyrosScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(HolidayCalendersTable);