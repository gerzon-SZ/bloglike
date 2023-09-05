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
import { selectUser } from '../users/usersSlice';
import Container from '@mui/material/Container';
import InputFormText from '../../components/input/inputFormText';
import SelectFormField from '../../components/input/SelectFormField';

const StyledForm = styled.form`

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const styledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

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
    <Container maxWidth="sm" >
      <h2>Add a New Post</h2>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputFormText
          name="title"
          label="Post Title"
          control={control}
          rules={{ required: 'Title is required' }}
        />
        <SelectFormField
          name="userId"
          label="Author"
          control={control}
          rules={{ required: 'Author is required' }}
          options={isSuccess && users.ids.map((id) => ({
            value: id,
            label: users.entities[id].name
          }))}
        />
        <InputFormText
          name="body"
          label="Post Content"
          control={control}
          rules={{ required: 'Post Content is required' }}
          multiline={true}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!canSave}
        >
          Save Post
        </Button>
      </StyledForm>
    </Container>
  );
};

export default AddPostForm;
