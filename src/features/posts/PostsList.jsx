import * as React from 'react';
import { useSelector } from "react-redux";
import { selectPostIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import FeaturedPost from "../../components/FeaturedPost";
import { useGetPostsQuery } from './postsSlice';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
  }));
  
const PostsList = () => {
    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()

    const orderedPostIds = useSelector(selectPostIds)

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = orderedPostIds.map(postId =><Grid item xs = {12} md={6} lg={4}> <Item> <FeaturedPost key={postId} postId={postId} /></Item></Grid>)
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <Grid container spacing = {2}>
                {content}
            </Grid>
        </section>
    )
}
export default PostsList