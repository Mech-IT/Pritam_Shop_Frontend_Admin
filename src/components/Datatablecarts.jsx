import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';

const Wrapper = styled.div`
display: flex;
align-items:center`

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

const Title = styled.h1`
  text-align:center;`

const Delete = styled.div`
cursor: pointer;
width: 50%;
padding: 2px 5px;
border-radius:5px;
color:crimson;
border:1px dotted #de7181;`

const Datatablecarts = () => {

    const [rows, setRows] = useState([])
    const [result, setResult] = useState('')

    const carts = async () => {
        document.getElementById('loader').style.display = 'flex'
        document.getElementById('main').style.display = 'none'
        /* const host = "http://localhost:5000" */
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/carts/getallcarts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const carts = await response.json()

            var rowsItemCarts = []
            carts.forEach((item) => {
                rowsItemCarts.push({ id: item._id, products: item.products, customer: item.userEmail })
            })
            setRows(rowsItemCarts.reverse())
            document.getElementById('loader').style.display = 'none'
            setResult("success")
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertR').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertR').style.display = 'none'
            }, 3000);
        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loader').style.display = 'none'
            setResult("error")
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertR').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertR').style.display = 'none'
            }, 3000);

        }

    }

    useEffect(() => {
        carts()
    }, [])

    const handleDelete=async(cartId)=>{
        /* const host = "http://localhost:5000" */
        const host = process.env.REACT_APP_BASE_URL
            const response = await fetch(`${host}/api/carts/deletecart/${cartId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':sessionStorage.getItem("token")
                }
            })
            if (response.status >= 200 && response.status <= 299) {
                window.location.reload()

            } else {
                const json = await response.json()
                console.log(json)

            }
       }
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
            <AlertContainer id='alertR'>
                <Alert variant="filled" severity={`${result}`}>
                    {result === 'success' ? "User carts loaded successfully." : "Something Went Wrong..."}
                </Alert>
            </AlertContainer>
            <Title>Total Carts</Title>
            <TableContainer component={Paper} id='main'>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>Cart ID</TableCell>
                            <TableCell>Customer Email</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Quantity</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.customer}</TableCell>
                                <TableCell>
                                    {row.products && row.products.map((product) => {
                                        return <Wrapper>{product.productId}</Wrapper>
                                    })}

                                </TableCell>
                                <TableCell>
                                    {row.products && row.products.map((product) => {
                                        return <Wrapper>{product.quantity}</Wrapper>
                                    })}

                                </TableCell>
                                <TableCell>
                                       <Delete onClick={()=>{handleDelete(row.id)}}>Delete</Delete>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Datatablecarts