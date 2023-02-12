import React from 'react'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import styled from 'styled-components'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { mobile, smallMobile } from "../responsive"
import { RotatingLines } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';
import swal from 'sweetalert';

const Container = styled.div`
display: flex;
width: 100%;`

const SingleContainer = styled.div`
flex:6;
display:flex;
flex-direction:column;
position: relative;`

const AlertContainer = styled.div`
     width: 80%;
     height: 50px;
     display:none;
     margin: auto;
`
const AlertContainerDelete = styled.div`
     width: 80%;
     height: 50px;
     display: none;
     margin: auto;
`

const Divloader = styled.div`
    display: none;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:50%;
    left:50%;
    position: absolute;
`

const ProductContainer = styled.div`
    flex:1;
    width:100%;
    height:100%;
    display: flex;
    ${mobile({ flexDirection: 'column' })}
`

const Left = styled.div`
flex:1;
display: flex;
margin: 10px;
flex-direction: column;
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);`

const ProductImage = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
`
const Right = styled.div`
    flex:1;
    display:flex;
    flex-direction: column;
    gap:10px;
    
`
const ProductInformation = styled.div`
display:flex;
flex:1 ;
justify-content: center;
gap:10px;
align-items:center;
flex-direction:column;
margin: 10px;
flex:1;
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);

`

const Title = styled.h1`
margin: 10px;
text-align:center;`

const Desc = styled.p`
margin: 10px;
text-align: center;
`

const Categories = styled.p``

const Size = styled.p``

const Color = styled.p``

const Price = styled.p``

const Stock = styled.p``

const Action = styled.div`
display:flex;
justify-content: space-evenly;
align-items: center;
gap:10px;
margin-bottom: 10px;
`
const Update = styled.button`
cursor: pointer;
padding: 2px 5px;
border-radius:5px;
width:100px;
height:50px;
color:green;
border:1px dotted #02aa13;
&:hover{
    background-color:green;
    color: yellow;
}`

const Delete = styled.button`
cursor: pointer;
padding: 2px 5px;
border-radius:5px;
color:crimson;
border:1px dotted #de7181;
width:100px;
height:50px;
:hover{
    background-color:red;
    color: white;
}`

const Singleproduct = () => {
   
    const location = useLocation()
    var productId = location.pathname.split("/")[2]
    const [productInfo, setProductInfo] = useState({})
    const [result, setResult] = useState("")
    const [resultDelete, setResultDelete] = useState("")
    const navigate = useNavigate()

    const product = async () => {
        document.getElementById('loaderP').style.display = 'flex'
        document.getElementById('mainP').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/products/getproduct/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const product = await response.json()
            setProductInfo(product)
            document.getElementById('loaderP').style.display = 'none'
            setResult("success")
            document.getElementById('mainP').style.display = 'flex'
            document.getElementById('alertS').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertS').style.display = 'none'
            }, 3000);

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loaderP').style.display = 'none'
            setResult("error")
            document.getElementById('mainP').style.display = 'flex'
            document.getElementById('alertS').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertS').style.display = 'none'
            }, 3000);

        }

    }

    useEffect(() => {
        product()
    }, [])


    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const base64String = productInfo.image && arrayBufferToBase64(productInfo.image.data)

    let sizeString = ""
    productInfo.size && productInfo.size.forEach((item) => {
        sizeString = sizeString + item + " "
    })

    let colorString = ""
    productInfo.color && productInfo.color.forEach((item) => {
        colorString = colorString + item + " "
    })

    let categoryString = ""
    productInfo.categories && productInfo.categories.forEach((item) => {
        categoryString = categoryString + item + " "
    })

    const handleDelete = async (productId) => {
        const confirm = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Product in anyway",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
        if (confirm === true) {
            const result = await deleteProduct(productId)
            if (result === true) {
                setResultDelete("success")
                document.getElementById('alertSD').style.display='block'
                setTimeout(() => {
                    document.getElementById('alertSD').style.display = 'none'
                    navigate("/products")
                }, 3000);
            }
            else{
                setResultDelete("error")
                document.getElementById('alertSD').style.display='block'
                setTimeout(() => {
                    document.getElementById('alertSD').style.display = 'none'
                }, 3000);
            }
        } else {

        }

    }


    const deleteProduct = async (productId) => {
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/products/deleteproduct/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const productDeleted = await response.json()
            return true

        } else {
            const json = await response.json()
            console.log(json)
            return false

        }
    }
    return (
        <Container>
            <Sidebar />
            <SingleContainer>
                <Navbar />
                <Divloader id='loaderP'>
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </Divloader>
                <AlertContainerDelete id='alertSD'>
                    <Alert variant="filled" severity={`${resultDelete}`}>
                        {resultDelete === 'success' ? "Product deleted successfully." : "Something Went Wrong..."}
                    </Alert>
                </AlertContainerDelete>
                <AlertContainer id='alertS'>
                    <Alert variant="filled" severity={`${result}`}>
                        {result === 'success' ? "Product details loaded successfully." : "Something Went Wrong..."}
                    </Alert>
                </AlertContainer>
                <ProductContainer id='mainP'>
                    <Left>
                        <ProductImage src={productInfo.image && `data:image/png;base64,${base64String}`} alt="Product-Image"></ProductImage>
                    </Left>
                    <Right>
                        <ProductInformation>
                            <Title>{productInfo.title}</Title>
                            <Desc>{productInfo.desc}</Desc>
                            <Categories>{categoryString}</Categories>
                            <Size>{sizeString}</Size>
                            <Color>{colorString}</Color>
                            <Price>{`Rs.${productInfo.price}`}</Price>
                            <Stock>{productInfo.inStock}</Stock>
                            <Action>
                                <Link to={`/products/update/${productId}`}>
                                    <Update>Update</Update>
                                </Link>
                                <Delete onClick={() => handleDelete(productId)}>Delete</Delete>
                            </Action>
                        </ProductInformation>
                    </Right>
                </ProductContainer>

            </SingleContainer>
        </Container>
    )
}

export default Singleproduct