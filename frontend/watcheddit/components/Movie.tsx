import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';
import { Typography } from '@mui/material';


export default function Movie({ data }) {
    return (
        <Grid item>
            <Card>
                <CardHeader title={data.name} />
            </Card>
        </Grid>
    );
}