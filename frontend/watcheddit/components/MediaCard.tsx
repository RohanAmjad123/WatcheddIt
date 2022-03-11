import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import Link from "next/link";

export default function MediaCard({ media }: { media: any }) {
  return (
    <Grid container direction="row" height="200px" mb={3}>
      <Grid item height="200px">
        <Link href={`/${encodeURIComponent(media.imdbID)}`} passHref>
          <CardMedia component="img" image={media.Poster} height="200px" />
        </Link>
      </Grid>
      <Grid item sm>
        <Grid container direction="column" p={3} height="200px">
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
        </Grid>
      </Grid>
    </Grid>
  );
}
