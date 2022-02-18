import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

export default function Navigation() {
    return (
        <AppBar enableColorOnDark sx={{ bgcolor: 'white' }} position='sticky'>
            <Toolbar>
                <Grid container>
                    <Grid item>
                        <Typography sx={{ color: 'text.primary' }}>Watcheddit</Typography>
                    </Grid>
                </Grid> 
            </Toolbar>
        </AppBar>
    );
}