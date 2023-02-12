import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { mobile, smallMobile, tablet } from "../responsive"
import { RotatingLines } from 'react-loader-spinner'

const Container = styled.div`
display: flex;
flex:1;
justify-content:space-between;
padding: 10px;
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47); 
box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
border-radius:10px;
height: 100px;
flex-wrap: wrap;
transition: all 1s ease;
&:hover{
  transform: scale(1.05);
};
${mobile({ padding: "5px", width: '250px' })};
${tablet({ width: '100px' })}
`
const Divloader = styled.div`
    display: flex;
    flex:1;
    justify-content: center;
    height: 200px;
    align-items:center;
    ${mobile({ padding: "5px", width: '250px' })}
    ${tablet({ width: '100px' })}
`
const Left = styled.div`
display: flex;
align-items:center;
flex-direction:column;
justify-content: space-between;`

const Title = styled.span`
font-weight: bold;
font-size: 14px;
color: #949494;
${mobile({ fontSize: '8px' })}`

const Counter = styled.span`
font-size: 28px;
font-weight:300;
${mobile({ fontSize: '14px' })}
`

// const All=styled.span`
// width:max-content;
// font-size: 12px;
// border-bottom:1px solid gray;`

const Right = styled.div`
display: flex;
align-items:center;
flex-direction:column;
justify-content: space-between;`

const Percentage = styled.div`
display: flex;
align-items:center;
font-size: 14px;
color:${props => props.type === "positive" ? "green" : "red"};
${mobile({ fontSize: "8px" })}`

const Widget = ({ type,main,loader }) => {
    const [userAmount, setUserAmount] = useState(0)
    const [todayUserAmount, setTodayUserAmount] = useState(0)
    const [yesterdayUserAmount, setYesterdayUserAmount] = useState(0)
    const [orderAmount, setOrderAmount] = useState(0)
    const [todayOrderAmount, setTodayOrderAmount] = useState(0)
    const [yesterdayOrderAmount, setYesterdayOrderAmount] = useState(0)
    const [earningAmount, setEarningAmount] = useState(0)
    const [todayEarningAmount, setTodayEarningAmount] = useState(0)
    const [yesterdayEarningAmount, setYesterdayEarningAmount] = useState(0)


    const users = async () => {
        document.getElementById(main).style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/users/countusers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const users = await response.json()
            setUserAmount(users.users)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'


        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        }
    }


    const orders = async () => {
        document.getElementById(main).style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/countorders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const orders = await response.json()
            setOrderAmount(orders.orders)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'


        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        }
    }


    const todayOrders = async () => {
        document.getElementById(main).style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/todayorders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const orders = await response.json()
            setTodayOrderAmount(orders[0].today_total_orders)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'


        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        }
    }


    const yesterdayOrders = async () => {
        document.getElementById(main).style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/yesterdayorders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const orders = await response.json()
            setYesterdayOrderAmount(orders[0].yesterday_total_orders)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'


        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        }
    }


    const totalEarnings = async () => {
        document.getElementById(main).style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/totalEarnings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const earnings = await response.json()
            let total = 0
            earnings.forEach(element => {
                total += element.total
            });
            setEarningAmount(total)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'


        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        }
    }


    const currentdayIncome = async () => {
        document.getElementById(main).style.display = 'none'
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
            const todayIncome = await response.json()
            setTodayEarningAmount(todayIncome[0].total)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        }

    }

    const yesterdayIncome = async () => {
        document.getElementById(main).style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/orders/yesterdayincome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const yesterdayIncome = await response.json()
            setYesterdayEarningAmount(yesterdayIncome[0].total)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        }

    }



    const todayUsers = async () => {
        document.getElementById(main).style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/users/todayusers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const todayUsers = await response.json()
            setTodayUserAmount(todayUsers[0].today_total_users)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        }

    }


    const yesterdayUsers = async () => {
        document.getElementById(main).style.display = 'none'
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/users/yesterdayusers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const yesterdayUsers = await response.json()
            setYesterdayUserAmount(yesterdayUsers[0].yesterday_total_users)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        } else {
            const json = await response.json()
            console.log(json)
            document.getElementById(loader).style.display = 'none'
            document.getElementById(main).style.display = 'flex'

        }

    }
    useEffect(() => {
        users()
        orders()
        todayOrders()
        yesterdayOrders()
        totalEarnings()
        currentdayIncome()
        yesterdayIncome()
        todayUsers()
        yesterdayUsers()
    }, [])

    let data = {}
    if (type === "user") {
        data = { title: "USERS", amount: userAmount, today: todayUserAmount, yesterday: yesterdayUserAmount, isMoney: false, all: "See all users", icon: <PeopleAltOutlinedIcon style={{ fontSize: "18px", padding: "5px", borderRadius: "5px", alignSelf: "flex-end", color: "crimson", backgroundColor: " #6b002833" }} /> }


    }
    else if (type === "order") {
        data = { title: "ORDERS", amount: orderAmount, today: todayOrderAmount, yesterday: yesterdayOrderAmount, isMoney: false, all: "See all orders", icon: <ShoppingBagOutlinedIcon style={{ fontSize: "18px", padding: "5px", borderRadius: "5px", alignSelf: "flex-end", color: "blue", backgroundColor: " #01217233" }} /> }
    }
    else if (type === "earning") {
        data = { title: "EARNINGS", amount: earningAmount, today: todayEarningAmount, yesterday: yesterdayEarningAmount, isMoney: true, all: "View net earnings", icon: <CurrencyRupeeOutlinedIcon style={{ fontSize: "18px", padding: "5px", borderRadius: "5px", alignSelf: "flex-end", color: "green", backgroundColor: " #00800933" }} /> }
    }
    else {
        

    }
    return (
        <>
            <Divloader id={`${loader}`}>
                <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </Divloader>

            <Container id={`${main}`}>
                <Left>
                    <Title>{data.title}</Title>
                    <Counter>{data.isMoney && "Rs."}{data.amount}</Counter>
                    
                </Left>
                <Right>
                    {data.yesterday !== 0 ? <Percentage type={data.today - data.yesterday >= 0 ? "positive" : "negative"}>
                        {data.today - data.yesterday >= 0 ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
                        {Math.round(((data.today - data.yesterday) / data.yesterday) * 100)}%
                    </Percentage> : <Percentage>{data.today === 0 ? "No Data Found" : `Today's Total Count = ${data.today}`} {data.isMoney && "Rs."}</Percentage>}
                    {data.icon}
                </Right>
            </Container>
        </>
    )
}

export default Widget