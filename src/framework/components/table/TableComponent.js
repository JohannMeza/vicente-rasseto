import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Grid } from '@mui/material';

export default function TableComponents({ children, pagination, setPagination, fnPagination, style }) {
  const handleChangePage = (event, newPage) => {
    let dataId = event.target.dataset.testid;
    if (dataId === "KeyboardArrowRightIcon") {
      setPagination({ ...pagination, page: newPage })
      let { rowsPerPage, page } = pagination;
      fnPagination && fnPagination(rowsPerPage, page + 2)
    } 
    
    if (dataId === "KeyboardArrowLeftIcon") {
      setPagination({ ...pagination, page: newPage })
      let { rowsPerPage, page } = pagination;
      fnPagination && fnPagination(rowsPerPage, page - 2)
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, rowsPerPage: +event.target.value, page: 0 })
    fnPagination && fnPagination(event.target.value, 1)
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 440, overflow: "auto", ...style }} className="style-table">
        {children}
      </TableContainer>      
      {pagination && 
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pagination.count}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      }
    </>
  );
}