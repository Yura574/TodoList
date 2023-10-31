import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoAC, addTodolistTC, deleteTodoAC, getTodolistsThunk} from "./todolistReducer";
import {v1} from "uuid";
import {tasksApi} from '../../api/api';
import {RootStateType} from '../store';

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: Date | string
    deadline: Date | string
    id: string
    todoListId: string
    order: number
    addedDate: Date | string
}

// export type TaskTypeOriginal = TaskType + isDone
export type TasksType = {
    [key: string]: TaskType[]
}
export type addTaskDTO = {
    todoId: string
    title: string
}
export type deleteTaskDTO = {
    todoId: string
    taskId: string
}
export type changeTaskDTO = {
    todoId: string
    taskId: string
    task: TaskType
}

const initialState: TasksType = {}

export const getTasksTC = createAsyncThunk('getTasks', async (todoId: string, thunkAPI) => {
    return tasksApi.getTasks(todoId).then(res => {
        const tasks = res.data.items
        return {todoId, tasks}
    })
})

export const addTaskTC = createAsyncThunk('addTask', async (task: addTaskDTO, thunkAPI) => {
   return  tasksApi.addTask(task).then(res => {
       return {todoId: task.todoId, task: res.data.data.item}
    })
})

export const deleteTaskTC = createAsyncThunk('deleteTask', async (task: deleteTaskDTO, thunkAPi) => {
    const dispatch = thunkAPi.dispatch
    const {taskId, todoId} = task
    await tasksApi.deleteTask(todoId, taskId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTaskAC({todoId, taskId}))
        }
    })
})
export const changeTaskTC = createAsyncThunk('changeTask', async (changedTask: any, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    const state: any = thunkAPI.getState()
    const task = state.tasks[`${changedTask.todoId}`].find((el: any) => el.id === changedTask.taskId)
})


const taskSlice = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {
        // addAllTasks: (state, action: PayloadAction<{ todoId: string, tasks: any }>) => {
        //     // state[`${action.payload.todoId}`] = state[`${action.payload.todoId}`].concat(action.payload.tasks)
        //     state[action.payload.todoId] = action.payload.tasks
        // },
        //
        // addTaskAC: (state, action: PayloadAction<{ todoId: string, task: TaskType }>) => {
        //     state[`${action.payload.todoId}`].push(action.payload.task)
        // },
        changeTaskStatusAC: (state, action: PayloadAction<{ todoId: string, taskId: string, isDone: boolean }>) => {
            // const arr = state[action.payload.todoId]
            // const index = arr.findIndex(el => el.id === action.payload.taskId)
            // arr[index].isDone = action.payload.isDone
        },
        editTaskTitleAC: (state, action: PayloadAction<{ todoId: string, taskId: string, title: string }>) => {
            const arr = state[action.payload.todoId]
            const index = arr.findIndex(el => el.id === action.payload.taskId)
            arr[index].title = action.payload.title
        },
        deleteTaskAC: (state, action: PayloadAction<{ todoId: string, taskId: string }>) => {
            console.log(action.payload)
            console.log('delete task')
            const arr = state[action.payload.todoId]
            const index = arr.findIndex(el => el.id === action.payload.taskId)
            arr.splice(index, 1)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteTodoAC, (state, action) => {
            delete state[action.payload]
        })
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoId] = action.payload.tasks
        })
        builder.addCase(addTaskTC.fulfilled, (state, action)=>{
            state[action.payload.todoId].unshift(action.payload.task)
        })
        builder.addCase(getTodolistsThunk.fulfilled, (state, action) => {
            action.payload.forEach((el: any) => {
                state[el.id] = []
            })
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action)=>{
            state[action.payload.result.id] = []
        })
    }
})

export const { changeTaskStatusAC, editTaskTitleAC, deleteTaskAC,} = taskSlice.actions

export const taskReducer = taskSlice.reducer