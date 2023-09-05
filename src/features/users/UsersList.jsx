import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from './usersSlice'
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BasicModal from '../../components/BasicModal'
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export default function UsersList() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [content, setContent] = useState(<p>Loading...</p>);

//   React.useEffect(() => {
//     if (selectedRow === null) {
//       setIsDisabled(true);
//     } else {
//       setIsDisabled(false);
//     }
//   }, [selectedRow])

  const { data: users, isLoading, isSuccess } = useGetUsersQuery('getUsers');
  const [deleteUser, { isLoading: deleteIsLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    if (selectedRow) {
      const result = await deleteUser({ id: selectedRow }).unwrap();
      if (result.success) {
        rowDataHandler();
      }
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <ButtonContainer>
          <BasicModal
            entities={users.entities}
            selectedRow={params.row.id}
            text={<EditIcon />}
            isDisabled={isDisabled}
            rowDataHandler={rowDataHandler}
          />
          <DeleteIcon
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedRow(params.row.id);
            handleDelete();
          }}
        />
        </ButtonContainer>
      ),
    },
  ];

  const rowDataHandler = () => {
    setSelectedRow(null);
  }

  return (
    <>
      {isSuccess && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={Object.values(users.entities)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={(params, event) => {
              if (!event.ignore) {
                setSelectedRow(params.row.id);
              }
            }}
          />
          <Stack spacing={2} direction="row" padding="10px">
            <Button variant="text">ID selected : {selectedRow} </Button>
          </Stack>
        </div>
      )}

      {isLoading && (<p>Loading...</p>)}
    </>
  )
}
