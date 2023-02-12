import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
       currentUser:null,
       isFetching:false,
       name:"",
       userImage:"",
       error:false,
       width:0,
    },
    reducers:{
        loginStart:(state)=>{
          state.isFetching=true;
          state.width=100
        },
        loginSuccess:(state,action)=>{
          state.isFetching=false;
          state.width=0;
          state.currentUser=action.payload
        },
        loginFailure:(state)=>{
           state.error=true;
           state.isFetching=false;
           state.width=0
        },
        loginFailureReset:(state)=>{
          state.error=false;
        },
        logoutSuccess:(state,action)=>{
          state.isFetching=false;
          state.currentUser=action.payload;
          state.error=false;
          state.width=0
        },
        setName:(state,action)=>{
          state.name=action.payload;
        },
        setImage:(state,action)=>{
          state.userImage=action.payload
        },

    }
})

export const {loginStart,loginSuccess,loginFailure,logoutSuccess,loginFailureReset,setImage,setName,setAdmin}=userSlice.actions
export default userSlice.reducer;