import React, { useEffect, useState } from 'react';
import KyrosScrollbars from '@kyros/core/KyrosScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@kyros/core/withRouter'
import KyrosLoading from '@kyros/core/KyrosLoading';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import { getSalesGroups, selectSalesGroups, selectSalesGroupsSearchText, selectSalesGroupsById } from '../store/salesGroupsSlice';
import SalesGroupTableHead from './SalesGroupTableHead';
import { getSalesGroup, selectSalesGroup } from '../store/salesGroupSlice';
import { CheckCircleOutline } from '@material-ui/icons';


function SalesGroupView(props) {
  const dispatch = useDispatch();
  const salesGroup = useSelector(selectSalesGroup);
  const salesGroups = useSelector(selectSalesGroups);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(salesGroups);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    salesGroupId: null,//changing id to salesGroup id
  });

  useEffect(() => {
    dispatch(getSalesGroups()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setData(salesGroups);
  }, [salesGroups]);

  function handleRequestSort(event, property) {
    const salesGroupId = property;
    let direction = 'desc'; //id changng to salesGroupid

    if (order.salesGroupId === property && order.salesGroupId === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      salesGroupId,//id changing to salesGroupId
    });
  }
  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.salesGroupId));
      return;
    }
    setSelected([]);

  }
  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/apps/userManagement/salesGroups/${item.salesGroupId}`);
  }

  function handleCheck(event, salesGroupId) {
    const selectedIndex = selected.indexOf(salesGroupId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, salesGroupId);
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

  // if (data.length === 0) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="text.secondary" variant="h5">
  //         There are no salesGroups!
  //       </Typography>
  //     </motion.div>
  //   );
  // }

  return (
    <div className="w-full flex flex-col min-h-full">
      <KyrosScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <SalesGroupTableHead
            selectedSalesGroupIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [order.salesGroupId, order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.salesGroupId) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.salesGroupId}
                    selected={isSelected}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.salesGroupId)}
                      />
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row" >
                      {/* {n.userId} */}
                      {/* {salesGroup?.user.firstName} */}
                      {n.salesGroupName}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.description}
                    </TableCell>
                    {/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.modifyallleadsofagroup.toString()}
                    </TableCell>
                  
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.adduserstogroup ? <CheckCircleOutline /> : ' '}
                    </TableCell> */}
                    {/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {<UserMenu />}
                    </TableCell> */}

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

export default withRouter(SalesGroupView);
