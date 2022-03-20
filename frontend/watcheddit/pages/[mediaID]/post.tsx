import MediaCard from "../../components/MediaCard";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import PostForm from "../../forms/PostForm";


export default function Post({ mediaList }: { mediaList: any[] }) {
    const mediaCard = mediaList.map((m) => <MediaCard key={m.imdbID} media={m} />);

    const router = useRouter();
    const { mediaID } = router.query;

    return (
        <Container>
            <Grid container direction="column">
                <Grid item>{mediaCard}</Grid>
                <Grid item><PostForm mediaID={ mediaID } /></Grid>
            </Grid>
        </Container >
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

export async function getStaticProps({ params }: { params: any }) {
    const mediaRes = await fetch(`http://localhost:3000/api/media/${params.mediaID}`);
    const mediaList = await mediaRes.json();

    return {
        props: {
            mediaList,
        }
    };
}