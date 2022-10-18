import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";
import {useDeleteCategoryMutation, useGetCategoriesQuery} from "./categorySlice";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {CategoriesTable} from "./components/CategoryTable";
import {GridFilterModel} from "@mui/x-data-grid";

export const CategoryList = () => {
    const [rowsPerPage] = useState([10, 25, 50, 100]);
    const [PerPage] = useState(10);
    const [search, setSearch] = useState("");


    const {data, isFetching, error} = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    const {enqueueSnackbar} = useSnackbar();

    function handleOnPageChange(page: number) {
        console.log(page);
    }

    function handleOnPageSizeChange(perPage: number) {
        console.log(perPage);
    }

    function handleOnFilterChange(filterModel: GridFilterModel) {
        console.log(filterModel);
    }

    async function handleDeleteCategory(id: string) {
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
            <CategoriesTable
                data={data}
                isFetching={isFetching}
                perPage={PerPage}
                rowsPerPage={rowsPerPage}
                handleDelete={handleDeleteCategory}
                handleOnPageChange={handleOnPageChange}
                handleOnPageSizeChange={handleOnPageSizeChange}
                handleFilterChange={handleOnFilterChange}
            />
        </Box>
    );
}