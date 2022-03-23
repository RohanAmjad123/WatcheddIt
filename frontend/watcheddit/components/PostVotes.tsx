import { Grid, Typography, IconButton } from '@mui/material'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { Post } from '../interfaces/index'

export default function PostVotes({ votes }: { votes: Post["votes"] }) {
    return (
        <Grid item container direction="row" pt={2}>
            <Grid item>
                <IconButton>
                    <ArrowUpwardRoundedIcon />
                </IconButton>
            </Grid>
            <Grid item justifyContent="center" direction="column" display="flex">
                <Typography variant="subtitle1">{votes.upvotes - votes.downvotes}</Typography>
            </Grid>
            <Grid item>
                <IconButton>
                    <ArrowDownwardRoundedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

