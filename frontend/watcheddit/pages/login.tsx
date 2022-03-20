import LoginForm from "../forms/LoginForm";
import { Typography, Grid } from "@mui/material";

export default function login() {
    return (
        <Grid container direction="column" spacing={3} mt={3}>
            <Grid item>
                <Typography variant="h4">Log In</Typography>
            </Grid>
            <Grid item>
                <LoginForm />
            </Grid>
        </Grid>
    );
}