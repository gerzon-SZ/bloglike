
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useGetUsersQuery } from './usersSlice'
import { DataGrid } from '@mui/x-data-grid';

export default function UsersList() {
    
const [selectedRows, setSelectedRows] = useState([]);
const [content, setContent] = useState(<p>Loading...</p>);
let data
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('getUsers')


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

            rows={data.rows}
            columns={data.columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(newSelection) => {
                console.log(newSelection)
                setSelectedRows(newSelection.selectionModel);
            }}
            selectionModel={selectedRows}
        />
    </div> )}

            {isLoading && (<p>Loading...</p>)}
    

        </>
    )
}

