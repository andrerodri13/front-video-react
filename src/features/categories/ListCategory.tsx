import {Box, Button, IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteCategory, selectCategories, useDeleteCategoryMutation, useGetCategoriesQuery} from "./categorySlice";
import {DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSnackbar} from "notistack";
import {useEffect} from "react";

export const CategoryList = () => {
    //Chama a slice da api categoria
    const {data, isFetching, error} = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

    const dispatch = useAppDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const componentsProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: {debounceMs: 500},
        }
    };

    //Usa as cateforias para criar as linha da table
    const rows: GridRowsProp = data ? data.data.map((category) => ({
        id: category.id,
        name: category.name,
        is_active: category.is_active,
        description: category.description,
        created_at: new Date(category.created_at).toLocaleDateString("pt-BR")
    })) : [];

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

    async function handlerDeleteCategory(id: string) {
        await deleteCategory({id})
    }

    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueueSnackbar("Category deleted successfully!", {variant: "success"})
        }

        if (deleteCategoryStatus.error) {
            enqueueSnackbar("Category not deleted", {variant: "error"})
        }
    }, [deleteCategoryStatus, enqueueSnackbar])

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