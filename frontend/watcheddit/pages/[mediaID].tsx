import MediaCard from "../components/MediaCard";
import {Container} from "@mui/material";
import {Grid} from "@mui/material";
import PostCard from "../components/PostCard";
import {Button} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/router";


export default function MediaPage({mediaList, postsList}: { mediaList: any[], postsList: any[] }) {
    const mediaCard = mediaList.map((m) => <MediaCard key={m.imdbID} media={m}/>);
    const postCards = postsList.map((p) => <PostCard key={p._id} post={p}/>);

    const router = useRouter();
    const {mediaID} = router.query;

    return (
        <Container>
            <Grid container direction="column">
                <Grid item>{mediaCard}</Grid>
                <Grid item>
                    <Link href={`/${mediaID}/post`} passHref>
                        <Button size="small" variant="contained" color="secondary">Create Post</Button>
                    </Link>
                </Grid>
                {postCards}
            </Grid>
        </Container>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/api/media`);
    const mediaList = await res.json();

    const paths = mediaList.map((m: any) => ({
        params: {mediaID: m.imdbID},
    }))

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}: { params: any }) {
    const mediaRes = await fetch(`http://localhost:3000/api/media/${params.mediaID}`);
    const mediaList = await mediaRes.json();

    const postRes = await fetch(`http://localhost:3000/api/posts/${params.mediaID}/`);
    const postsList = await postRes.json();

    return {
        props: {
            mediaList,
            postsList,
        }
    };
}
