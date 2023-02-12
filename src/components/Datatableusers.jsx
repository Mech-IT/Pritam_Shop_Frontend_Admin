import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link} from "react-router-dom"
import { RotatingLines } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';
import swal from 'sweetalert';

const Div = styled.div`
    height: 400px;
    width: 100%;
`
const Divloader = styled.div`
    height: 400px;
    width: 100%;
    display: none;
    justify-content: center;
    align-items:center;
`
const AlertContainer = styled.div`
     width: 80%;
     height: 50px;
     display: none;
     margin: auto;
`
const AlertContainerDelete = styled.div`
     width: 80%;
     height: 50px;
     display: none;
     margin: auto;
`
const Top = styled.div`
display: flex;
justify-content:flex-end;
align-items: center;
margin: 10px;
gap:10px;

`

const Title = styled.h1`
color:gray;
font-size: 24px;`

const CellAction = styled.div`
display: flex;
align-items:center;
gap:15px;`

const View = styled.div`
cursor: pointer;
padding: 2px 5px;
border-radius:5px;
color:darkblue;
border:1px dotted #9491f1;`

const Delete = styled.div`
cursor: pointer;
padding: 2px 5px;
border-radius:5px;
color:crimson;
border:1px dotted #de7181;`

const Datatableusers = () => {
    const [rowsItem, setRowsItem] = useState([])
    const [result, setResult] = useState("")
    const [resultDelete, setResultDelete] = useState("")

    const handleDelete = async (userId) => {
        const confirm = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user information",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
        if (confirm === true) {
            const result = await deleteUser(userId)
            if (result === true) {
                setResultDelete("success")
                document.getElementById('alertUD').style.display='block'
                setTimeout(() => {
                    document.getElementById('alertUD').style.display = 'none'
                }, 3000);
            }
            else{
                setResultDelete("error")
                document.getElementById('alertUD').style.display='block'
                setTimeout(() => {
                    document.getElementById('alertUD').style.display = 'none'
                }, 3000);
            }
        } else {

        }

    }

    const deleteUser = async (userId) => {
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const userDeleted = await response.json()
            return true

        } else {
            const json = await response.json()
            console.log(json)
            return false

        }
    }

    const users = async () => {
        document.getElementById('loader').style.display = 'flex'
        document.getElementById('main').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/users/getalluser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const users = await response.json()
            var rowsItemUser = []
            users.forEach((item) => {
                rowsItemUser.push({ id: item._id, name: item.name, email: item.email })
            })
            setRowsItem(rowsItemUser.reverse())
            document.getElementById('loader').style.display = 'none'
            setResult("success")
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertU').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertU').style.display = 'none'
            }, 3000);
        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loader').style.display = 'none'
            setResult("error")
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertU').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertU').style.display = 'none'
            }, 3000);

        }

    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: "action", headerName: "Action", width: 150,
            renderCell: (params) => {
                return (
                    <CellAction>
                        <Link to={`/users/${params.row.email}`} style={{ textDecoration: "none" }}>
                            <View>View</View>
                        </Link>
                        <Delete onClick={() => { handleDelete(params.row.id) }}>Delete</Delete>
                    </CellAction>
                )
            }
        }
    ];

    useEffect(() => {
        users()
    }, [])


    return (
        <>
            <Divloader id='loader'>
                <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </Divloader>
            <AlertContainerDelete id='alertUD'>
                    <Alert variant="filled" severity={`${resultDelete}`}>
                        {resultDelete === 'success' ? "User deleted successfully." : "Something Went Wrong..."}
                    </Alert>
                </AlertContainerDelete>

            <Div id='main'>
                <Top>
                    <Title>Add New User</Title>
                    <Link to="/users/new" style={{ textDecoration: "none", color: "green", fontSize: "16px", fontWeight: 400, border: "1px solid green", padding: "5px", cursor: "pointer", borderRadius: "5px", }}>
                        Add New
                    </Link>
                </Top>
                <AlertContainer id='alertU'>
                    <Alert variant="filled" severity={`${result}`}>
                        {result === 'success' ? "Users list loaded successfully." : "Something Went Wrong..."}
                    </Alert>
                </AlertContainer>
                <DataGrid
                    rows={rowsItem}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
            </Div>
        </>
    )
}

export default Datatableusers