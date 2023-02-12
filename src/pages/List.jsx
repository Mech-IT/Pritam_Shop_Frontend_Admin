import React from 'react'
import { useState } from 'react'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import styled from "styled-components"
import Datatableusers from "../components/Datatableusers"
import { useLocation } from 'react-router-dom'
import Datatableproducts from '../components/Datatableproducts'
import Datatableorders from '../components/Datatableorders'
import Datatablecarts from '../components/Datatablecarts'



const Container = styled.div`
display: flex;
width: 100%;`

const ListContainer = styled.div`
flex:6;
`

const List = () => {

  const location = useLocation()
  const path = location.pathname.slice(1,);
  return (
    <>
      <Container>
        <Sidebar />
        <ListContainer >
          <Navbar />
          {path === "users" && <Datatableusers />}
          {path === "products" && <Datatableproducts />}
          {path === "orders" && <Datatableorders />}
          {path === "carts" && <Datatablecarts />}
        </ListContainer>
      </Container>
    </>
  )
}

export default List