import {Results} from "../../../types/CastMembers";
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

export function CastMembersTable(
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
            field: 'type',
            headerName: 'Type',
            flex: 1,
            renderCell: renderTypeCell
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
        const {data: castMembers} = data;
        return castMembers.map((castMember) => ({
            id: castMember.id,
            name: castMember.name,
            type: castMember.type
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
                to={`/cast-members/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>

            </Link>
        )
    }

    function renderTypeCell(rowData: GridRenderCellParams) {
        return (
            <Typography color="primary">
                {rowData.value === 1 ? "Diretor" : "Actor"}
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
                filterMode={"server"}
                rowCount={rownCount}
                loading={isFetching}
                paginationMode={"server"}
                checkboxSelection={false}
                disableColumnFilter={true}
                disableColumnSelector={true}
                disableDensitySelector={true}
                rowsPerPageOptions={rowsPerPage}
                componentsProps={componentsProps}
                onPageChange={handleOnPageChange}
                components={{Toolbar: GridToolbar}}
                onFilterModelChange={handleFilterChange}
                onPageSizeChange={handleOnPageSizeChange}
            />
        </Box>
    )
}