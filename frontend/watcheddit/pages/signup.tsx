import SignupForm from "../forms/SignupForm";
import { Typography, Grid, Paper } from "@mui/material";

export default function signup() {
    return (
        <Paper>
            <Grid container direction="column" p={3} mt={3}>
                <Grid item>
                    <Typography variant="h4">Sign Up</Typography>
                </Grid>
                <Grid item pt={2}>
                    <SignupForm />
                </Grid>
            </Grid>
        </Paper>
    );
}