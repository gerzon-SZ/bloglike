import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  useCreateUserMutation,
  useUpdateUserMutation
} from '../features/users/usersSlice'

import { useForm, Controller } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import InputFormText from './input/inputFormText';
const defaultTheme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ entities, selectedRow, text, isDisabled, rowDataHandler }) {
  console.log(entities, 'entities')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [createUser, { data, isLoading, isSuccess, isError, error }] = useCreateUserMutation()
  const [updateUser, { data: updateData, isLoading: updateIsLoading, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError }] = useUpdateUserMutation()



  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // Access form data here
    data.id = selectedRow
    console.log(data, 'data', selectedRow, 'selectedRow')
    if (text === "EDIT") {
      const result = await updateUser(data).unwrap();
      return navigate("/user");
    } else {
      const result = await createUser(data).unwrap();
      return navigate("/user");
    }
  }
  return (
    <div>
      <Button onClick={handleOpen}disabled={isDisabled}>{text}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Container component="main" maxWidth="xs" sx={style}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {text === "EDIT" ? "Update User" : "Add User"}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

                  <InputFormText
                    name="firstName"
                    label="First Name"
                    control={control}
                    rules={{ required: 'First Name is required' }}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputFormText
                    name="lastName"
                    label="Last Name"
                    control={control}
                    rules={{ required: 'Last Name is required' }}
                  />
                 
                </Grid>
                <Grid item xs={12}>
                  <InputFormText
                    name="username"
                    label="Username"
                    control={control}
                    rules={{ required: 'Last Name is required' }}
                  />

                </Grid>
                <Grid item xs={12}>
                  <InputFormText
                    name="email"
                    label="Email"
                    control={control}
                    rules={{ required: 'Email is required' }}
                  />

                  
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    type="hidden"
                    control={control}
                    defaultValue="Secret123!"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        name="password"
                        type="hidden"
                        id="password"
                        autoComplete="new-password"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <Controller
                    name="admin" // Replace with the appropriate field name
                    control={control}
                    defaultValue={selectedRow ? entities[selectedRow].admin : true} // Set the default value as needed
                    render={({ field }) => (
                    <FormControlLabel
                        control={<Checkbox {...field} color="primary" />}
                        label="Admin"
                    />
                    )}
                /> */}
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {text === "EDIT" ? "Save" : "Add"}
              </Button>

            </Box>
          </Box>

        </Container>
      </Modal>
    </div>
  );
}
