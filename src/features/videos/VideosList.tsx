import React, {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {VideosTable} from "./components/VideosTable";
import {GridFilterModel} from "@mui/x-data-grid";
import {useDeleteVideoMutation, useGetVideosQuery} from "./VideoSlice";
import {useSnackbar} from "notistack";

export const VideosList = () => {
    const {enqueueSnackbar} = useSnackbar();

    const [options, setOptions] = useState({
        page: 1,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30]
    });
    const {data, isFetching, error} = useGetVideosQuery(options)
    const [deleteVideo, deleteStatus] = useDeleteVideoMutation();
    async function handleDeleteVideo(id: string) {
        await deleteVideo({id})
    }

    function handleOnPageChange(page: number) {
        setOptions({...options, page: page + 1});
    }

    function handleOnPageSizeChange(perPage: number) {
        setOptions({...options, perPage})
    }

    function handleOnFilterChange(filterModel: GridFilterModel) {
        if (!filterModel.quickFilterValues?.length) {
            return setOptions({...options, search: ""});
        }
        const search = filterModel.quickFilterValues.join("");
        setOptions({...options, search});
    }


    useEffect(() => {
        if (deleteStatus.isSuccess) {
            enqueueSnackbar("Video deleted successfully", {variant: "success"})
        }

        if (deleteStatus.error) {
            enqueueSnackbar("Error deleting video", {variant: "error"});
        }
    }, [deleteStatus, enqueueSnackbar])


    if (error) {
        return <Typography>Error fetching videos </Typography>
    }

    return (
        <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/videos/create"
                    style={{marginBottom: '1rem'}}
                >
                    New Video
                </Button>
            </Box>
            <VideosTable
                data={data}
                isFetching={isFetching}
                perPage={options.perPage}
                rowsPerPage={options.rowsPerPage}
                handleDelete={handleDeleteVideo}
                handleOnPageChange={handleOnPageChange}
                handleOnPageSizeChange={handleOnPageSizeChange}
                handleFilterChange={handleOnFilterChange}
            />
        </Box>
    )
};