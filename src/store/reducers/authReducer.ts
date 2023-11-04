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
const authTC =  createAsyncThunk('authMe', async (state, action)=> {
const res = await authApi.authMe()
    console.log(res)
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