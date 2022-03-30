import MediaCard from "../../components/MediaCard";
import { GetServerSideProps } from 'next'
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params!
    const mediaRes = await fetch(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/media/${params.mediaID}`);
    const media = await mediaRes.json();

    return {
        props: {
            media,
        }
    };
}