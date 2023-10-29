import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialStateType= {
    error: ErrorType | null,
    changedTitleId: string
}
const initialState:InitialStateType = {
    error: null,
    changedTitleId: ''

}
export type ErrorType = {
    id: string,
    error: string
}

const commonSlice = createSlice({
    name: 'commonReducer',
    initialState,
    reducers: {
        setError: (state, action:PayloadAction<ErrorType | null>)=>{
            state.error = action.payload
        },
        setChangedTitleId: (state, action:PayloadAction<string>)=>{
            state.changedTitleId = action.payload
        }
    }
})

export const {setError, setChangedTitleId}= commonSlice.actions
export const commonReducer = commonSlice.reducer
