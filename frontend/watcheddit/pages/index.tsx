import { Grid, Paper, Button, Typography } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { Media } from '../interfaces/index'
import { useState, useEffect } from 'react'

export default function Home({ mediaList }: { mediaList: Media[] }) {
  const [sortType, setSortType] = useState<keyof Media>("Title");
  const [mediaData, setMediaData] = useState(mediaList);

  useEffect(() => {
    const sortMedia = (type: keyof Media) => {
      const sortProperty = type
      var sortedMediaData
      if (sortProperty == 'Ratings') {
        sortedMediaData = [...mediaList].sort((a, b) => b[sortProperty].avg - a[sortProperty].avg)
      }
      else if (sortProperty == 'Year') {
        sortedMediaData = [...mediaList].sort((a, b) => b[sortProperty].localeCompare(a[sortProperty]))
      }
      else {
        sortedMediaData = [...mediaList].sort((a, b) => a[sortProperty].localeCompare(b[sortProperty]))
      }
      setMediaData(sortedMediaData)
    }
    sortMedia(sortType)
  }, [sortType, mediaList])

  return (
    <Grid container direction='column' rowSpacing={3}>
      <Grid item>
        <Paper>
          <Grid container direction="column" p={3}>
            <Grid item>
              <Typography variant="overline">Sort by</Typography>
            </Grid>
            <Grid item container direction="row" columnSpacing={2}>
              <Grid item>
                <Button sx={{ color: 'black' }} onClick={(event) => { setSortType("Title") }}>
                  <Typography variant="overline">Title</Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button sx={{ color: 'black' }} onClick={(event) => { setSortType("Year") }}>
                  <Typography variant="overline">Year</Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button sx={{ color: 'black' }} onClick={(event) => { setSortType("Genre") }}>
                  <Typography variant="overline">Genre</Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button sx={{ color: 'black' }} onClick={(event) => { setSortType("Ratings") }}>
                  <Typography variant="overline">Rating</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {mediaData.map((media) => <MediaCard key={media.imdbID} media={media} />)}
    </Grid>
  );
}

export async function getServerSideProps() {
  let res = await fetch("https://watcheddit-ljy5gpprra-uc.a.run.app/api/media");
  const mediaList = await res.json();

  return {
    props: {
      mediaList,
    }
  };
}
