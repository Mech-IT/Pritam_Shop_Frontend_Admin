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
import { format } from 'timeago.js';
import { RotatingLines } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
display: flex;
align-items:center;
justify-content: center;`

const ProductContainer = styled.div`
  display: flex;
  align-items:center;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  gap:2px;
`
const ProductInfo = styled.div`
  display: flex;
  align-items:center;
  flex-wrap: wrap;
  justify-content: center;
  gap:5px;
`
const ProductTitle = styled.h6`
  
`
const ProductImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
`
const UserInfo = styled.div`
display: flex;
  align-items:center;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  gap:2px;
`

const Email = styled.div``

const Mobile = styled.div``

const AmountInfo = styled.div`
display: flex;
  align-items:center;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  gap:2px;
`

const Amount = styled.div``

const AmountStatus = styled.div``

const AddressInfo=styled.div`
display: flex;
  align-items:center;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  gap:2px;
    
`
const Address=styled.div``

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


const Span = styled.span`
padding: 5px;
border-radius:5px;
background-color: ${props => props.status === "delivered" ? "#6ee06e75" : "#ffbc0652"};
`


const Delete = styled.div`
cursor: pointer;
padding: 2px 5px;
border-radius:5px;
color:crimson;
display: ${props => props.status !== "pending" ? "none" : "block"};
margin: 2px;
border:1px dotted #de7181;`

const Update = styled.div`
cursor: pointer;
padding: 2px 5px;
border-radius:5px;
display: ${props => props.status === "delivered" ? "none" : "block"};
color: #d8e709;
margin: 2px;
border:1px dotted #de7181;`

const Tabled = ({ query, userEmail }) => {
    const [rows, setRows] = useState([])
    const [result, setResult] = useState("")
    const [resultDelete, setResultDelete] = useState("")
    const navigate=useNavigate();


    const orders = async () => {
        document.getElementById('loaderT').style.display = 'flex'
        document.getElementById('mainT').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(query ? `${host}/api/orders/getallorder?new=${query.new}` : `${host}/api/orders/getallorder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const orders = await response.json()

            var rowsItemOrder = []
            orders.forEach((item) => {
                rowsItemOrder.push({ id: item._id, products: item.products, email: item.userEmail, mobile: item.userMobile, amount: item.amount, amountStatus: item.amountPaid, status: item.status, date: item.createdAt, address: item.address })
            })
            query?setRows(rowsItemOrder.reverse()):setRows(rowsItemOrder)
            console.log(rowsItemOrder.reverse())
            document.getElementById('loaderT').style.display = 'none'
            setResult("success")
            document.getElementById('mainT').style.display = 'block'
            document.getElementById('alertT').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertT').style.display = 'none'
            }, 3000);
        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loaderT').style.display = 'none'
            setResult("error")
            document.getElementById('mainT').style.display = 'block'
            document.getElementById('alertT').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertT').style.display = 'none'
            }, 3000);

        }

    }



    const userOrders = async () => {
        document.getElementById('loaderT').style.display = 'flex'
        document.getElementById('mainT').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/getorder/${userEmail}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const orders = await response.json()
            var rowsItemOrder = []
            orders.forEach((item) => {
                rowsItemOrder.push({ id: item._id, products: item.products, email: item.userEmail, mobile: item.userMobile, amount: item.amount, amountStatus: item.amountPaid, status: item.status, date: item.createdAt, address: item.address })
            })
            setRows(rowsItemOrder.reverse())
            document.getElementById('loaderT').style.display = 'none'
            setResult("success")
            document.getElementById('mainT').style.display = 'block'
            document.getElementById('alertT').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertT').style.display = 'none'
            }, 3000);
        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loaderT').style.display = 'none'
            setResult("error")
            document.getElementById('mainT').style.display = 'block'
            document.getElementById('alertT').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertT').style.display = 'none'
            }, 3000);

        }

    }

    useEffect(() => {
        if (userEmail) {
            userOrders()
            
        }
        else if (query) {
            orders()
              
        }
        else {
            orders()
        }
    }, [])

    const handleDelete = async (orderId) => {
        const confirm = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this order information",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        if (confirm === true) {
            const result = await deleteOrder(orderId)
            if (result === true) {
                setResultDelete("success")
                document.getElementById('alertTD').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertTD').style.display = 'none'
                    window.location.reload()
                }, 3000);
            } else {
                setResultDelete("error")
                document.getElementById('alertTD').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertTD').style.display = 'none'
                }, 3000);
            }
        } else {

        }

    }


    const deleteOrder = async (orderId) => {
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/deleteorder/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const orderDeleted = await response.json()
            return true

        } else {
            const json = await response.json()
            console.log(json)
            return false

        }
    }

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }


   const handleUpdate=(id)=>{
          navigate(`/orders/update/${id}`)
   }
    return (
        <>
            <Divloader id='loaderT'>
                <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </Divloader>
            <AlertContainerDelete id='alertTD'>
                <Alert variant="filled" severity={`${resultDelete}`}>
                    {resultDelete === 'success' ? "Order deleted successfully." : "Something Went Wrong..."}
                </Alert>
            </AlertContainerDelete>
            <AlertContainer id='alertT'>
                <Alert variant="filled" severity={`${result}`}>
                    {result === 'success' ? "Orders list loaded successfully." : "Something Went Wrong..."}
                </Alert>
            </AlertContainer>
            <TableContainer component={Paper} id='mainT'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow >
                            <TableCell align="center">Order ID</TableCell>
                            <TableCell align="center">Products Info</TableCell>
                            <TableCell align="center">Customer Info</TableCell>
                            <TableCell align="center">Date of purchased</TableCell>
                            <TableCell align="center">Amount Paid</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center"> Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell>
                                    {row.products && row.products.map((product) => {
                                        return (<>
                                            <ProductContainer>
                                                <ProductTitle>{product.productTitle}</ProductTitle>
                                                <ProductInfo>
                                                    <ProductImage src={`data:image/png;base64,${product.productImage && arrayBufferToBase64(product.productImage.data)}`}></ProductImage>
                                                    <Wrapper>color: {product.color}</Wrapper>
                                                    <Wrapper>Size: {product.size}</Wrapper>
                                                    <Wrapper>Quantity: {product.quantity}</Wrapper>
                                                </ProductInfo>
                                            </ProductContainer>
                                            <hr></hr>
                                        </>
                                        )
                                    })}

                                </TableCell>
                                <TableCell align="center">
                                    <UserInfo>
                                        <Email>{row.email}</Email>
                                        <Mobile>{row.mobile}</Mobile>
                                    </UserInfo>
                                </TableCell>
                                <TableCell align="center">{format(row.date)}</TableCell>
                                <TableCell align="center">
                                    <AmountInfo>
                                         <Amount>{row.amount} Rupees</Amount>
                                         <AmountStatus>{row.amountStatus}</AmountStatus>
                                </AmountInfo>
                                </TableCell>
                                <TableCell align="center">
                                      <AddressInfo>
                                        <Address>Address: {row.address.location}</Address>
                                        <Address>City: {row.address.city}</Address>
                                        <Address>State: {row.address.state}</Address>
                                        <Address>Pincode: {row.address.pinCode}</Address>
                                      </AddressInfo>

                                </TableCell>
                                <TableCell style={{ color: row.status === "delivered" ? "green" : "goldenrod" }}>
                                    <Span status={row.status} >{row.status}</Span>
                                </TableCell>
                                <TableCell>
                                    <Update onClick={() => handleUpdate(row.id)} status={row.status}>Update</Update>
                                    <Delete onClick={() => handleDelete(row.id)} status={row.status}>Delete</Delete>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Tabled