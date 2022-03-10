import { Grid } from "@mui/material";
import { Container } from "@mui/material";

export default function home({ media }: {media:any[]}) {
  const mediaList = media.map((m) => <MediaCard key={m.id} media={m} />);  
  return (
    <Container>
      <Grid container direction='column'>{ mediaList }</Grid>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/media");
  const media = await res.json();
  return { props: { media } };
}
