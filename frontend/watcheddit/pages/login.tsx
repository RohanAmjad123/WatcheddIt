import LoginForm from "../forms/LoginForm";
import { Typography, Grid, Paper } from "@mui/material";

export default function login() {
    return (
        <Paper>
            <Grid container direction="column" p={3}>
                <Grid item>
                    <Typography variant="h4">Log In</Typography>
                </Grid>
                <Grid item pt={3}>
                    <LoginForm />
                </Grid>
            </Grid>
        </Paper>
    );
}