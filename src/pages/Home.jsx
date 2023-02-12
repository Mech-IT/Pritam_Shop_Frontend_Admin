import styled from "styled-components"
import Chart from "../components/Chart"
import Featured from "../components/Featured"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Table from "../components/Table"
import Widget from "../components/Widget"
import { mobile, smallMobile,tablet,laptop } from "../responsive"

const Container = styled.div`
display: flex;
width: 98vw;
${mobile({width:'100vw'})}
`

const HomeContainer = styled.div`
flex:6;
`

const Widgets=styled.div`
display:flex;
padding: 20px;
gap:20px;
flex-wrap: wrap;
${mobile({flexDirection:"column",alignItems:'center',justifyContent:"center"})}
`

const ChartsContainer=styled.div`
display:flex;
padding: 5px 20px;
gap:20px;
${mobile({flexDirection:"column",alignItems:'center',justifyContent:"center"})};`

const TableContainer=styled.div`
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
padding: 20px;
margin: 20px;
${mobile({display:'none'})}
${tablet({display:'none'})}
${smallMobile({display:'none'})}
${laptop({display:'none'})}
`

const TableTitle=styled.div`
text-align:center;
font-weight: 500;
color:gray;
margin-bottom: 15px;
${mobile({marginBottom:'10px'})}`
const Home = () => {
  return (
    <>
      <Container>
        <Sidebar />
        <HomeContainer>
          <Navbar/>
          <Widgets>
            <Widget type="user" main="mainU" loader="loaderU"/>
            <Widget type="order" main="mainO" loader="loaderO"/>
            <Widget type="earning" main="mainE" loader="loaderE"/>
            {/* <Widget type="balance"/> */}
          </Widgets>
          <ChartsContainer>
            <Featured/>
            <Chart height={"400px"} title="Last 6 Months Revenue (Rs.)" type="order"/>
          </ChartsContainer>
          <TableContainer>
            <TableTitle>
              Latest Transaction
              <Table query={{new:true}}/>
            </TableTitle>
          </TableContainer>
        </HomeContainer>
      </Container>
    </>
  )
}

export default Home