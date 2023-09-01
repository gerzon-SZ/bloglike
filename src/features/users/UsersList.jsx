
import { Link } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from './usersSlice'
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BasicModal from '../../components/BasicModal'
import styled from '@emotion/styled';


export default function UsersList() { 
const [isDisabled, setIsDisabled] = useState(true);
const [selectedRow, setSelectedRow] = useState(null);
const [content, setContent] = useState(<p>Loading...</p>);

React.useEffect(() => {
    if (selectedRow === null) {
        setIsDisabled(true);
    } else {
        setIsDisabled(false);
    }
    console.log(isDisabled, 'isDisabled')
}, [selectedRow])

let data
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('getUsers')
    const [deleteUser, { data: deleteData, isLoading: deleteIsLoading, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError }] = useDeleteUserMutation()
    const handleDelete = async () => {
        console.log(selectedRow, 'selectedRow')
        const result = await deleteUser({id : selectedRow}).unwrap();
        if (result.success) {
            rowDataHandler()
            return navigate("/user");
        }
    }



    
    if (isLoading) {
        
    } else if (isSuccess) {
        console.log(users, 'users')
        const sampleValue = Object.values(users.entities)[0];
        data = {
            columns:Object.keys(sampleValue).map((key) => ({
                field: key,
                headerName: key,
                width: 150,
            })),
            rows: Object.values(users.entities)
        }
    } else if (isError) {
        
    }
    const rowDataHandler = () => {
        setSelectedRow(null)
    }

  useEffect(() => {
      if (isSuccess) {
        console.log(users, 'users')
        const sampleValue = Object.values(users.entities)[0];
        data = {
            columns:Object.keys(sampleValue).map((key) => ({
                field: key,
                headerName: key,
                width: 150,
            })),
            rows: Object.values(users.entities)
        }
      }
    }, [isSuccess])
useEffect(() => {
       setContent(<p>Loading...</p>)
      }, [isLoading])
     return (
        <>
        {isSuccess && (<div style={{ height: 400, width: '100%' }}>
        <DataGrid
            {...data}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={(params, event) => {
                if (!event.ignore) {
                    setSelectedRow(params.row.id);
                }
              }
            }
        />
        <Stack spacing={2} direction="row" padding="10px">
            {/* <Button variant="contained">Contained</Button> */}
            <Button variant="text">ID selected : {selectedRow} </Button>
            
        </Stack>
            <Stack spacing={2} direction="row" padding="10px">
       
               <BasicModal text = {"ADD USER"} />
               <BasicModal entities={users.entities} selectedRow={selectedRow }  text = {"EDIT"}  isDisabled = {isDisabled} rowDataHandler={rowDataHandler}/>
                <Button variant="outlined" disabled={isDisabled} onClick={handleDelete}>Delete</Button>
        </Stack>
    </div> )}

            {isLoading && (<p>Loading...</p>)}
            

        </>
    )
}

