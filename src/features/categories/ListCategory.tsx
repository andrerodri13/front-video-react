import {Box, Button, IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteCategory, selectCategories} from "./categorySlice";
import {DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

export const CategoryList = () => {
    //chama o seletor do slice que seleciona a categoria do store do redux
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    const componentsProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: {debounceMs: 500},
        }
    };

    //Usa as cateforias para criar as linha da table
    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        is_active: category.is_active,
        description: category.description,
        created_at: new Date(category.created_at).toLocaleDateString("pt-BR")
    }));

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

    function handlerDeleteCategory(id: string) {
        dispatch(deleteCategory(id));
    }

    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handlerDeleteCategory(params.value)}
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

    return (
        <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{marginBottom: '1rem'}}
                >
                    New Category
                </Button>
            </Box>

            {/*{categories.map((category) => (
                <Typography key={category.id}>{category.name}</Typography>
            ))}*/}

            <Box sx={{display: "flex", height: 600}}>
                <DataGrid
                    components={{Toolbar: GridToolbar}}
                    rowsPerPageOptions={[2, 20, 50, 100]}
                    disableColumnSelector={true}
                    disableColumnFilter={true}
                    disableDensitySelector={true}
                    disableSelectionOnClick={true}
                    // checkboxSelection={true}
                    rows={rows}
                    columns={columns}
                    componentsProps={componentsProps}
                />
            </Box>
        </Box>
    )
        ;
}