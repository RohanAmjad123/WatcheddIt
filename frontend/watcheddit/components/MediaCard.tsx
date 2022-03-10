import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import Link from "next/link";

export default function MediaCard({ media }: { media: any }) {
  return (
    <Link href={`/${encodeURIComponent(media.imdbID)}`}>
      <Grid container direction="row" pb={3} height="200px">
        <Grid item pb={3} height="200px">
          <CardMedia component="img" image={media.Poster} height="200px" />
        </Grid>
        <Grid item container sm direction="column" p={3} height="200px">
          <Typography variant="h4">{media.Title}</Typography>
          <Typography variant="body1">{media.Plot}</Typography>
          <Typography variant="caption">{media.Year}</Typography>
        </Grid>
      </Grid>
    </Link>
  );
}
