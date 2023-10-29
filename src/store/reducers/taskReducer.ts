import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoAC, deleteTodoAC} from "./todolistReducer";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}

const initialState: TasksType = {}


const taskSlice = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {
        addTaskAC: (state, action: PayloadAction<{ todoId: string, taskTitle: string }>) => {
            const newTask: TaskType = {id: v1(), title: action.payload.taskTitle, isDone: false}
            state[`${action.payload.todoId}`].push(newTask)


        },
        changeTaskStatusAC: (state, action: PayloadAction<{ todoId: string, taskId: string, isDone: boolean }>) => {
            const arr = state[action.payload.todoId]
            const index = arr.findIndex(el => el.id === action.payload.taskId)
            arr[index].isDone = action.payload.isDone
        },
        editTaskTitleAC: (state, action: PayloadAction<{ todoId: string, taskId: string, title: string }>) => {
            const arr = state[action.payload.todoId]
            const index = arr.findIndex(el => el.id === action.payload.taskId)
            arr[index].title = action.payload.title
        },
        deleteTaskAC: (state, action: PayloadAction<{ todoId: string, taskId: string }>) => {
            const arr = state[action.payload.todoId]
            const index = arr.findIndex(el => el.id === action.payload.taskId)
            arr.splice(index, 1)
        }

    },
    extraReducers: (builder) => {
        builder.addCase(addTodoAC, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(deleteTodoAC, (state, action) => {
            delete state[action.payload]
        })
    }
})

export const {addTaskAC, changeTaskStatusAC, editTaskTitleAC, deleteTaskAC} = taskSlice.actions

export const taskReducer = taskSlice.reducer