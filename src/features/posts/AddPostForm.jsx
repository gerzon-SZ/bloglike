import { useState } from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import BasicTextFields from "../../components/input/BasicTextFields";

const StyledForm = styled.form`
   display: flex;
   row-gap: 1rem;
`
const AddPostForm = () => {
    const [addNewPost, { isLoading }] = useAddNewPostMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await addNewPost({ title, body: content, userId }).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    const usersOptions = users.map(user => (
        <MenuItem key={user.id} value={user.id}> {user.name}</MenuItem>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <StyledForm>
                <TextField id="outlined-basic" label="Post Title" variant="outlined"
                 value={title}
                 onChange={onTitleChanged}
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
                    maxRows = {8}
                />
                <Button 
                variant="contained"
                disabled={!canSave}
                onClick={onSavePostClicked}

                >Save Post</Button>
             
                </StyledForm>
            </form>
        </section>
    )
}
export default AddPostForm