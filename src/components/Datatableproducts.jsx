import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { RotatingLines } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';

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

const Image = styled.div`
display: flex;
align-items:center;
gap:15px;
`


const ProductImage = styled.img`
border-radius:50%;
width:50px;
height:50px;
object-fit:cover`

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

const Datatableproducts = () => {
    const [rowsItem, setRowsItem] = useState([])
    const [result, setResult] = useState("")


    const products = async () => {
        document.getElementById('loader').style.display = 'flex'
        document.getElementById('main').style.display = 'none'
        /* const host = "http://localhost:5000" */
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/products/getallproduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const products = await response.json()
            var rowsItemProduct = []
            products.forEach((item) => {
                rowsItemProduct.push({ id: item._id, image: arrayBufferToBase64(item.image.data), title: item.title, desc: item.desc, categories: item.categories, size: item.size, color: item.color, price: item.price, inStock: item.inStock })
            })
            setRowsItem(rowsItemProduct)
            document.getElementById('loader').style.display = 'none'
            setResult("success")
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertP').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertP').style.display = 'none'
            }, 3000);
        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loader').style.display = 'none'
            setResult("error")
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertP').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertP').style.display = 'none'
            }, 3000);

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


    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        {
            field: 'image', headerName: 'Product-Image', width: 120,

            renderCell: (params) => {
                return (
                    <Image>
                        <ProductImage src={`data:image/png;base64,${params.row.image}`}></ProductImage>

                    </Image>
                )
            }
        },

        { field: 'title', headerName: 'Product', width: 200 },
        { field: 'desc', headerName: 'Description', width: 200 },
        { field: 'categories', headerName: 'Categories', width: 200 },
        { field: 'size', headerName: 'Size', width: 130 },
        { field: 'color', headerName: 'Color', width: 220 },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'inStock', headerName: 'InStock', width: 70 },
        {
            field: "action", headerName: "Action", width: 100,
            renderCell: (params) => {
                return (
                    <CellAction>
                        <Link to={`/products/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <View>View</View>
                        </Link>
                    </CellAction>
                )
            }
        }
    ];

    useEffect(() => {
        products()
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
            <Div id='main' >
                <Top>
                    <Title>Add New Product</Title>
                    <Link to="/products/new" style={{ textDecoration: "none", color: "green", fontSize: "16px", fontWeight: 400, border: "1px solid green", padding: "5px", cursor: "pointer", borderRadius: "5px", }}>
                        Add New
                    </Link>
                </Top>
                <AlertContainer id='alertP'>
                    <Alert variant="filled" severity={`${result}`}>
                        {result === 'success' ? "Products list loaded successfully." : "Something Went Wrong..."}
                    </Alert>
                </AlertContainer>
                <DataGrid
                    rows={rowsItem}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Div>

        </>
    )
}

export default Datatableproducts