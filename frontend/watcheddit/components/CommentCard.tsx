import { Grid, Typography, Paper } from '@mui/material'
import { Comment } from '../interfaces/index'

export default function CommentCard({ comment }: { comment: Comment }) {
    return (
        <Grid item xs>
            <Paper>
                <Grid container p={2} direction="column">
                    <Grid item>
                        <Typography variant="overline">{comment.user}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{comment.text}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            </Grid>
    );
}