import { Grid, Box } from "@mui/material";
import { Typography, CardMedia, Rating, Paper } from "@mui/material";
import Link from "next/link";


export default function MediaCard({ media }: { media: any }) {
    return (
        <Grid item>
            <Paper>
                <Grid container direction="row" height="200px">
                    <Grid item>
                        <Link href={`/${encodeURIComponent(media.imdbID)}`} passHref>
                            <CardMedia component="img" image={media.Poster} height="200px" />
                        </Link>
                    </Grid>
                    <Grid item sm>
                        <Grid container direction="column" p={3}>
                            <Grid item>
                                <Typography variant="h4">{media.Title}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">{media.Genre}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">{media.Plot}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="caption">{media.Year}</Typography>
                            </Grid>
                            {media.ratings != undefined &&
                                <Grid container direction="row">
                                    <Grid item><Rating sx={{ paddingTop: 0.3 }} name="half-rating-read" defaultValue={media.ratings.avg} precision={0.1} readOnly /></Grid>
                                    <Grid item><Typography sx={{ paddingLeft: 1 }} variant="overline">{media.ratings.count}</Typography></Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
