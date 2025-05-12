import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    userData:{},
    role:"",
    dptVal:{
        'computer science':'CS',
        'tamil':'TAMIL',
        'b.com':'BCOM'
    }
}

const userSlice = createSlice({
    initialState,
    name:"user",
    reducers:{
        setData:(state,{payload})=>{
            state.userData = payload
        },
        setAuth:(state,{payload})=>{
            state.isAuth = payload
        },
        setRole:(state,{payload})=>{
            state.role = payload
        }
    }
})


export const {setAuth,setData,setRole} = userSlice.actions

export default userSlice.reducer
