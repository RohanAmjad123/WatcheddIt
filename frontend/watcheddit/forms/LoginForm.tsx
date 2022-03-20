import { FormControl, Grid, TextField, Button } from "@mui/material";

export default function LoginForm () {

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
                    <Button variant="contained" onClick={handleClick}>Log in</Button>
                </Grid>
            </Grid>
        </FormControl>
    );
}