import styled from "styled-components";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom"
import { useDispatch} from "react-redux"
import { mobile, smallMobile } from "../responsive"

const Container = styled.div`
flex:1;
border-right:0.5px solid #fad8d8;
min-height:100vh;
${mobile({width:'100px'})}
`

const Top = styled.div`
height: 50px;
display: flex;
justify-content: center;
align-items:center;`

const Logo = styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: purple;
    ${mobile({fontSize:"15px"})}
`
const Hr = styled.hr`
height:0;
border:0.5px solid #fad8d8;
`

const Center = styled.div`
padding-left:10px;
${mobile({paddingLeft:'5px'})}`

const Ul = styled.ul`
list-style:none;
margin: 0;
padding: 0;

`

const Title = styled.p`
font-size:10px;
font-weight: bold;
color:gray;
margin-top:15px;
margin-bottom:5px;`

const Li = styled.li`
display: flex;
align-items:center;
padding: 5px;
cursor: pointer;
&:hover{
  background-color: #d2b7b7;
}`

const Span = styled.span`
font-size: 13px;
font-weight: 600;
color:#888;
margin-left:10px;
${mobile({marginLeft:'5px',fontSize:"8px"})}`

const Bottom = styled.div`
display:flex;
display:none;
align-items:center;
margin:10px;`

const ColorOption = styled.div`
width: 20px;
height: 20px;
cursor:pointer;
background-color:${props => props.color};
border:1px solid red;
border-radius:50%;
margin-left:10px`

const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    
    
    const handleLogout = () => {
        logout(dispatch,null,navigate)
    }
    return (
        <Container>
            <Top>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Logo>MechIT</Logo>
                </Link>

            </Top>
            <Hr></Hr>
            <Center>
                <Ul>
                    <Title>MAIN</Title>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Li>
                            <DashboardIcon style={{ fontSize: "18px", color: "purple" }} />
                            <Span>Dashboard</Span>
                        </Li>
                    </Link>
                    <Title>LISTS</Title>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <Li>
                            <PeopleAltOutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                            <Span>Users</Span>
                        </Li>
                    </Link>

                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <Li>
                            <Inventory2OutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                            <Span>Products</Span>
                        </Li>
                    </Link>

                    <Link to="/orders" style={{ textDecoration: "none" }}>
                        <Li>
                            <ShoppingBagOutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                            <Span>Orders</Span>
                        </Li>
                    </Link>

                    <Link to="/carts" style={{ textDecoration: "none" }}>
                        <Li>
                            <LocalShippingIcon style={{ fontSize: "18px", color: " purple" }} />
                            <Span>Delivery</Span>
                        </Li>
                    </Link>

                    <Title>USEFUL</Title>
                    <Li>
                        <PollOutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                        <Span>Stats</Span>
                    </Li>
                    <Li>
                        <NotificationsActiveOutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                        <Span>Notification</Span>
                    </Li>
                    <Title>SERVICE</Title>
                    <Li>
                        <HealthAndSafetyOutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                        <Span>System Health</Span>
                    </Li>
                    <Li>
                        <PsychologyOutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                        <Span>Logs</Span>
                    </Li>
                    <Li>
                        <SettingsOutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                        <Span>Settings</Span>
                    </Li>
                    <Title>USER</Title>
                    <Li>
                        <AccountCircleOutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                        <Span>Profile</Span>
                    </Li>
                    <Li>
                        <ExitToAppOutlinedIcon style={{ fontSize: "18px", color: "purple" }} />
                        <Span onClick={handleLogout}>Logout</Span>
                    </Li>
                </Ul>
            </Center>
            <Bottom>
                <ColorOption color="white"></ColorOption>
                <ColorOption color="black"></ColorOption>
            </Bottom>
        </Container>
    )
}

export default Sidebar