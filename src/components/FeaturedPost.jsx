import * as React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import PostAuthor from "../features/posts/PostAuthor";
import TimeAgo from "../features/posts/TimeAgo";
import { useGetPostsQuery } from '../features/posts/postsSlice';

const FeaturedPost = ({ postId }) => {
  const { post } = useGetPostsQuery('getPosts', {
    selectFromResult: ({ data }) => ({
        post: data?.entities[postId]
    }),
})
  return (
    <article>
      <Card sx={{ display:'flex', minHeight:'250px' }}>
          <CardContent sx={{ flex:1}}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="primary">
                <PostAuthor userId={post.userId} />
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                <TimeAgo timestamp={post.date} />
            </Typography>
            <Typography variant="subtitle1" paragraph>
                {post.body.substring(0, 75)}...
            </Typography>
            <Typography variant="subtitle1" color="primary">
              <Link to={`post/${post.id}`}>Continue reading...</Link>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
      </Card>
</article>
  );
}

// FeaturedPost.propTypes = {
//   post: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageLabel: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default FeaturedPost;