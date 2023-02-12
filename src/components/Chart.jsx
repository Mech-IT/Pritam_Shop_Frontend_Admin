import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { mobile, smallMobile } from "../responsive"
import { RotatingLines } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';

const Container = styled.div`
flex:4;
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
${mobile({ width: '250px', marginLeft: '10px' })}
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

const Charted = ({ height, title, userEmail, type }) => {

    const [rows, setRows] = useState([])

    const [result, setResult] = useState("")


    const dataMonth = useMemo(() => [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ])



    const orderStats = async () => {
        document.getElementById('loader').style.display = 'flex'
        document.getElementById('main').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/orderstats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const stats = await response.json()
            stats.sort((a, b) => {
                return a._id - b._id
            })
            var rowsItemStats = []
            stats.forEach((item) => {
                rowsItemStats.push({ month: dataMonth[item._id - 1], total: item.total })
            })
            setRows(rowsItemStats)
            document.getElementById('loader').style.display = 'none'
            setResult("success")
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertC').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertC').style.display = 'none'
            }, 3000);
        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loader').style.display = 'none'
            setResult('error')
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertC').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertC').style.display = 'none'
            }, 3000);

        }

    }


    const singleUserOrderStats = async () => {
        document.getElementById('loader').style.display = 'flex'
        document.getElementById('main').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/monthlyincomesingleuser/${userEmail}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const stats = await response.json()
            stats.length !== 0 && stats.sort((a, b) => {
                return a._id - b._id
            })
            var rowsItemStats = []
            stats.forEach((item) => {
                rowsItemStats.push({ month: dataMonth[item._id - 1], total: item.total })
            })
            setRows(rowsItemStats)
            document.getElementById('loader').style.display = 'none'
            setResult("success")
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertC').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertC').style.display = 'none'
            }, 3000);
        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loader').style.display = 'none'
            setResult('error')
            document.getElementById('main').style.display = 'block'
            document.getElementById('alertC').style.display = 'block'
            setTimeout(() => {
                document.getElementById('alertC').style.display = 'none'
            }, 3000);
        }

    }

    const data = [
        ["Month", "Revenue"],
    ];

    rows.length!==0 && rows.map((item) => {
        return data.push([item.month, item.total])
    })

    const options = {
        title: title,
        hAxis: { title: "Months", titleTextStyle: { color: "#333" } },
        vAxis: { title: "Revenue (in Rs.)", titleTextStyle: { color: "#333" }, minValue: 0 },
        chartArea: { width: "50%", height: "70%" },

    };

    useEffect(() => {
        type === "order" && orderStats()
        userEmail && singleUserOrderStats()
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
            <Container id='main'>
                <AlertContainer id='alertC'>
                    <Alert variant="filled" severity={`${result}`}>
                        {result === 'success' ? "Chart loaded successfully." : "Something Went Wrong..."}
                    </Alert>
                </AlertContainer>
                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height={height}
                    data={data}
                    options={options}
                />
            </Container>
        </>
    )
}

export default Charted