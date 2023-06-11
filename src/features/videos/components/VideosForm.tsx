import {Box} from "@mui/system";
import {Button, FormControl, FormLabel, Grid, RadioGroup, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {Genre} from "../../../types/Genres";
import {Category} from "../../../types/Category";
import {FileObject, Video} from "../../../types/Videos";
import {CastMember} from "../../../types/CastMembers";
import {AutoCompleteFields} from "../../../components/AutoCompleteFields";
import {RatingList} from "../../../components/RatingList";
import {InputFile} from "../../../components/InputFile";


type Props = {
    video: Video
    genres?: Genre[],
    categories?: Category[];
    cast_members?: CastMember[]
    isLoading?: boolean;
    isDisabled?: boolean;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddFile: ({name, file}: FileObject) => void;
    handleRemoveFile: (name: string) => void;
}

export function VideosForm(
    {
        video,
        genres,
        categories,
        cast_members,
        isLoading = false,
        isDisabled = false,
        handleSubmit,
        handleChange,
        handleAddFile,
        handleRemoveFile,
    }: Props) {

    const handleAddThumbnail = (file: File) => {
        handleAddFile({name: "thumb_file", file});
    };

    const handleRemoveThumbnail = () => {
        handleRemoveFile("thumb_file");
    };

    const handleAddBanner = (file: File) => {
        handleAddFile({name: "banner_file", file});
    };

    const handleAddTrailer = (file: File) => {
        handleAddFile({name: "trailer_file", file});
    };

    const handleAddVideo = (file: File) => {
        handleAddFile({name: "video_file", file});
    };

    const handleRemoveBanner = () => {
        handleRemoveFile("banner_file");
    };

    const handleRemoveTrailer = () => {
        handleRemoveFile("trailer_file");
    };

    const handleRemoveVideo = () => {
        handleRemoveFile("video_file");
    };


    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} sx={{"& .MuiTextField-root": {my: 2}}}>
                        <FormControl fullWidth>
                            <TextField
                                name="title"
                                label="Title"
                                value={video.title}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{"data-testid": "title"}}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                name="description"
                                label="Description"
                                value={video.description}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{"data-testid": "description"}}
                            />
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="year_launched"
                                        label="Year Launched"
                                        value={video.year_launched}
                                        disabled={isDisabled}
                                        onChange={handleChange}
                                        inputProps={{"data-testid": "year_launched"}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="duration"
                                        label="Duration"
                                        value={video.duration}
                                        disabled={isDisabled}
                                        onChange={handleChange}
                                        inputProps={{"data-testid": "duration"}}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <AutoCompleteFields
                                name="cast_members"
                                label="Cast Members"
                                isLoading={isLoading}
                                isDisabled={isDisabled}
                                values={video.cast_members}
                                options={cast_members}
                                handleChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid
                                container
                                alignContent={"center"}
                                justifyContent={"space-between"}
                                spacing={2}
                            >
                                <Grid item xs={5}>
                                    <AutoCompleteFields
                                        name="genres"
                                        label="Genres"
                                        isLoading={isLoading}
                                        isDisabled={isDisabled}
                                        values={video.genres}
                                        options={genres}
                                        handleChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <AutoCompleteFields
                                        name="categories"
                                        label="Categories"
                                        isLoading={isLoading}
                                        isDisabled={false}
                                        values={video.categories}
                                        options={categories}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{"& .MuiTextField-root": {my: 2}}}>
                        <FormControl>
                            <Box mt={2} mb={2}>
                                <FormLabel component="legend">Rating</FormLabel>
                            </Box>
                            <RadioGroup
                                name="rating"
                                value={video.rating}
                                onChange={handleChange}
                                row
                            >
                                <RatingList isDisabled={isDisabled}/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel component="legend">Thumbnail</FormLabel>
                            <InputFile onAdd={handleAddThumbnail} onRemove={handleRemoveThumbnail}/>

                            <FormLabel component="legend">Banner</FormLabel>
                            <InputFile onAdd={handleAddBanner} onRemove={handleRemoveBanner}/>
                        </FormControl>

                        <FormControl fullWidth>
                            <FormLabel component="legend">Videos</FormLabel>
                            <InputFile onAdd={handleAddVideo} onRemove={handleRemoveVideo}/>
                            <FormLabel component="legend">Trailer</FormLabel>
                            <InputFile onAdd={handleAddTrailer} onRemove={handleRemoveTrailer}/>
                        </FormControl>

                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" gap={2}>
                        <Button variant="contained" component={Link} to="/videos">
                            Back
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isDisabled || isLoading}
                            color="secondary"
                        >
                            {isLoading ? "Loading ..." : "Save"}
                        </Button>
                    </Box>
                </Grid>

            </form>
        </Box>
    );


}