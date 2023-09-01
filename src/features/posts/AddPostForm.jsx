import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from './postsSlice';
import { useGetUsersQuery } from '../users/usersSlice';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {selectUser} from '../users/usersSlice';
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddPostForm = () => {
  const userState = useSelector(selectUser);
  sessionStorage.setItem('user', JSON.stringify(userState));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const navigate = useNavigate();
  console.log(user, "user add m");
  if (!user) {
    navigate('/signin');
  }
  const { control, handleSubmit, formState } = useForm();
  const { data: users, isSuccess } = useGetUsersQuery('getUsers');
  if (isSuccess) {
    console.log(users);
  }


  const canSave = !formState.isSubmitting && isSuccess;

  const onSubmit = async (data) => {
    if (canSave) {
      try {
        const results = await addNewPost(data).unwrap();
        navigate('/');
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Post Title"
              variant="outlined"
              {...field}
            />
          )}
        />
        <Controller
          name="userId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Author</InputLabel>
              <Select
                id="demo-simple-select"
                labelId="demo-simple-select-label"
                label="Author"
                {...field}
              >
                {isSuccess &&
                  users.ids.map((id) => (
                    <MenuItem key={id} value={id}>
                      {users.entities[id].name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="body"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Post Content"
              variant="outlined"
              id="postContent"
              name="postContent"
              multiline
              rows={8}
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!canSave}
        >
          Save Post
        </Button>
      </StyledForm>
    </section>
  );
};

export default AddPostForm;
