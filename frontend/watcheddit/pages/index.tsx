import { Grid } from "@mui/material";
import Media from "../components/Media";
import { Container } from "@mui/material";

export default function home({ media }) {
  const mediaList = media.map((m) => <Media key={m.id} media={m} />);

  return (
    <Container>
      <Grid container>{mediaList}</Grid>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/media");
  const media = await res.json();
  return { props: { media } };
}
