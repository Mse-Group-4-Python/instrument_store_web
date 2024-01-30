import "./dataTable.scss";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { OrderModel } from "../../api/order_api";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Koyu mod
  },
});

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  onRowClick?: (rowData: OrderModel) => void;
};

const DataTable2 = (props: Props) => {
  const handleDelete = (id: number) => {
    console.log(id + " has been deleted!");
  };

  return (
    <div className="dataTable">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <DataGrid
          getRowId={(row) => row.instrument_name}
          className="dataGrid"
          rows={props.rows}
          columns={[...props.columns]}
          onRowClick={(params) => {
            if (props.onRowClick) {
              props.onRowClick(params.row);
            }
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          //checkboxSelection
          //disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </ThemeProvider>
    </div>
  );
};

export default DataTable2;
