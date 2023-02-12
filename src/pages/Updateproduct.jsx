import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { mobile, smallMobile } from "../responsive"
import { RotatingLines } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';

const Container = styled.div`
display: flex;
width: 100%;`

const UpdateContainer = styled.div`
flex:6;
position: relative;`

const AlertContainer = styled.div`
     width: 80%;
     height: 50px;
     display:none;
     margin: auto;
`

const Divloader = styled.div`
    display: none;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:40%;
    left:40%;
`

const Top = styled.div`
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
padding: 10px;
margin: 20px;`

const Title = styled.h1`
color:lightgray;
font-size: 20px;`

const Bottom = styled.div`
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
padding: 10px;
margin: 20px;
display: flex;
${mobile({ flexDirection: 'column' })}
`

const Left = styled.div`
flex:1;
text-align:center;
${mobile({ marginBottom: '10px' })}`

const Image = styled.img`
width: 100px;
height: 100px;
border-radius:50%;
object-fit:cover;`

const Right = styled.div`
flex:2;`

const Form = styled.form`
display: flex;
flex-wrap:wrap;
gap:20px;
justify-content: space-evenly;
${mobile({ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' })}
`

const FormInput = styled.div`
width: 40%;
${mobile({ width: '100%' })}
`

const Label = styled.label`
display:flex;
align-items:center;
gap: 10px;`

const Input = styled.input`
width:  ${props => props.status === "inStock" ? "" : "100%"};;
padding: 5px;
border:none;
border-bottom:1px solid gray;`

const Div = styled.div`
width: 100%;
`
const Button = styled.button`
width: 150px;
padding: 10px;
border:none;
background-color:teal;
color:white;
font-weight: bold;
cursor: pointer;
margin-top: 10px;`



const Updateproduct = () => {
    const navigate = useNavigate()
    const [result, setResult] = useState("")
    const ref = useRef()
    const location = useLocation()
    const productId = location.pathname.split('/')[3]
    const [file, setFile] = useState(null)
    const [productInfo, setProductInfo] = useState({})

    const handleImage = (e) => {
        setFile(e.target.files[0])
    }

    const handleChange = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
        e.target.name === "image" && handleImage(e)

    }


    const handleRadioClick = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value });

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!ref.current.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        }
        else {
            document.getElementById('loaderU').style.display = 'flex'
            document.getElementById('mainU').style.opacity = 0.5
            // const host = "http://localhost:5000"
            const host = process.env.REACT_APP_BASE_URL
            const response = await fetch((`${host}/api/products/updateproduct/${productId}`), {
                method: 'PUT',
                headers: {
                    'auth-token': sessionStorage.getItem('token')
                },
                body: new FormData(ref.current)
            })
            if (response.status >= 200 && response.status <= 299) {
                document.getElementById('loaderU').style.display = 'none'
                setResult("success")
                document.getElementById('alertU').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertU').style.display = 'none'
                    navigate("/products")
                }, 3000);
            } else {
                const json = await response.json()
                console.log(json)
                document.getElementById('loaderU').style.display = 'none'
                document.getElementById('mainU').style.opacity = 1;
                setResult("error")
                document.getElementById('alertU').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertU').style.display = 'none'
                }, 3000);
            }
        }
        ref.current.classList.add('was-validated')
    }


    const product = async () => {
        document.getElementById('mainU').style.display = 'none'
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
            document.getElementById('loaderU').style.display = 'none'
            document.getElementById('mainU').style.display = 'flex'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loaderU').style.display = 'none'
            document.getElementById('mainU').style.display = 'flex'

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


    return (
        <Container>
            <Sidebar />
            <UpdateContainer>
                <Navbar />
                <Top>
                    <Title>Update-Product</Title>
                </Top>
                <Divloader id='loaderU'>
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </Divloader>
                <AlertContainer id='alertU'>
                    <Alert variant="filled" severity={`${result}`}>
                        {result === 'success' ? "Product updated successfully." : "Something Went Wrong..."}
                    </Alert>
                </AlertContainer>
                <Bottom id='mainU'>
                    <Left>
                        <Image src={file ? URL.createObjectURL(file) : `data:image/png;base64,${base64String}`} alt='Product Image'></Image>
                    </Left>
                    <Right>
                        <Form className='needs-validation' ref={ref} onSubmit={handleSubmit} noValidate enctype="multipart/form-data">
                            <FormInput>
                                <Label htmlFor='file'>Product Image <DriveFolderUploadIcon style={{ cursor: "pointer" }} /></Label>
                                <Input type="file" id='file' name='image' onChange={handleChange}></Input>
                            </FormInput>
                            <FormInput>
                                <Label>Product Title</Label>
                                <Input type="text" id="title" name="title" value={productInfo.title} contenteditable="true" onChange={handleChange}></Input>
                            </FormInput>
                            <FormInput>
                                <Label>Product Description</Label>
                                <Input type="text" id="desc" name="desc" value={productInfo.desc} contenteditable="true" onChange={handleChange}></Input>
                            </FormInput>
                            <FormInput>
                                <Label>Product Categories</Label>
                                <Input type="text" id="categories" name="categories" pattern="^[A-Za-z,]+$" value={productInfo.categories} contenteditable="true" onChange={handleChange}></Input>
                                <Div className="invalid-feedback">
                                    Name must be at least 3 characters long.(Only Alphabets)
                                </Div>
                            </FormInput>
                            <FormInput>
                                <Label>Product Sizes</Label>
                                <Input type="text" id="size" name="size" pattern="^[A-Za-z0-9,]+$" value={productInfo.size} contenteditable="true" onChange={handleChange}></Input>
                                <Div className="invalid-feedback">
                                    Name must be at least 3 characters long.(Only Alphabets)
                                </Div>
                            </FormInput>
                            <FormInput>
                                <Label>Product Colors</Label>
                                <Input type="text" id="color" name="color" pattern="^[A-Za-z,]+$" value={productInfo.color} contenteditable="true" onChange={handleChange}></Input>
                                <Div className="invalid-feedback">
                                    Name must be at least 3 characters long.(Only Alphabets)
                                </Div>
                            </FormInput>
                            <FormInput>
                                <Label>Product Price</Label>
                                <Input type="number" id="price" name="price" value={productInfo.price} contenteditable="true" onChange={handleChange}></Input>
                            </FormInput>
                            <FormInput>
                                {/* <Title>Product InStock</Title> */}
                                <Label >Product-InStock</Label>
                                <Input type="radio" status="inStock" id="inStock" onClick={handleRadioClick} name="inStock" value="true" ></Input>
                                <Label >Product-Not-InStock</Label>
                                <Input type="radio" status="inStock" id="inStock100" onClick={handleRadioClick} name="inStock" value="false" ></Input>
                            </FormInput>

                            <Button type="submit" >Submit</Button>

                        </Form>
                    </Right>
                </Bottom>
            </UpdateContainer>
        </Container>
    )
}

export default Updateproduct