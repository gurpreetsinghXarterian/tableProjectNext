"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { columns, employees } from "@/data/employees";
import { Employee } from "@/types/Employee";

export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState<Employee[]>(employees);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, rowId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleDeleteRow = () => {
    if (selectedRowId !== null) {
      setData((prevData) => prevData.filter((row) => row.id !== selectedRowId));
      setSelectedRows((prevSelected) => prevSelected.filter((id) => id !== selectedRowId));
    }
    handleMenuClose();
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((rowId) => rowId !== id) : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    setData((prevData) => prevData.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      {selectedRows.length > 0 && (
        <Button variant="contained" color="error" onClick={handleDeleteSelected} sx={{ mb: 2 }}>
          Delete Selected ({selectedRows.length})
        </Button>
      )}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="employee table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.id === "select" ? (
                    <Checkbox
                      indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                      checked={selectedRows.length === data.length && data.length > 0}
                      onChange={handleSelectAll}
                    />
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Employee) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id} selected={selectedRows.includes(row.id)}>
                {columns.map((column) => {
                  if (column.id === "select") {
                    return (
                      <TableCell key={column.id} align="center">
                        <Checkbox checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} />
                      </TableCell>
                    );
                  }

                  if (column.id === "actions") {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                          <MenuItem onClick={handleDeleteRow}>Delete</MenuItem>
                        </Menu>
                      </TableCell>
                    );
                  }

                  const value = row[column.id as keyof Employee];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === "number" ? column.format(value) : value}
                      {column.id === "salary" ? "$" : ""}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
