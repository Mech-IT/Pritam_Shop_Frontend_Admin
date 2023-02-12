import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { mobile, smallMobile, tablet } from "../responsive"
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
width: 40%;
padding: 10px;
border:none;
background-color:teal;
color:white;
font-weight: bold;
cursor: pointer;
margin-top: 10px;`

const UpdateOrder = () => {
    const navigate = useNavigate()
    const [result, setResult] = useState("")
    const ref = useRef()
    const location = useLocation()
    const orderId = location.pathname.split('/')[3]
    const [orderInfo, setOrderInfo] = useState({ userMobile: null, status: "", amountPaid: "" })

    const handleChange = (e) => {
        setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value })


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
            const response = await fetch((`${host}/api/orders/updateorder/${orderId}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({userMobile:orderInfo.userMobile,status:orderInfo.status,amountPaid:orderInfo.amountPaid})
            })
            if (response.status >= 200 && response.status <= 299) {
                document.getElementById('loaderU').style.display = 'none'
                setResult("success")
                document.getElementById('alertU').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertU').style.display = 'none'
                    navigate("/orders")
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


    
    return (
        <Container>
            <Sidebar />
            <UpdateContainer>
                <Navbar />
                <Top>
                    <Title>Update-Order</Title>
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
                    {/* <Left>
                        <Image src="" alt='Product Image'></Image>
                    </Left> */}
                    <Right>
                        <Form className='needs-validation' ref={ref} onSubmit={handleSubmit} noValidate enctype="multipart/form-data">
                            <FormInput>
                                <Label>User Mobile</Label>
                                <Input type="number" id="mobile" name="userMobile" onChange={handleChange}></Input>
                            </FormInput>
                            <FormInput>
                                <Label>Status</Label>
                                <Input type="text" id="mobile" name="status" pattern='^[a-z]+$' placeholder='pending dispatch delivered' onChange={handleChange}></Input>
                                <Div className="invalid-feedback">
                                    Status must be in only lowercase.
                                </Div>
                            </FormInput>
                            <FormInput>
                                <Label>Amound Paid</Label>
                                <Input type="text" id="mobile" name="amountPaid" pattern='^[a-z]+$' placeholder="successful decline pending" onChange={handleChange}></Input>
                                <Div className="invalid-feedback">
                                    Status must be in only lowercase.
                                </Div>
                            </FormInput>

                            <Button type="submit">Submit</Button>

                        </Form>
                    </Right>
                </Bottom>
            </UpdateContainer>
        </Container>

    )
}

export default UpdateOrder