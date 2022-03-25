import MediaCard from "../../components/MediaCard";
import { GetStaticProps, GetStaticPaths } from 'next'
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import PostForm from "../../forms/PostForm";
import { Media } from '../../interfaces'

export default function Post({ media }: { media: Media }) {
    const router = useRouter();
    const { mediaID } = router.query;

    return (
        <Grid container direction="column" rowSpacing={3}>
            <Grid item>
                <MediaCard key={media.imdbID} media={media} />
            </Grid>
            <Grid item>
                <PostForm mediaID={mediaID} />
            </Grid>
        </Grid>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params!
    const mediaRes = await fetch(`http://localhost:3000/api/media/${params.mediaID}`);
    const media = await mediaRes.json();

    return {
        props: {
            media,
        }
    };
}