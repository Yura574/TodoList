import {v1} from 'uuid';
export const a = 2

const todolist1 = v1()
const todolist2 = v1()
let startState = {}
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

test('test', () => {
    // const newTodos: TodolistType[]= [
    //     {id: v1(), title: 'new1', filter:'all'},
    //     {id: v1(), title: 'new2', filter:'all'},
    // ]
    const newTask = {
        addedDate: "2023-10-30T18:57:24.317",
        deadline: null,
        description: null,
        id: "c75bade0-21e0-4b67-8e1e-3043f5c3a21a",
        order: -1,
        priority: 1,
        startDate: null,
        status: 0,
        title: "31",
        todoListId: [todolist1]
    }
    // const endState = addTaskTC.fulfilled({task: newTask, startState[todolist1]}, '',  )
// const   endState = getTodolistsThunk.fulfilled([], newTodos, )
//     expect()
})