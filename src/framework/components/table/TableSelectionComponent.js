import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function TableSelectionComponent({
  rows,
  columns,
  pageSize,
  setPageSize,
  loading,
  rowsPerPageOptions,
  onSelectionModelChange,
  fnPagination,
  selectionModel
}) {
  const onChange = (selection) => {
    if (onSelectionModelChange) {
      onSelectionModelChange(selection);
    }
  };

  const handleChangePage = (newPage) => {
    setPageSize({...pageSize, page: newPage + 1});
    fnPagination(pageSize.rowsPerPage, newPage + 1)

  };

  const handleChangeRowsPerPage = (newPageSize) => {
    setPageSize({...pageSize, rowsPerPage: newPageSize, page: 0})
    fnPagination(newPageSize, 1)
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize.rowsPerPage}
      rowCount={pageSize.count}
      loading={loading}
      selectionModel={selectionModel}
      rowsPerPageOptions={rowsPerPageOptions}
      paginationMode="server"
      onPageSizeChange={(newPageSize) => handleChangeRowsPerPage(newPageSize)}
      onPageChange={(newPage) => handleChangePage(newPage)}
      onSelectionModelChange={(newSelection) => onChange(newSelection)}
      checkboxSelection
      keepNonExistentRowsSelected
    />
  );
}
