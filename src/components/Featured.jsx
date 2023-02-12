import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useState, useEffect } from 'react';
import { mobile, smallMobile } from "../responsive"
import { RotatingLines } from 'react-loader-spinner'

const Container = styled.div`
flex:2;
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
padding: 10px;
${mobile({ padding: '5px', width: "250px", marginLeft: "10px" })}`

const Divloader = styled.div`
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items:center;
`

const Top = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
color:gray;`

const Title = styled.h1`
font-size: 16px;
font-weight: 500;
${mobile({ fontSize: '8px' })}`

const Bottom = styled.div`
display:flex;
align-items:center;
flex-direction:column;
padding: 20px;
justify-content: center;
gap: 15px;
${mobile({ padding: '10px', gap: "10px" })}`

const FeaturedChart = styled.div`
width: 100px;
height: 100px;
${mobile({ width: '50px', height: '50px' })}`

const Today = styled.p`
font-weight: 500;
color:gray;`

const Amount = styled.p`
font-size: 30px;
${mobile({ fontSize: '15px' })}`

const Desc = styled.p`
font-weight: 300;
font-size: 12px;
color:gray;
text-align:center;
${mobile({ fontSize: '10px' })}`

const Summary = styled.div`
display:flex;
justify-content: space-between;
width: 100%;
align-items:center;`

const SummaryItem = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
justify-content: center;`

const SummaryItemTitle = styled.div`
font-size: 14px;
color:gray;
${mobile({ fontSize: '8px' })}`

const SummaryItemResult = styled.div`
display: flex;
align-items:center;
justify-content: center;
margin-top: 10px;
color:${props => props.type === "positive" ? "green" : "red"};
${mobile({ marginTop: '5px' })}`

const SummaryResultAmount = styled.div``

const Featured = () => {
    const [lmi, setLmi] = useState(0)
    const [pmi, setPmi] = useState(0)
    const [cdi, setCdi] = useState(0)
    const [lwi, setLwi] = useState(0)
    const [pwi, setPwi] = useState(0)

    const lastMonthIncome = async () => {
        document.getElementById('mainF').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/lastmonthincome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const lmi = await response.json()
            setLmi(lmi[0].total)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        }

    }

    const previousMonthIncome = async () => {
        document.getElementById('mainF').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/previousmonthincome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const pmi = await response.json()
            setPmi(pmi[0].total)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        }

    }


    const currentdayIncome = async () => {
        document.getElementById('mainF').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/currentdayincome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const cdi = await response.json()
            setCdi(cdi[0].total)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        }

    }


    const lastWeekIncome = async () => {
        document.getElementById('mainF').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/lastweekincome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const lwi = await response.json()
            let total = 0
            lwi.forEach(element => {
                total += element.total
            });
            setLwi(total)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        }

    }

    const previousWeekIncome = async () => {
        document.getElementById('mainF').style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/previousweekincome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const pwi = await response.json()
            let total = 0
            pwi.forEach(element => {
                total += element.total
            });
            setPwi(total)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById('loaderF').style.display = 'none'
            document.getElementById('mainF').style.display = 'block'

        }

    }
    useEffect(() => {
        lastMonthIncome()
        currentdayIncome()
        previousMonthIncome();
        lastWeekIncome()
        previousWeekIncome()
    }, [])

    const percentage = Math.round((cdi / 2000) * 100);
    return (
        <>
            <Divloader id='loaderF'>
                <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </Divloader>


            <Container id='mainF'>
                <Top>
                    <Title>Total Revenue</Title>
                    <MoreVertIcon fontSize='small' />
                </Top>
                <Bottom>
                    <FeaturedChart>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5} />
                    </FeaturedChart>
                    <Today>Total Sales Made Today</Today>
                    <Amount>Rs.{cdi}</Amount>
                    <Desc>Previous transactions processing. Last payments may not be included.</Desc>
                    <Summary>
                        <SummaryItem>
                            <SummaryItemTitle>Daily Target</SummaryItemTitle>
                            <SummaryItemResult type="positive">
                                {/* <KeyboardArrowUpOutlinedIcon fontSize='small'/> */}
                                <SummaryResultAmount>Rs.2000</SummaryResultAmount>
                            </SummaryItemResult>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemTitle>Last Week</SummaryItemTitle>
                            <SummaryItemResult type={pwi < lwi ? "positive" : "negative"}>
                                {pwi < lwi ? <KeyboardArrowUpOutlinedIcon fontSize='small' /> : <KeyboardArrowDownOutlinedIcon fontSize='small' />}
                                <SummaryResultAmount>Rs.{lwi}</SummaryResultAmount>
                            </SummaryItemResult>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemTitle>Last Month</SummaryItemTitle>
                            <SummaryItemResult type={pmi < lmi ? "positive" : "negative"}>
                                {pmi < lmi ? <KeyboardArrowUpOutlinedIcon fontSize='small' /> : <KeyboardArrowDownOutlinedIcon fontSize='small' />}
                                <SummaryResultAmount>Rs.{lmi}</SummaryResultAmount>
                            </SummaryItemResult>
                        </SummaryItem>
                    </Summary>
                </Bottom>
            </Container>
        </>
    )
}

export default Featured