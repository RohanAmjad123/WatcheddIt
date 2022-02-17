import { AppBar } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

export default function Navigation() {
    return (
        <AppBar>
            <Grid container>
                <Grid item>
                    <Typography>Watcheddit</Typography>
                </Grid>
            </Grid>
        </AppBar>
    );
}