import {Box} from "@mui/system";
import {
    Autocomplete,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    RadioGroup,
    TextField,
    Radio
} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {Genre} from "../../../types/Genres";
import {Category} from "../../../types/Category";
import {Video} from "../../../types/Videos";
import {CastMember} from "../../../types/CastMembers";
import {AutoCompleteFields} from "../../../components/AutoCompleteFields";
import {Rating} from "../../../components/Rating";
import {RatingList} from "../../../components/RatingList";


type Props = {
    video: Video
    genres?: Genre[],
    categories?: Category[];
    cast_members?: CastMember[]
    isLoading?: boolean;
    isDisabled?: boolean;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ratingOptions = [
    {
        value: "L",
        label: "L",
    },
    {
        value: "10",
        label: "10",
    },
    {
        value: "12",
        label: "12",
    },
    {
        value: "14",
        label: "14",
    },
    {
        value: "16",
        label: "16",
    },
    {
        value: "18",
        label: "18",
    },
]

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
    }: Props) {


    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
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
                            <FormLabel component="legend">Rating</FormLabel>
                            <RadioGroup
                                name="rating"
                                value={video.rating}
                                onChange={handleChange}
                                row
                            >
                                <RatingList isDisabled={isDisabled}/>
                            </RadioGroup>
                        </FormControl>
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
                </Grid>
            </form>
        </Box>
    );


}