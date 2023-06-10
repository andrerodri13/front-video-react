import {useSnackbar} from "notistack";
import {useParams} from "react-router-dom";
import {
    useGetCaTegoriesQuery,
    initialState as genreInitialState,
    useGetGenreQuery,
    useUpdateGenreMutation
} from "./genreSlice";
import React, {useEffect, useState} from "react";
import {Genre} from "../../types/Genres";
import {Box} from "@mui/system";
import {Paper, Typography} from "@mui/material";
import {GenreForm} from "./components/GenreForm";
import {mapGenreToForm} from "./util";

export const GenreEdit = () => {
    const id = useParams<{ id: string }>().id as string;
    const {data: genre, isFetching} = useGetGenreQuery({id});
    const {enqueueSnackbar} = useSnackbar();
    const {data: categories} = useGetCaTegoriesQuery();
    const [updateGenre, status] = useUpdateGenreMutation();
    const [genreState, setGenreState] = useState<Genre>(genreInitialState);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setGenreState((state) => ({...state, [name]: value}));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await updateGenre(mapGenreToForm(genreState));
    }

    useEffect(() => {
        if (genre) {
            setGenreState(genre.data);
        }
    }, [genre])

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar(`Genre updated`, {variant: "success"});
        }

        if (status.isError) {
            enqueueSnackbar(`Error updating genre`, {variant: "error"});
        }
    }, [status, enqueueSnackbar]);

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Genre Edit</Typography>
                    </Box>
                </Box>
                Genre Form
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