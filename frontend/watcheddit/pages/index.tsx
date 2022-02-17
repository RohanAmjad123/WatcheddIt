import { Grid } from '@mui/material';
import Movie from '../components/Movie';

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
      <div>
          <Grid container>
            {m}
          </Grid>
      </div>
  );
}

/*export async function getServerSideProps() {
  const res = await fetch('https://reqres.in/api/users?page=2');
  const data = await res.json();
  return { props: { data } };
}*/