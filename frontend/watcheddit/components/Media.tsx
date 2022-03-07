import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";

export default function Media({ media }) {
  return (
    <Grid item>
      <Card>
          <img src={media.Poster} alt={media.Title} width="50%"/>
          <CardContent>
            <Typography>{media.Title}</Typography>
          </CardContent>
      </Card>
    </Grid>
  );
}
