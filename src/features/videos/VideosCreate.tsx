import React, {useEffect, useState} from "react";
import {Box, Paper, Typography} from "@mui/material";
import {VideosForm} from "./components/VideosForm";
import {useSnackbar} from "notistack";
import {FileObject, Video} from "../../types/Videos";
import {
    initialState as videoInitialState,
    useCreateVideoMutation,
    useGetAllCastMembersQuery,
    useGetAllGenresQuery
} from "./VideoSlice";
import {mapVideoToForm} from "./utils";
import {useUniqueCategories} from "../../hooks/useUniqueCategories";
import {addUpload, removeUpload, setUploadProgress} from "../uploads/UploadSlice";
import {nanoid} from "nanoid";
import {useAppDispatch} from "../../app/hooks";

export const VideosCreate = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [videoState, setVideoState] = useState<Video>(videoInitialState);
    const [createVideo, status] = useCreateVideoMutation();
    const {data: genres} = useGetAllGenresQuery();
    const {data: cast_members} = useGetAllCastMembersQuery();
    const [categories] = useUniqueCategories(videoState, setVideoState);
    const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([])
    const dispatch = useAppDispatch();


    // console.log("Selected Files", selectedFiles);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setVideoState((state) => ({...state, [name]: value}));
    }

    function handleAddFile({name, file}: FileObject) {
        setSelectedFiles([...selectedFiles, {name, file}]);
    }

    function handleRemoveFile(name: string) {
        setSelectedFiles(selectedFiles.filter((file) => file.name !== name));
    }

    function handleSubmitUploads(videoId: string) {
        selectedFiles.forEach(({file, name}) => {
            const payload = {id: nanoid(), file, videoId, field: name}
            dispatch(addUpload(payload));
        });

    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const {id, ...payload} = mapVideoToForm(videoState);
        try {
            const {data} = await createVideo(payload).unwrap();
            await handleSubmitUploads(data.id);
        } catch (e) {
            enqueueSnackbar(`Error creating Video`, {variant: "error"})
        }
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
                    categories={categories}
                    genres={genres?.data}
                    cast_members={cast_members?.data}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleAddFile={handleAddFile}
                    handleRemoveFile={handleRemoveFile}
                />

            </Paper>
        </Box>

    )
};