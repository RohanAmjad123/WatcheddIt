import { Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { Media } from '../interfaces/index'

export default function home({ mediaList }: { mediaList : Media[] }) {
  const mediaCards = mediaList.map((media) => <MediaCard key={ media.imdbID } media={ media } />);  
  return (
      <Grid container direction='column' rowSpacing={3}>{ mediaCards }</Grid>
  );
}

export async function getStaticProps() {
  let res = await fetch("http://localhost:3000/api/media");
  const mediaList = await res.json();
  res = await fetch("http://localhost:3000/api/media-categories");
  const categories = await res.json();
  
  return { 
    props: { 
      mediaList,
      categories
    } 
  };
}
