import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistApi} from "../../api/api";

type InitialStateType = {
    todolists: TodolistType[]
}


export type TodolistType = {
    id: string,
    title: string
    filter: FilterType,
}
export type FilterType = 'all' | 'completed' | 'active'

const initialState: InitialStateType = {
    todolists: []
}

export const getTodolistsThunk = createAsyncThunk('getTodolists',
    async (title: string, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        // console.log('tedo')
       const res =await todolistApi.getTodolists().then(res => res.data)
        console.log(res)
        dispatch(setTodos(res))
    }
)
export const addTodolistTC = createAsyncThunk('addTodolist',
    async (title: string, thunkAPI) => {

        return await todolistApi.addTodolist(title)
    })


const todolistSlice = createSlice({
    name: 'todolistReducer',
    initialState: initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<TodolistType[]>) => {
            console.log(action.payload)
            console.log(state)
           state.todolists= action.payload
        },
        addTodoAC: (state, action: PayloadAction<TodolistType>) => {
            // const newTodo: TodolistType = {id: v1(), title: action.payload, filter: 'all'}
            state.todolists.push(action.payload)
        },
        changeFilterTodoAC: (state, action: PayloadAction<{ todoId: string, filter: FilterType }>) => {
            const index = state.todolists.findIndex(el => el.id === action.payload.todoId)

            state.todolists[index].filter = action.payload.filter
        },
        deleteTodoAC: (state, action: PayloadAction<string>) => {
            const index = state.todolists.findIndex(el => el.id === action.payload)
            state.todolists.splice(index, 1)
        },
        editTodolistTitleAC: (state, action: PayloadAction<{ todoId: string, title: string }>) => {
            const index = state.todolists.findIndex(el => el.id === action.payload.todoId)
            state.todolists[index].title = action.payload.title
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getTodolistsThunk.fulfilled, (state, action) => {
            console.log(action.payload)
        })

    }

})

export const {addTodoAC, setTodos, changeFilterTodoAC, deleteTodoAC, editTodolistTitleAC} = todolistSlice.actions
export const todolistReducer = todolistSlice.reducer
