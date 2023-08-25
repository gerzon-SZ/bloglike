import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetPostsQuery } from './postsSlice';
import { useUpdatePostMutation, useDeletePostMutation } from "./postsSlice";
import { useGetUsersQuery } from '../users/usersSlice';

import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
const StyledForm = styled.form`
   display: flex;
   row-gap: 1rem;
`


const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const [updatePost, { isLoading }] = useUpdatePostMutation()
    const [deletePost] = useDeletePostMutation()

    const { post, isLoading: isLoadingPosts, isSuccess } = useGetPostsQuery('getPosts', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            post: data?.entities[postId],
            isLoading,
            isSuccess
        }),
    })

    const { data: users, isSuccess: isSuccessUsers } = useGetUsersQuery('getUsers')

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setTitle(post.title)
            setContent(post.body)
            setUserId(post.userId)
        }
    }, [isSuccess, post?.title, post?.body, post?.userId])

    if (isLoadingPosts) return <p>Loading...</p>

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await updatePost({ id: post?.id, title, body: content, userId }).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    let usersOptions
    if (isSuccessUsers) {
        usersOptions = users.ids.map(id => (
            <MenuItem
                key={id}
                value={id}
            >{users.entities[id].name}</MenuItem>
        ))
    }

    const onDeletePostClicked = async () => {
        try {
            await deletePost({ id: post?.id }).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <StyledForm>
                <TextField id="outlined-basic" label="Post Title" variant="outlined"
                    value={title}
                    onChange={onTitleChanged}
                    type="text"
                    name="postTitle"
                />
                
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Author</InputLabel>
                <Select
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    label="Author"
                    value={userId}
                    onChange={onAuthorChanged}
                    >
                    <option value=""></option>
                    {usersOptions}
                
                </Select>
            </FormControl>
            
            <TextField label="Post Content" variant="outlined"
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
                multiline
                rows = {8}
            />
                <Button 
            variant="contained"
            disabled={!canSave}
            onClick={onSavePostClicked}

            >Save Post</Button>

           <Button 
             style={{
                backgroundColor: "#d87093",
            }}
            variant="contained"
            disabled={!canSave}
            onClick={onDeletePostClicked}

            >Delete Post</Button>
          
            </StyledForm>
        </section>
    )
}

export default EditPostForm