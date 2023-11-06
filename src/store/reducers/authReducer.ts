import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authApi} from "../../api/api";

type initialStateType = {
    isLoggedIn: boolean
    initialized: boolean
    dataUser: {
        id: string,
        email: string,
        login: string
    } | null
}
const initialState: initialStateType = {
    isLoggedIn: false,
    initialized: false,
    dataUser: null
}
export const authTC =  createAsyncThunk('authMe', async ()=> {
const res = await authApi.authMe()
    console.log(res)
})
export const loginTC = createAsyncThunk('login', async (
    param:{email: string, password: string, rememberMe: boolean, captcha: boolean
    })=> {
    const {email, password, rememberMe, captcha} = param
    const res = await authApi.login(email, password, rememberMe, captcha)
    try {
        console.log(res.data)
    }catch (err) {

    }
})

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authTC.fulfilled,(state,action)=> {

        })
    }
})

export const authReducer = authSlice.reducer