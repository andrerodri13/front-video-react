import React from "react"
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid, Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {Link} from "react-router-dom";
import {CastMember} from "../../../types/CastMembers";

type Props = {
    castMember: CastMember
    isDisabled?: boolean;
    isLoading?: boolean;
    handdleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CastMemberForm(
    {
        castMember,
        isDisabled = false,
        isLoading = false,
        handdleSubmit,
        handleChange,
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
                                value={castMember.name}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{"data-testid": "name"}}
                            />

                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup
                                aria-labelledby="type of cast member"
                                defaultValue="Director"
                                name="type"
                                onChange={handleChange}
                                value={castMember.type}
                                data-testid="type"
                            >
                                <FormControlLabel value={1} control={<Radio/>} label="Director"/>
                                <FormControlLabel value={2} control={<Radio/>} label="Actor"/>

                            </RadioGroup>
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" gap={2}>
                            <Button variant="contained" component={Link} to="/cast-members">
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
    )
}
