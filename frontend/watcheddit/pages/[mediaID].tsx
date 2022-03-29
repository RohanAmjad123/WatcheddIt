import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import MediaCard from "../components/MediaCard";
import { Grid } from "@mui/material";
import PostCard from "../components/PostCard";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Post, Media } from '../interfaces/index'
import { useAppSelector } from '../app/hooks'

export default function MediaPage({ media, postsList }: { media: Media, postsList: Post[] }) {
    const postCards = postsList.map((post) => <PostCard key={post._id} post={post} />);
    const userLoggedIn = useAppSelector((state) => state.loggedIn)

    const router = useRouter();
    const { mediaID } = router.query;

    const userButtons = () => {
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
            <Grid item >
                <MediaCard key={media.imdbID} media={media} />
            </Grid>
            {userButtons()}
            {postCards}
        </Grid>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/media`);
    const mediaList = await res.json();

    const paths = mediaList.map((media: Media) => ({
        params: { mediaID: media.imdbID },
    }))

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params!
    const mediaRes = await fetch(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/media/${params.mediaID}`);
    const media = await mediaRes.json();

    const postRes = await fetch(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/posts/${params.mediaID}/`);
    const postsList = await postRes.json();

    return {
        props: {
            media,
            postsList,
        }
    };
}
