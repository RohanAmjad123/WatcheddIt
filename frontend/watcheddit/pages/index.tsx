import { Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { Container } from "@mui/material";

export default function home({ mediaList }: { mediaList: any[] }) {
  const mediaCards = mediaList.map((m) => <MediaCard key={m.imdbID} media={m} />);
  return (
    <Grid container direction='column'>{mediaCards}</Grid>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/media");
  const mediaList = await res.json();
  return {
    props: {
      mediaList
    }
  };
}
