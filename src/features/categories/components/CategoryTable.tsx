import {Results} from "../../../types/Category";
import {DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp, GridToolbar} from "@mui/x-data-grid";
import {Box, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";

type Props = {
    data: Results | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChange: (page: number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (pageSize: number) => void;
    handleDelete: (id: string) => void;
}

export function CategoriesTable(
    {
        data,
        perPage,
        isFetching,
        rowsPerPage,
        handleOnPageChange,
        handleFilterChange,
        handleOnPageSizeChange,
        handleDelete
    }: Props) {

    const componentsProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: {debounceMs: 500},
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell
        },
        {
            field: 'is_active',
            headerName: 'Active',
            flex: 1,
            type: "boolean",
            renderCell: renderIsActiveCell
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            flex: 1,
        },
        {
            field: 'id',
            headerName: 'Actions',
            type: "string",
            flex: 1,
            renderCell: renderActionsCell
        },
    ];

    function mapDataToGridRows(data: Results) {
        const {data: categories} = data;
        return categories.map((category) => ({
            id: category.id,
            name: category.name,
            isActive: category.is_active,
            created_at: new Date(category.created_at).toLocaleDateString("pt-BR")
        }));
    }

    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDelete(params.value)}
                aria-label="delete"
            >
                <DeleteIcon/>
            </IconButton>
        );
    }

    function renderNameCell(rowData: GridRenderCellParams) {
        return (<Link
                style={{textDecoration: "none"}}
                to={`/categories/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>

            </Link>
        )
    }

    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography color={rowData.value ? "primary" : "secondary"}>
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        );
    }

    const rows = data ? mapDataToGridRows(data) : [];
    const rownCount = data?.meta.total || 0;

    return (
        <Box sx={{display: "flex", height: 600}}>
            <DataGrid
                rows={rows}
                pagination={true}
                columns={columns}
                pageSize={perPage}
                loading={isFetching}
                rowCount={rownCount}
                filterMode={"server"}
                paginationMode={"server"}
                componentsProps={componentsProps}
                disableColumnSelector={true}
                disableColumnFilter={true}
                disableDensitySelector={true}
                disableSelectionOnClick={true}
                components={{Toolbar: GridToolbar}}
                onPageChange={handleOnPageChange}
                onPageSizeChange={handleOnPageSizeChange}
                checkboxSelection={false}
                rowsPerPageOptions={rowsPerPage}
            />
        </Box>
    )
}