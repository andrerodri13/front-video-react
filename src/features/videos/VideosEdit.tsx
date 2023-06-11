import {Paper, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    initialState as videoInitialState, useGetAllCastMembersQuery,
    useGetAllCategoriesQuery, useGetAllGenresQuery,
    useGetVideoQuery,
    useUpdateVideoMutation
} from "./VideoSlice";
import {Video} from "../../types/Videos";
import {useSnackbar} from "notistack";
import {VideosForm} from "./components/VideosForm";
import {mapVideoToForm} from "./utils";
import {useUniqueCategories} from "../../hooks/useUniqueCategories";


export function VideosEdit() {
    const id = useParams<{ id: string }>().id as string;
    const {enqueueSnackbar} = useSnackbar();
    const {data: genres} = useGetAllGenresQuery();
    const {data: cast_members} = useGetAllCastMembersQuery();
    const {data: video, isFetching} = useGetVideoQuery({id});
    const [updateVideo, status] = useUpdateVideoMutation();
    const [videoState, setVideoState] = useState<Video>(videoInitialState);
    const [categories, setCategories] = useUniqueCategories(videoState, setVideoState);


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setVideoState((state) => ({...state, [name]: value}));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await updateVideo(mapVideoToForm(videoState));
    }


    useEffect(() => {
        if (video) {
            setVideoState(video.data);
            setCategories(video.data.categories || []);
        }

    }, [video, setCategories]);

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar(`Video updated`, {variant: "success"});
        }

        if (status.isError) {
            enqueueSnackbar(`Error updating video`, {variant: "error"});
        }
    }, [status, enqueueSnackbar]);

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Video Edit</Typography>
                    </Box>
                </Box>
                <VideosForm
                    video={videoState}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cast_members={cast_members?.data}
                    genres={genres?.data}
                    categories={categories}
                    isDisabled={isFetching}
                    isLoading={isFetching}
                />
            </Paper>
        </Box>
    )
}