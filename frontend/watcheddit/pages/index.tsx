import { Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { Container } from "@mui/material";

export default function home({ mediaList, categories}: { mediaList : any[], categories: any[] }) {
  const mediaCards = mediaList.map((m) => <MediaCard key={ m.imdbID } media={ m } />);  
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
