import React, { useState, useRef } from 'react'
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
width: 100%;
`
const AlertContainer = styled.div`
     width: 80%;
     height: 50px;
     display:none;
     margin: auto;
`
const NewContainer = styled.div`
flex:6;
flex-direction:column;
position: relative;`

const Divloader = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:30%;
    left:40%;
    display: none;
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

const New = () => {

  const location = useLocation()
  const [result, setResult] = useState("")
  const path = location.pathname.split('/')[1]
  const [file, setFile] = useState(null)
  const [user, setUser] = useState({ name: "", email: "", password: "", image: "" })
  const navigate = useNavigate()
  const ref = useRef()
  const handleImage = (e) => {
    setFile(e.target.files[0])
  }
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    e.target.name === "image" && handleImage(e)
  }


  const handleSubmit = async (e) => {

    e.preventDefault()
    if (!ref.current.checkValidity()) {
      e.preventDefault()
      e.stopPropagation()
    }
    else {
      document.getElementById('loaderN').style.display = 'flex'
      document.getElementById('mainN').style.opacity = 0.5
      // const host = "http://localhost:5000"
      const host = process.env.REACT_APP_BASE_URL
      const response = await fetch((path === "users" && `${host}/api/auth/createuser`) || (path === "products" && `${host}/api/products/createproduct`), {
        method: 'POST',
        headers: {
          'auth-token': sessionStorage.getItem('token')
        },
        body: new FormData(ref.current)
      })
      if (response.status >= 200 && response.status <= 299) {
        document.getElementById('loaderN').style.display = 'none'
        setResult("success")
        document.getElementById('alertN').style.display = 'block'
        setTimeout(() => {
          document.getElementById('alertN').style.display = 'none'
          path === "users" && navigate("/users")
          path === "products" && navigate("/products")
        }, 3000);
      } else {
        const json = await response.json()
        console.log(json)
        document.getElementById('loaderN').style.display = 'none'
        document.getElementById('mainN').style.opacity = 1;
        setResult("error")
        document.getElementById('alertN').style.display = 'block'
        setTimeout(() => {
          document.getElementById('alertN').style.display = 'none'
        }, 3000);
      }
    }
    ref.current.classList.add('was-validated')
  }


  return (
    <>

      <Container>
        <Sidebar />
        <NewContainer>
          <Navbar />
          <Top>
            {path === "users" && <Title>Add New User</Title>}
            {path === "products" && <Title>Add New Product</Title>}
          </Top>
          <Divloader id='loaderN'>
            <RotatingLines
              strokeColor="green"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </Divloader>
          <AlertContainer id='alertN'>
            <Alert variant="filled" severity={`${result}`}>
              {result === 'success' ? path==="users"?"User added successfully.":"Product added successfully" : "Something Went Wrong..."}
            </Alert>
          </AlertContainer>
          <Bottom id='mainN'>
            <Left>
              {path === "users" && <Image src={file ? URL.createObjectURL(file) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJgwdOAjqaZGS7kn35IVm_ZN6E4XFuJ7V_g&usqp=CAU'} alt='User Image'></Image>}
              {path === "products" && <Image src={file ? URL.createObjectURL(file) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMnnKDne_4C39dH7NJvrDMuc63m6Sk8pPzeg&usqp=CAU'} alt='Product Image'></Image>}
            </Left>
            <Right>
              <Form className='needs-validation' ref={ref} onSubmit={handleSubmit} noValidate onInput='confirmPassword.setCustomValidity(confirmPassword.value != newPassword.value ? true : false)' enctype="multipart/form-data">
                <FormInput>
                  {path === "users" && <Label htmlFor='file'>Your Photo <DriveFolderUploadIcon style={{ cursor: "pointer" }} /></Label>}
                  {path === "products" && <Label htmlFor='file'>Product Image <DriveFolderUploadIcon style={{ cursor: "pointer" }} /></Label>}
                  <Input type="file" id='file' name='image' onChange={handleChange} ></Input>
                </FormInput>
                {path === "users" && <FormInput>
                  <Label>Name</Label>
                  <Input type="text" placeholder="Shubham Smith" onChange={handleChange} id="name" name="name" required pattern='[A-Za-z\s]{3,}'></Input>
                  <Div className="invalid-feedback">
                    Name must be at least 3 characters long.(Only Alphabets)
                  </Div>
                </FormInput>}
                {path === "users" && <FormInput>
                  <Label>Email</Label>
                  <Input type="email" placeholder="smithshubham12@yourmail.com" id="email" name="email" onChange={handleChange} required></Input>
                </FormInput>}
                {path === "users" && <FormInput>
                  <Label>Password</Label>
                  <Input type="password" id="password" name="password" onChange={handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" required></Input>
                  <Div className="invalid-feedback">
                    Password must contain at least one Uppercase letter and one Smallcase letter and one Number and one Special character.
                  </Div>
                </FormInput>}
                {path === "users" && <FormInput>
                  <Label>Confirm Password</Label>
                  <Input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" required ></Input>
                  <Div className="invalid-feedback">
                    Password do not match.
                  </Div>
                </FormInput>}

                {path === "products" &&
                  <FormInput>
                    <Label>Product Title</Label>
                    <Input type="text" onChange={handleChange} id="title" name="title" required ></Input>
                  </FormInput>}
                {path === "products" &&
                  <FormInput>
                    <Label>Product Description</Label>
                    <Input type="text" onChange={handleChange} id="desc" name="desc" required ></Input>
                  </FormInput>
                }
                {path === "products" &&
                  <FormInput>
                    <Label>Product Categories</Label>
                    <Input type="text" onChange={handleChange} id="categories" name="categories" required pattern="^[A-Za-z\s]+$" ></Input>
                    <Div className="invalid-feedback">
                      Product Categories must separated with single space.
                    </Div>
                  </FormInput>
                }
                {path === "products" &&
                  <FormInput>
                    <Label>Product Sizes</Label>
                    <Input type="text" onChange={handleChange} id="size" name="size" required pattern="^[A-Za-z0-9\s]+$"></Input>
                    <Div className="invalid-feedback">
                      Product Sizes must separated with single space.
                    </Div>
                  </FormInput>
                }
                {path === "products" &&
                  <FormInput>
                    <Label>Product Colors</Label>
                    <Input type="text" onChange={handleChange} id="color" name="color" required pattern="^[A-Za-z\s]+$"></Input>
                    <Div className="invalid-feedback">
                      Product Colors must separated with single space.
                    </Div>
                  </FormInput>
                }
                {path === "products" &&
                  <FormInput>
                    <Label>Product Price</Label>
                    <Input type="number" onChange={handleChange} id="price" name="price" required ></Input>
                  </FormInput>
                }
                {path === "products" &&
                  <FormInput>
                    {/* <Title>Product InStock</Title> */}
                    <Label >Product-InStock</Label>
                    <Input type="radio" status="inStock" onChange={handleChange} id="inStock" name="inStock" required value="true"></Input>
                    <Label >Product-Not-InStock</Label>
                    <Input type="radio" status="inStock" onChange={handleChange} id="inStock1" name="inStock" required value="false"></Input>
                  </FormInput>
                }

                <Button type="submit" >Submit</Button>

              </Form>
            </Right>
          </Bottom>
        </NewContainer>
      </Container>
    </>
  )
}

export default New