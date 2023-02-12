import React from 'react'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Chart from "../components/Chart"
import Table from "../components/Table"
import styled from "styled-components"
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Container = styled.div`
display: flex;
width: 100%;`

const SingleContainer = styled.div`
flex:6;
display:flex;
flex-direction:column;`

const Divloader = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:30%;
    left:40%
`

const Top = styled.div`
display: flex;
padding: 20px;
gap:20px;`

const Left = styled.div`
flex:1;
display: flex;
flex-direction: column;
position: relative;
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);`

const TitleContainer = styled.div`
display:flex;
align-items:center;
justify-content: space-between;
position: relative;`

const Title = styled.h1`
margin-bottom: 20px;
color:lightgray;
font-size: 16px;`

const EditButton = styled.div`
position: absolute;
top: 0;
right: 0;
padding: 5px;
font-size: 12px;
color: #b700ff;
background-color: #db8eec57;
cursor: pointer;
border-radius:0px 0px 0px 5px;`

const DetailsContainer = styled.div`
display: flex;
align-items:center;
`

const Image = styled.img`
width: 100px;
height: 100px;
border-radius:50%;
/* border-bottom-left-radius: 50%;
border-bottom-right-radius: 50%; */
object-fit:cover;`

const Details = styled.div`
`
const Name = styled.h1`
margin-bottom: 10px;
color:gray;
`

const DetailInfo = styled.div`
margin-bottom: 10px;
font-size:14px;`

const EmailTitle = styled.span`
font-weight:bold;
color:gray;
margin-right: 5px;`

const Email = styled.span`
font-weight: 300;`

const Right = styled.div`
flex:2;
border:1px solid red;`

const Bottom = styled.div`
padding: 20px;
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
margin: 10px 20px ;`

const TableTitle = styled.h1``

const Single = () => {
  const location = useLocation()
  const userEmail = location.pathname.split("/")[2]
  const [userInfo, setUserInfo] = useState({})

  const user = async () => {
    document.getElementById('mainS').style.display = 'none'
    /* const host = "http://localhost:5000" */
    const host = process.env.REACT_APP_BASE_URL
    const response = await fetch(`${host}/api/users/getuser/${userEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': sessionStorage.getItem("token")
      },
    })
    if (response.status >= 200 && response.status <= 299) {
      const user = await response.json()
      setUserInfo(user)
      document.getElementById('loaderS').style.display = 'none'
      document.getElementById('mainS').style.display = 'flex'

    } else {
      const json = await response.json()
      console.log(json)
      document.getElementById('loaderS').style.display = 'none'
      document.getElementById('mainS').style.display = 'flex'

    }

  }

  useEffect(() => {
    user()
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

  const base64String = userInfo.image && arrayBufferToBase64(userInfo.image.data)

  return (
    <Container>
      <Sidebar />
      <SingleContainer>
        <Navbar />
        <Top>
          <Left>
            <TitleContainer>
              <Title>Information</Title>
              <EditButton>Edit</EditButton>
            </TitleContainer>
            <Divloader id='loaderS'>
              <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </Divloader>
            <DetailsContainer id='mainS'>
              <Image src={userInfo.image ? `data:image/png;base64,${base64String}` : "https://i.ibb.co/JcVDvPW/imageedit-1-9445606498.png"} alt=''></Image>
              <Details>
                <Name>{userInfo.name}</Name>
                <DetailInfo>
                  <EmailTitle>Email:</EmailTitle>
                  <Email>{userInfo.email}</Email>
                </DetailInfo>
              </Details>
            </DetailsContainer>
          </Left>
          <Right>
            <Chart height={"215px"} title="User Spending (Last 6 Months in Rs.)" userEmail={userEmail} />
          </Right>
        </Top>
        <Bottom>
          <TableTitle>Last Transactions</TableTitle>
          <Table userEmail={userEmail} />
        </Bottom>
      </SingleContainer>
    </Container>
  )
}

export default Single