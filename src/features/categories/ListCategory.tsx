import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useDeleteCategoryMutation, useGetCategoriesQuery} from "./categorySlice";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {CategoriesTable} from "./components/CategoryTable";
import {GridFilterModel} from "@mui/x-data-grid";

export const CategoryList = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [options, setOptions] = useState({
        page: 1,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30]
    });
    const {data, isFetching, error} = useGetCategoriesQuery(options);
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();


    // const [page, setPage] = useState(1);
    // const [rowsPerPage] = useState([10, 25, 50, 100]);
    // const [perPage, setPerPage] = useState(10);
    // const [search, setSearch] = useState("");

    // const options = {perPage, search, page};



    function handleOnPageChange(page: number) {
        setOptions({...options, page: page + 1});
    }

    function handleOnPageSizeChange(perPage: number) {
        setOptions({...options, perPage})
    }

    function handleOnFilterChange(filterModel: GridFilterModel) {
        if (!filterModel.quickFilterValues?.length) {
            return setOptions({...options, search: ""})
        }
        const search = filterModel.quickFilterValues.join("");
        return setOptions({...options, search});

    }

    async function handleDeleteCategory(id: string) {
        await deleteCategory({id})
    }


    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueueSnackbar("Category deleted successfully!", {variant: "success"});
        }

        if (deleteCategoryStatus.error) {
            enqueueSnackbar("Category not deleted", {variant: "error"});
        }

        if (error) {
            enqueueSnackbar(`Error fetching categories`, {variant: "error"});
        }
    }, [deleteCategoryStatus, enqueueSnackbar, error]);

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
                perPage={options.perPage}
                rowsPerPage={options.rowsPerPage}
                handleDelete={handleDeleteCategory}
                handleOnPageChange={handleOnPageChange}
                handleOnPageSizeChange={handleOnPageSizeChange}
                handleFilterChange={handleOnFilterChange}
            />
        </Box>
    );
}