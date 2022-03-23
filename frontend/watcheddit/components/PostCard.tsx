import { Grid } from "@mui/material";
import { Typography, Paper } from "@mui/material";
import PostVotes from './PostVotes'
import { Post } from '../interfaces/index'


export default function PostCard({ post }: { post: Post }) {
    console.log(post)
    
    return (
        <Grid item>
        <Paper>
        <Grid container direction="column" p={2}>
            <Grid item>
                <Typography variant="overline">{post.user}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">{post.title}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">{post.description}</Typography>
            </Grid>
            <PostVotes votes={post.votes}/>
        </Grid>
        </Paper>
        </Grid>
    );
}