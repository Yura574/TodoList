import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TasksType} from "../../App";
import {TaskType} from "../../TodoList";
import {v1} from "uuid";


const initialState: TasksType = {
}


const taskSlice = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {
        addTask: (state, action:PayloadAction<{todoId: string, title: string}>)=>{
            const newTask:TaskType = {id: v1(), title: action.payload.title, isDone: false}
            state[`${action.payload.todoId}`].push(newTask)
        },
    },
    extraReducers: (builder)=>{

    }
})

export const {addTask} = taskSlice.actions

export const taskReducer= taskSlice.reducer