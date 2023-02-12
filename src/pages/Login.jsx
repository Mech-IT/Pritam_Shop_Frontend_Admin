import styled from "styled-components"
import { mobile, smallMobile, tablet } from "../responsive"
import { useState,useEffect } from "react"
import { login } from "../redux/apiCalls"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Progress from "../components/Progress"

const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items:center;
justify-content: center;
&::before{
background:url("https://i.ibb.co/rfNMGCG/pexels-andrew-neel-8960464.jpg") no-repeat center center/cover;
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;
opacity: 0.4;
}`


const Wrapper = styled.div`
padding: 20px;
width:25%;
background-color: white;
${mobile({ width: "75%" })};
${smallMobile({ width: "75%" })};
${tablet({ width: "75%" })};
`

const Title = styled.h1`
text-align:center;
font-size: 24px;
font-weight: 300;`

const Form = styled.form`
display:flex;
flex-direction:column;
`

const Input = styled.input`
flex:1;
min-width:40%;
margin: 10px 0px;
padding: 10px;
${mobile({ margin: "12px 0px" })}
`

const Button = styled.button`
width:40%;
border:none;
padding: 15px 20px;
background-color:teal;
color: white;
cursor: pointer;
margin-bottom: 10px;
&:disabled{
  color:green;
  cursor: not-allowed;
}
${smallMobile({ width: "30%" })}
`
const Error = styled.p`
  color: red;
`
const Link = styled.a`
margin:5px 0px;
font-size:12px;
text-decoration:underline;
cursor: pointer;`

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { isFetching, error } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password }, navigate)
  }
  

  return (
    <>
      <Progress/>
      <Container>
        <Wrapper>
          <Title>SIGN IN </Title>
          <Form onSubmit={handleSubmit}>
            <Input placeholder="Email" type='text' onChange={(e) => { setEmail(e.target.value) }}></Input>
            <Input placeholder="Password" type='password' onChange={(e) => { setPassword(e.target.value) }}></Input>
            <Button type="submit">SIGN IN</Button>
            {error && <Error>Something Went Wrong...Try to contact the admin for login credentials.</Error>}
          </Form>
        </Wrapper>
      </Container>
    </>
  )
}

export default Login