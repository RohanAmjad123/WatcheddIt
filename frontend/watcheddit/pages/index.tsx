import { Grid } from '@mui/material';
import Movie from '../components/Movie';
import { Container } from '@mui/material';

const movies = [
  {
    name: 'movie1'
  }, 
  {
    name: 'movie2'
  }, 
  {
    name: 'movie3'
  },
]

export default function home() {
  const m = movies.map((movie) => 
    <Movie key={movie.name} data={movie} />
  );
  
  return (
      <Container>
          <Grid container>
            {m}
          </Grid>
      </Container>
  );
}

/*export async function getServerSideProps() {
  const res = await fetch('https://reqres.in/api/users?page=2');
  const data = await res.json();
  return { props: { data } };
}*/