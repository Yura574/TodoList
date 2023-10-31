import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistApi} from "../../api/api";

type InitialStateType = {
    todolists: TodolistTypeWithFilter[],
    test: number
}


export type TodolistType = {
    addedDate: Date | string
    id: string
    order: number
    title: string

}
export type TodolistTypeWithFilter = TodolistType & {
    filter: FilterType,
}
export type FilterType = 'all' | 'completed' | 'active'

const initialState: InitialStateType = {
    todolists: [],
    test: 1
}

export const getTodolistsThunk = createAsyncThunk('getTodolists', async () => {
        return await todolistApi.getTodolists().then(res => {
            return res.data
        })
    }
)
export const addTodolistTC = createAsyncThunk('addTodolist', async (title: string) => {
    return todolistApi.addTodolist(title).then(res => {

        return  res.data.data.item
    })
})
export const deleteTodolistTC = createAsyncThunk('deleteTodolist', async (todoId: string, thunkAPI) => {
    return todolistApi.deleteTodolist(todoId).then(res => {
            return todoId
        }
    )
})

const todolistSlice = createSlice({
    name: 'todolistReducer',
    initialState: initialState,
    reducers: {
        addTodoAC: (state, action: PayloadAction<TodolistType>) => {
            state.todolists.push({...action.payload, filter: 'all'})
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
        },
        testFunc: (state, action) => {
            ++state.test
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getTodolistsThunk.fulfilled, (state, action) => {
            state.todolists = action.payload.map((el: TodolistType) => {
                return {...el, filter: 'all'}
            })
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.todolists.unshift(action.payload.result)
        })
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            const index = state.todolists.findIndex(el => el.id === action.payload)
            state.todolists.splice(index, 1)
        })

    }

})

export const {addTodoAC, testFunc, changeFilterTodoAC, deleteTodoAC, editTodolistTitleAC} = todolistSlice.actions
export const todolistReducer = todolistSlice.reducer
