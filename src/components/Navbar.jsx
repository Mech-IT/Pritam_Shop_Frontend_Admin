import styled from "styled-components";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { Badge } from "@mui/material";
import { mobile, smallMobile, tablet } from "../responsive"
import { setAdmin, setImage, setName } from "../redux/userRedux";
import Avatar from '@mui/material/Avatar';
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";

const Container = styled.div`
height: 50px;
border-bottom:0.5px solid #fad8d8;
display: flex;
align-items:center;
font-size: 14px;
color:#555;
${mobile({ fontSize: "8px" })}
${tablet({ fontSize: "11px" })}
`

const Wrapper = styled.div`
width: 100%;
display: flex;
align-items:center;
padding: 20px;
justify-content:space-between;
${mobile({ padding: '10px', justifyContent: 'space-evenly' })}
${tablet({ justifyContent: 'flex-start', gap: '340px' })}
`

const SearchContainer = styled.div`
display: flex;
align-items:center;
border:0.5px solid lightgray;
padding: 3px;
${mobile({ display: "none" })}

`

const Search = styled.input`
border:none;
outline:none;
&::placeholder{
  font-size: 12px;
};

`

const ItemContainer = styled.div`
display: flex;
align-items:center;
cursor: pointer;
${tablet({ gap: '10px' })}
`

const Item = styled.div`
display: flex;
align-items:center;
margin-right:20px;
cursor: pointer;
${mobile({ marginRight: '10px' })}`

const Avtar = styled.img`
height: 30px;
width: 30px;
border-radius:50%;
${mobile({ height: '15px', width: '15px' })}; `

const Navbar = () => {
  const { currentUser, userImage, name } = useSelector(state => state.user)
  const dispatch=useDispatch()
  const getUser = async () => {
    // const host = "http://localhost:5000"
    const host = process.env.REACT_APP_BASE_URL
    const response = await fetch(`${host}/api/users/getuser/${currentUser.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': sessionStorage.getItem("token")
      },

    })
    if (response.status >= 200 && response.status <= 299) {
      const user = await response.json()
      dispatch(setName(user.name))
      dispatch(setImage(user.image.data))
      

    } else {
      const json = await response.json()
      console.log(json)

    }

  }
  useEffect(() => {
    !name && getUser()
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
  return (
    <>
      <Container>
        <Wrapper>
          <SearchContainer >
            <Search placeholder="Search" ></Search>
            <SearchOutlinedIcon />
          </SearchContainer>
          <ItemContainer>
            <Item>
              <LanguageOutlinedIcon style={{ fontSize: "20px" }} />
              English
            </Item>
            <Item>
              <DarkModeOutlinedIcon style={{ fontSize: "20px" }} />
            </Item>
            <Item>
              <FullscreenExitOutlinedIcon style={{ fontSize: "20px" }} />
            </Item>
            <Item>
              <Badge
                badgeContent={4} color="primary"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <NotificationsNoneOutlinedIcon style={{ fontSize: "20px" }} />
              </Badge>
            </Item>
            <Item>
              <Badge
                badgeContent={4} color="primary"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <ChatBubbleOutlineOutlinedIcon style={{ fontSize: "20px" }} />
              </Badge>

            </Item>
            <Item>
              <ListOutlinedIcon style={{ fontSize: "20px" }} />
            </Item>
            <Item>
            <Avatar alt={`${name}`} src={`data:image/png;base64,${userImage && arrayBufferToBase64(userImage)}`} sx={{ width: 30, height: 30 ,display:currentUser?"block":"none"}} />
            </Item>
          </ItemContainer>
        </Wrapper>
      </Container>
    </>
  )
}

export default Navbar