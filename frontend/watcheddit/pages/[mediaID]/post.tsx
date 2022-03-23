import MediaCard from "../../components/MediaCard";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import PostForm from "../../forms/PostForm";
import { Media } from '../../interfaces/index'

export default function Post({ mediaList }: { mediaList: Media[] }) {
    const mediaCard = mediaList.map((media) => <MediaCard key={media.imdbID} media={media} />);

    const router = useRouter();
    const { mediaID } = router.query;

    return (
        <Container>
            <Grid container direction="column" rowSpacing={3}>
                <Grid item>{mediaCard}</Grid>
                <Grid item>
                    <PostForm mediaID={ mediaID } />
                </Grid>
            </Grid>
        </Container >
    );
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/api/media`);
    const mediaList = await res.json();

    const paths = mediaList.map((media: Media) => ({
        params: { mediaID: media.imdbID },
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