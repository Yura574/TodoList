import {v1} from 'uuid';
import {RootStateType} from "../store";
import {addTodolistTC, deleteTodolistTC, getTodolistsThunk, todolistReducer, TodolistType} from "./todolistReducer";

const todolist1 = v1()
const todolist2 = v1()
export const initialTestState: RootStateType = {
    todolist: {
        todolists: [
            {id: todolist1, title: 'firstTodo', order: 0, addedDate: '', filter: 'all'},
            {id: todolist2, title: 'secondTodo', order: 0, addedDate: '', filter: 'all'},
        ],
        test: 1
    },
    tasks: {
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
        }]
        , [todolist2]: [{
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
    },
    common: {
        error: null,
        changedTitleId: ''
    }
}


let startState: RootStateType
beforeEach(() => {
        startState = initialTestState
    }
)

test('fetch todolist with server', () => {
    const fetchNewTodos = [
    {id: todolist1, title: 'firstTodo', order: 0, addedDate: ''},
    {id: todolist2, title: 'secondTodo', order: 0, addedDate: ''},
]
    const action  = getTodolistsThunk.fulfilled( fetchNewTodos, '')

    const endState = todolistReducer({
        todolists: [], test: 1
    }, action)

    expect(endState.todolists.length).toBe(2)
    expect(endState.todolists[0].id).toBe(todolist1)
})

test('add todolist', ()=> {
    const todo:TodolistType = {id:'123', title: 'new todo', order: 0, addedDate: ''}
    const action  = addTodolistTC.fulfilled(todo, '', '')
    const endState = todolistReducer(startState.todolist, action)
    expect(endState.todolists.length).toBe(3)
})

test('delete todolist', ()=> {
    const action = deleteTodolistTC.fulfilled(todolist1, '', todolist1)

    const endState = todolistReducer(startState.todolist, action)

    expect(endState.todolists.length).toBe(1)
})

