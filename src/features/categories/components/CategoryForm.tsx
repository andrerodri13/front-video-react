import React from "react"
import {Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {Category} from "../categorySlice";

type Props = {
    category: Category;
    isDisabled?: boolean;
    isLoading?: boolean;
    handdleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CategoryForm(
    {
        category,
        isDisabled = false,
        isLoading = false,
        handdleSubmit,
        handleChange,
        handleToggle
    }: Props) {


    return (

        <Box p={2}>
            <form onSubmit={handdleSubmit}>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="name"
                                label="Name"
                                value={category.name || ""}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{"data-testid": 'name'}}
                            />

                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="description"
                                label="Description"
                                value={category.description || ""}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{"data-testid": 'description'}}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="is_active"
                                        color="secondary"
                                        onChange={handleToggle}
                                        checked={category.is_active || false}
                                        inputProps={{"aria-label": "controlled"}}
                                        data-testid="is_active"
                                        disabled={isDisabled}
                                    />
                                }
                                label="Active"
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" gap={2}>
                            <Button variant="contained" component={Link} to="/categories">
                                Back
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isDisabled || isLoading}
                                color="secondary"
                            >
                                {isLoading ? "Loading..." : "Save"}
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </form>
        </Box>
    )
}
