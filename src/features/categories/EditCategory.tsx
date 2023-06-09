import {Box, Paper, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {Category, useGetCategoryQuery, useUpdateCategoryMutation} from "./categorySlice";
import {useEffect, useState} from "react";
import {CategoryForm} from "./components/CategoryForm";
import {useSnackbar} from "notistack";

export const CategoryEdit = () => {

    const id = useParams().id ?? "";
    const {data: category, isFetching} = useGetCategoryQuery({id});
    const [updateCategory, status] = useUpdateCategoryMutation();
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        name: "",
        is_active: false,
        description: "",
        updated_at: "",
        created_at: "",
        deleted_at: "",
    });


    const dispatch = useAppDispatch();
    const {enqueueSnackbar} = useSnackbar();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await updateCategory(categoryState);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategoryState({...categoryState, [name]: value})
    }
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setCategoryState({...categoryState, [name]: checked})
    }

    useEffect(() => {
        if (category) {
            setCategoryState(category.data)
        }
    }, [category]);

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Category updated successfully!!", {variant: "success"})
        }

        if (status.error) {
            enqueueSnackbar("Category not updated!!", {variant: "error"})
        }
    }, [enqueueSnackbar, status.error, status.isSuccess])

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Edit Category</Typography>
                    </Box>
                </Box>


                <CategoryForm
                    category={categoryState}
                    isDisabled={status.isLoading}
                    isLoading={false}
                    handdleSubmit={handleSubmit}
                    handleToggle={handleToggle}
                    handleChange={handleChange}
                />
            </Paper>
        </Box>


    )
};