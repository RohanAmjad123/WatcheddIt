import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';


export default function Movie({ data }) {
    return (
        <Grid item>
            <Card>
                <CardContent>
                    <Typography>
                        {data.name}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}