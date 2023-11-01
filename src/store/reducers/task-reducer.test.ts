import {v1} from 'uuid';
import {addTaskTC, deleteTaskTC, taskReducer, TasksType, TaskType} from "./taskReducer";
export const a = 2

const todolist1 = v1()
const todolist2 = v1()
let startState: TasksType = {}
beforeEach(() => {
    startState = {
        [todolist1]: [{
            description: 'string',
            title: 'string',
            status: 1,
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
            status: 1,
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
            status: 1,
            priority: 1,
            startDate: 'Date | string',
            deadline: 'Date | string',
            id: '2',
            todoListId: todolist1,
            order: 0,
            addedDate: 'Date | string'
        },],
    }
})

test('add new task', () => {
    const newTask:TaskType = {
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
    const action = addTaskTC.fulfilled({task:newTask, todoId: newTask.todoListId}, '', {todoId: todolist1, title: '1212'} )
    const endState = taskReducer(startState, action)
    expect(endState[todolist1].length).toBe(2)
})


test('delele task', ()=> {
    const action = deleteTaskTC.fulfilled({todoId: todolist1, taskId: startState[todolist1][0].id}, '', {todoId: todolist1, taskId: '12'})
    const endState = taskReducer(startState, action)
    expect(endState[todolist1].length).toBe(0)
})