import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

export default function PostCard({ post }: { post: any }) {
    return (
        <Grid container direction="column" p={3}>
            <Grid item>
                <Typography variant="h6">{post.title}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">{post.description}</Typography>
            </Grid>
        </Grid>
    );
}