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
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = posts.ids.map(postId => {
            return (
                <Grid item xs={12} md={6} key={postId}>
                    <FeaturedPost key={postId} postId={postId} />
                </Grid>
            ) 
    })
    } else if (isError) {
        content = <p>{error}</p>;
    }
    return (
        <section>
            <Grid container spacing = {1}>
                {content}
            </Grid>
        </section>
    )
}
export default PostsList