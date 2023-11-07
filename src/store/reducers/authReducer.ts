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
export const authTC = createAsyncThunk('authMe', async (name: string, {dispatch, rejectWithValue}) => {
    debugger
    const res = await authApi.authMe()
    console.log(res)


    try {
        dispatch(setInitialized(true))
        if (res.data.resultCode === 0) {
            return res.data.data
        } else {
            return rejectWithValue('error')
        }
    } catch (e) {
        dispatch(setInitialized(true))
        console.log(e)
    }
})

export const loginTC = createAsyncThunk('login', async (param: {
    email: string, password: string, rememberMe: boolean, captcha: boolean
}) => {
    const {email, password, rememberMe, captcha} = param
    const res = await authApi.login(email, password, rememberMe, captcha)
    try {
        return res.data.data
    } catch (err) {

    }
})

export const logoutTC = createAsyncThunk('logout', async () => {
    debugger
    console.log('logout')
    const res = await authApi.logout()
    console.log(res)
    try {
        if (res.data.resultCode === 0) {
            return {}
        } else {
            return console.warn('error')
        }
    } catch (e) {

    }
})

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setInitialized: (state, action) => {
            state.initialized = true
        }
    },
    extraReducers: builder => {
        builder.addCase(authTC.fulfilled, (state, action) => {
            debugger
            state.isLoggedIn = true
            state.dataUser = action.payload
        })
        builder.addCase(loginTC.fulfilled, (state, action) => {
            debugger
            state.isLoggedIn = true
            state.dataUser = action.payload
        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isLoggedIn = false
            state.dataUser = null
        })
    }
})

export const {setInitialized} = authSlice.actions
export const authReducer = authSlice.reducer