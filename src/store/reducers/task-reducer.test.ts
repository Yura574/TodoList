import {v1} from 'uuid';
import {addTaskTC, changeTaskTC, deleteTaskTC, taskReducer, TasksType, TaskType} from "./taskReducer";

const todolist1 = v1()
const todolist2 = v1()
let startState: TasksType
let task: TaskType
beforeEach(() => {
    startState = {
        [todolist1]: [{
            description: 'string',
            title: 'string',
            status: 0,
            priority: 1,
            startDate: 'Date | string',
            deadline: 'Date | string',
            id: '1',
            todoListId: todolist1,
            order: 0,
            addedDate: 'Date | string'
        }],
        [todolist2]: [{
            description: 'string',
            title: 'string',
            status: 0,
            priority: 1,
            startDate: 'Date | string',
            deadline: 'Date | string',
            id: '1',
            todoListId: todolist1,
            order: 0,
            addedDate: 'Date | string'
        }, {
            description: 'string',
            title: 'string',
            status: 0,
            priority: 1,
            startDate: 'Date | string',
            deadline: 'Date | string',
            id: '2',
            todoListId: todolist1,
            order: 0,
            addedDate: 'Date | string'
        },],
    }
    task = {
        addedDate: "2023-10-30T18:57:24.317",
        deadline: null,
        description: null,
        id: "c75bade0-21e0-4b67-8e1e-3043f5c3a21a",
        order: -1,
        priority: 1,
        startDate: null,
        status: 0,
        title: "31",
        todoListId: todolist1
    }
})

test('add new task', () => {
    const action = addTaskTC.fulfilled({task, todoId: task.todoListId}, '', {
        todoId: todolist1,
        title: '1212'
    })
    const endState = taskReducer(startState, action)
    expect(endState[todolist1].length).toBe(2)
})


test('delele task', () => {
    const action = deleteTaskTC.fulfilled({
        todoId: todolist1,
        taskId: startState[todolist1][0].id
    }, '', {todoId: todolist1, taskId:startState[todolist1][0].id})
    const endState = taskReducer(startState, action)
    expect(endState[todolist1].length).toBe(0)
})

test('change task status', () => {
    const taskData = {todoId: todolist1, taskId: startState[todolist1][0].id, task: startState[todolist1][0]}
    const action = changeTaskTC.fulfilled(taskData, '', {
        todoId: task.todoListId,
        taskId: startState[todolist1][0].id,
        changedData: 1
    })
    debugger
    const endState = taskReducer(startState, action)

    expect(startState[task.todoListId][0].status).toBe(0)
    expect(endState[task.todoListId][0].status).toBe(1)
})


test('change task title', () => {
    const taskData = {todoId: todolist1, taskId: startState[todolist1][0].id, task: startState[todolist1][0]}
    const action = changeTaskTC.fulfilled(taskData, '', {
        todoId: task.todoListId,
        taskId: startState[todolist1][0].id,
        changedData: 'new Title'
    })
    debugger
    const endState = taskReducer(startState, action)
    console.log(endState)
    expect(endState[task.todoListId][0].title).toBe('new Title')
})