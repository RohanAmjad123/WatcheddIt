import { GetStaticPaths, GetStaticProps } from 'next'
import { Post, Comment } from '../../interfaces/index'
import PostCard from '../../components/PostCard'
import { Grid } from '@mui/material'
import CommentForm from '../../forms/CommentForm'
import CommentCard from '../../components/CommentCard'
import { useAppSelector } from '../../app/hooks'

export default function PostPage({ post, commentsList }: { post: Post, commentsList: Comment[] }) {
    const commentCards = commentsList.map((comment) => <CommentCard key={comment._id} comment={comment} />)
    const userLoggedIn = useAppSelector((state) => state.loggedIn)

    const userComment = () => {
        if (userLoggedIn) {
            return (
                <Grid item>
                    <CommentForm />
                </Grid>
            )
        }
    }

    return (
        <Grid container direction="column" rowSpacing={3}>
            <Grid item>
                <PostCard post={post} />
            </Grid>
            {userComment()}
            <Grid item container direction="column">
                {commentCards}
            </Grid>
        </Grid>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const postRes = await fetch(`http://localhost:3000/api/posts/`);
    const postList = await postRes.json();

    const paths = postList.map((post: Post) => ({
        params: {
            mediaID: post.imdbID,
            postID: post._id
        },
    }))

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params!
    const postRes = await fetch(`http://localhost:3000/api/media/${params.mediaID}/post/${params.postID}/`);
    const post = await postRes.json();

    const commentRes = await fetch(`http://localhost:3000/api/comment/${params.postID}`).then()
    const commentsList = await commentRes.json();

    return {
        props: {
            post,
            commentsList,
        }
    };
}

