import {Box, Paper, Typography} from "@mui/material";
import {Category, useCreateCategoryMutation} from "./categorySlice";
import {useEffect, useState} from "react";
import {CategoryForm} from "./components/CategoryForm";
import {useSnackbar} from "notistack";

export const CategoryCreate = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [createCategory, status] = useCreateCategoryMutation();
    const [isDisabled, setIsDisabled] = useState(false);
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        name: "",
        is_active: true,
        description: "",
        updated_at: "",
        created_at: "",
        deleted_at: "",
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await createCategory(categoryState);
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
        if (status.isSuccess) {
            enqueueSnackbar("Category created successfully!", {variant: "success"});
            setIsDisabled(true);
        }

        if (status.error) {
            enqueueSnackbar("Category no created", {variant: "error"});
        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Create Category</Typography>
                    </Box>
                </Box>

                <CategoryForm
                    category={categoryState}
                    isDisabled={isDisabled}
                    isLoading={false}
                    handdleSubmit={handleSubmit}
                    handleToggle={handleToggle}
                    handleChange={handleChange}
                />
            </Paper>
        </Box>
    )
};