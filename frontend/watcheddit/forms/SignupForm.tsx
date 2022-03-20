import { FormControl, Grid, TextField, Button } from "@mui/material";

export default function SignupForm () {

    const handleClick = () => {
        console.log('login button clicked')
    }

    return (
        <FormControl>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <TextField name="username" label="Username" />
                </Grid>
                <Grid item>
                    <TextField name="password" label="Password" />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleClick}>Sign Up</Button>
                </Grid>
            </Grid>
        </FormControl>
    );
}