import FeaturedPost from "../../components/FeaturedPost";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from './postsSlice';
import Grid from '@mui/material/Grid';

const PostsList = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('getPosts')

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    }
    if (isSuccess) {
        console.log(posts);
        content = posts.ids.map(postId => {
            return (
                <Grid item xs={12} md={4} key={postId}>
                    <h1>12345</h1>
                    <FeaturedPost key={postId} postId={postId} />
                </Grid>
            )
        })
    }
    if (isError) {
        content = <p>{error}</p>;
    }
    return (
        <section>
            <Grid container spacing={1}>
                {content}
            </Grid>
        </section>
    )
}
export default PostsList