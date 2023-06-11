import React, {useEffect, useState} from "react";
import {Box, Paper, Typography} from "@mui/material";
import {VideosForm} from "./components/VideosForm";
import {useSnackbar} from "notistack";
import {Video} from "../../types/Videos";
import {
    initialState as videoInitialState,
    useCreateVideoMutation,
    useGetAllCastMembersQuery,
    useGetAllCategoriesQuery,
    useGetAllGenresQuery
} from "./VideoSlice";
import {mapVideoToForm} from "./utils";

export const VideosCreate = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [videoState, setVideoState] = useState<Video>(videoInitialState);
    const [createVideo, status] = useCreateVideoMutation();
    const {data: categories} = useGetAllCategoriesQuery();
    const {data: genres} = useGetAllGenresQuery();
    const {data: cast_members} = useGetAllCastMembersQuery();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setVideoState((state) => ({...state, [name]: value}));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await createVideo(mapVideoToForm(videoState));
    }

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar(`Video creater`, {variant: "success"});
        }

        if (status.isError) {
            enqueueSnackbar(`Error creating video`, {variant: "error"});
        }
    }, [status, enqueueSnackbar]);


    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Create Video</Typography>
                    </Box>
                </Box>

                <VideosForm
                    video={videoState}
                    isLoading={status.isLoading}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    categories={categories?.data}
                    genres={genres?.data}
                    cast_members={cast_members?.data}
                />
 
            </Paper>
        </Box>

    )
};