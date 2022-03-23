import MediaCard from "../components/MediaCard";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import PostCard from "../components/PostCard";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Post, Media } from '../interfaces/index'
import { useAppSelector } from '../app/hooks'


export default function MediaPage({ mediaList, postsList }: { mediaList: Media[], postsList: Post[] }) {
    const mediaCard = mediaList.map((m) => <MediaCard key={m.imdbID} media={m} />);
    const postCards = postsList.map((p) => <PostCard key={p._id} post={p} />);
    const userLoggedIn = useAppSelector((state) => state.loggedIn)

    const router = useRouter();
    const { mediaID } = router.query;

    const createPostButton = () => {
        if (userLoggedIn) {
            return (
                <Grid item>
                    <Link href={`/${mediaID}/post`} passHref>
                        <Button size="small" variant="contained" color="success">Create Post</Button>
                    </Link>
                </Grid>
            )
        }
    }

    return (
        <Grid container direction="column" rowSpacing={3}>
            <Grid item >{mediaCard}</Grid>
            {createPostButton()}
            {postCards}
        </Grid>
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

    const postRes = await fetch(`http://localhost:3000/api/posts/${params.mediaID}/`);
    const postsList = await postRes.json();

    return {
        props: {
            mediaList,
            postsList,
        }
    };
}
