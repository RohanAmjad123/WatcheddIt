import SignupForm from "../forms/SignupForm";
import { Typography, Grid } from "@mui/material"; 

export default function signup () {
    return (
        <Grid container direction="column" spacing={3} mt={3}>
            <Grid item>
                <Typography variant="h4">Sign Up</Typography>
            </Grid>
            <Grid item>
                <SignupForm />
            </Grid>
        </Grid>
    );
}