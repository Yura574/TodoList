import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterType} from "../../TodoList";
import {todolistApi} from "../../api/api";

type InitialStateType = TodolistType[]


export type TodolistType = {
    id: string,
    title: string
    filter: FilterType,
}

const initialState: InitialStateType = []

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
        addTodoAC: (state, action: PayloadAction<TodolistType>) => {
            // const newTodo: TodolistType = {id: v1(), title: action.payload, filter: 'all'}
            state.push(action.payload)
        },
        changeFilterTodoAC: (state, action: PayloadAction<{ todoId: string, filter: FilterType }>) => {
            const index = state.findIndex(el => el.id ===action.payload.todoId  )

            state[index].filter = action.payload.filter
        },
        deleteTodoAC: (state, action: PayloadAction<string>)=> {
            const index = state.findIndex(el => el.id === action.payload)
            state.splice(index,1)
        },
        editTodolistTitleAC: (state, action:PayloadAction<{todoId: string, title: string}>)=>{
            const index = state.findIndex(el => el.id === action.payload.todoId)
            state[index].title = action.payload.title
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getTodolistsThunk.fulfilled, (state, action) => {
            console.log(action)
        })
    }

})

export const {addTodoAC, changeFilterTodoAC, deleteTodoAC, editTodolistTitleAC} = todolistSlice.actions
export const todolistReducer = todolistSlice.reducer
