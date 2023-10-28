import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterType} from "../../TodoList";
import {v1} from "uuid";
import {TodolistType} from "../../App";
import {todolistApi} from "../../api/api";

type InitialStateType = {
    id: string,
    title: string
    filter: FilterType,
}

const initialState: InitialStateType[] = []

export const getTodolistsThunk = createAsyncThunk('todolists',
    async () => {
       return todolistApi.getTodolists();
    }
)
const AddTodolist = createAsyncThunk('addTodo', async () => {

    }
)

const todolistSlice = createSlice({
    name: 'todolistReducer',
    initialState: initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: TodolistType = {id: v1(), title: action.payload, filter: 'all'}
            state.push(newTodo)
        }

    },
    extraReducers: (builder)=>{
        builder.addCase(getTodolistsThunk.fulfilled, (state, action)=> {
            console.log(action)
        })
    }

})

export const {addTodo} = todolistSlice.actions
export const todolistReducer = todolistSlice.reducer
