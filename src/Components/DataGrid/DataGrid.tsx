import * as React from "react";
import { DataGrid, GridRowSelectionModel, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { dataGridColumns, rows as initialRows } from "@/data/employees";

export default function DataTable() {
  const [data, setData] = React.useState(initialRows);
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const handleRowSelection = (selection: GridRowSelectionModel) => {
    setSelectedRows(selection);
  };

  const handleDeleteSelected = () => {
    setData((prevData) => prevData.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  return (
    <Paper sx={{ height: 500, width: "100%", p: 2 }}>
      {selectedRows.length !== 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteSelected}
          sx={{ mb: 2 }}
        >
          Delete Selected
        </Button>
      )}

      <DataGrid
        rows={data}
        columns={dataGridColumns}
        checkboxSelection
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        onRowSelectionModelChange={handleRowSelection}
        rowSelectionModel={selectedRows}
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f5f5f5" },
        }}
      />
    </Paper>
  );
}
