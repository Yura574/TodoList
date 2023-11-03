import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistTC, deleteTodoAC, getTodolistsThunk, TodolistType} from "./todolistReducer";
import {tasksApi} from '../../api/api';
import {RootStateType} from "../store";

export type TaskType = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate:  string | null
    deadline:  string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
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
export type changeTaskDTO<T> = {
    todoId: string
    taskId: string
    changedData: T
}

const initialState: TasksType = {}

export const getTasksTC = createAsyncThunk('getTasks', async (todoId: string) => {
    return tasksApi.getTasks(todoId).then(res => {
        const tasks = res.data.items
        return {todoId, tasks}
    })
})

export const addTaskTC = createAsyncThunk('addTask', async (task: addTaskDTO) => {
    return tasksApi.addTask(task).then(res => {
        return {todoId: task.todoId, task: res.data.data.item}
    })
})

export const deleteTaskTC = createAsyncThunk('deleteTask', async (task: deleteTaskDTO) => {
    const {taskId, todoId} = task
    return tasksApi.deleteTask(todoId, taskId).then(res => {
        if (res.data.resultCode === 0) {
            return {todoId, taskId}
        }
    })
})
export const changeTaskTC = createAsyncThunk('changeTask', async (changedTask: changeTaskDTO<number | string>, thunkAPI) => {
    const state: RootStateType = thunkAPI.getState() as RootStateType
    const task = state.tasks[`${changedTask.todoId}`].find((el: TodolistType) => el.id === changedTask.taskId)
    if(task) {
        let newTask: TaskType = task
        if(typeof changedTask.changedData === 'number'){
            newTask = {...task, status: changedTask.changedData}
        }
        if(typeof changedTask.changedData === 'string'){
            newTask = {...task, title: changedTask.changedData}
        }

        return  tasksApi.changeTask(changedTask.todoId, changedTask.taskId, newTask)
            .then(res => {
                return {todoId: changedTask.todoId, taskId: changedTask.taskId, task: res.data.data.item}
            })
    }


})


const taskSlice = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {

        editTaskTitleAC: (state, action: PayloadAction<{ todoId: string, taskId: string, title: string }>) => {
            const arr = state[action.payload.todoId]
            const index = arr.findIndex(el => el.id === action.payload.taskId)
            arr[index].title = action.payload.title
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteTodoAC, (state, action) => {
            delete state[action.payload]
        })
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoId] = action.payload.tasks
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            console.log(action.payload)
            state[action.payload.todoId].unshift(action.payload.task)
        })
        builder.addCase(getTodolistsThunk.fulfilled, (state, action) => {
            action.payload.forEach((el: any) => {
                state[el.id] = []
            })
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload!.todoId].findIndex(el => el.id === action.payload!.taskId)
            state[action.payload!.todoId].splice(index, 1)
        })
        builder.addCase(changeTaskTC.fulfilled, (state, action) => {
          if(action.payload){
              console.log(action.payload)
              const index = state[action.payload.todoId].findIndex(el => el.id === action.payload!.taskId)
              state[action.payload.todoId].splice(index, 1 , action.payload.task)
          }
        })
    }
})


export const taskReducer = taskSlice.reducer