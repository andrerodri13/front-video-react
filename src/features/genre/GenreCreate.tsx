import {Box} from "@mui/system";
import {Paper, Typography} from "@mui/material";
import {GenreForm} from "./components/GenreForm";
import {useSnackbar} from "notistack";
import {useCreateGenreMutation, initialState as genreInitialState, useGetCaTegoriesQuery} from "./genreSlice";
import React, {useEffect, useState} from "react";
import {Genre} from "../../types/genres";

export const GenreCreate = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [createGenre, status] = useCreateGenreMutation();
    const {data: categories} = useGetCaTegoriesQuery();
    const [genreState, setGenreState] = useState<Genre>(genreInitialState)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setGenreState({...genreState, [name]: value})
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        await createGenre({
            id: genreState.id,
            name: genreState.name,
            categories_ids: genreState.categories?.map((category) => category.id),
        });
    }

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar(`Genre created`, {variant: "success"});
        }
        if (status.isError) {
            enqueueSnackbar(`Error creating genre`, {variant: "error"});
        }
    }, [status, enqueueSnackbar, categories])


    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Genre Create</Typography>
                    </Box>
                </Box>
                {/*Genre Form*/}
                <GenreForm
                    genre={genreState}
                    categories={categories?.data}
                    isLoading={status.isLoading}
                    isDisabled={status.isLoading}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Paper>
        </Box>
    )
}