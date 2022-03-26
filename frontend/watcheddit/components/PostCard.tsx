import { Grid } from "@mui/material";
import { Typography, Paper } from "@mui/material";
import PostVotes from './PostVotes'
import { Post } from '../interfaces/index'
import Link from 'next/link'


export default function PostCard({ post }: { post: Post }) {

    return (
        <Grid item>
            <Link href={`/${encodeURIComponent(post.imdbID)}/${encodeURIComponent(post._id)}`} passHref>
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
                        <PostVotes votes={post.votes} />
                    </Grid>
                </Paper>
            </Link>
        </Grid >
    );
}