import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import CardContent from '@mui/material/CardContent';

import Card from '@mui/material/Card';

import CardActionArea from '@mui/material/CardActionArea';
import PostAuthor from "../features/posts/PostAuthor";
import TimeAgo from "../features/posts/TimeAgo";

import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";
import { selectPostById } from "../features/posts/postsSlice";
import CardMedia from '@mui/material/CardMedia';

function FeaturedPost({ postId }) {
  const post = useSelector(state => selectPostById(state, postId))
  return (
    <article>
    {/* <h2>{post.title}</h2>
    <p className="excerpt">{post.body.substring(0, 75)}...</p>
    <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
    </p> */}
    
    <CardActionArea component="a" href="#">
      <Card sx={{ display: 'flex' }}>
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
            image='https://source.unsplash.com/random?wallpapers'
            alt={post.imageLabel}
          />
      </Card>
    </CardActionArea>
  
</article>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;