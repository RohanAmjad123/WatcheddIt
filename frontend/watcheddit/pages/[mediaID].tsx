import MediaCard from "../components/MediaCard";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';

export default function MediaPage({ mediaList, postsList }: { mediaList: any[], postsList: any[] }) {
    const mediaCard = mediaList.map((m) => <MediaCard key={ m.imdbID } media={ m }/>);
    const postCards = postsList.map((p) => { p.Description });
    console.log(mediaCard);
    return (
        <Container>
            <Grid container direction="column">
                <Grid item>{ mediaCard }</Grid>
                <Grid item>   
                </Grid>
            </Grid>
        </Container>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/api/media`);
    const mediaList = await res.json();

    const paths = mediaList.map((m: any) => ({
        params: { mediaID: m.imdbID },
    }))
    
    return {
        paths, 
        fallback: false,
    };
}

export async function getStaticProps({ params } : { params: any }) {
    const mediaRes = await fetch(`http://localhost:3000/api/${params.mediaID}`);
    const mediaList = await mediaRes.json();

    const postRes = await fetch(`http://localhost:3000/api/media/${params.mediaID}/posts/`);
    const postsList = await postRes.json();

    return {
        props: {
            mediaList, 
            postsList,
        }
    };
}
