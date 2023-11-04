import {v1} from 'uuid';
import {
    addTodolistTC,
    changeTodolistTC,
    deleteTodolistTC,
    getTodolistsThunk,
    todolistReducer,
    TodolistType,
    TodolistTypeWithFilter
} from "./todolistReducer";

const todolist1 = v1()
const todolist2 = v1()
type InitialStateType = {
    todolists: TodolistTypeWithFilter[],
}

export const initialTestState: InitialStateType = {
    todolists: [
        {id: todolist1, title: 'firstTodo', order: 0, addedDate: '', filter: 'all'},
        {id: todolist2, title: 'secondTodo', order: 0, addedDate: '', filter: 'all'},
    ],
}

let startState: InitialStateType

beforeEach(() => {
        startState = initialTestState
    }
)

test('fetch todolist with server', () => {
    const fetchNewTodos = [
        {id: todolist1, title: 'firstTodo', order: 0, addedDate: ''},
        {id: todolist2, title: 'secondTodo', order: 0, addedDate: ''},
    ]
    const action = getTodolistsThunk.fulfilled(fetchNewTodos, '')

    const endState = todolistReducer({
        todolists: []
    }, action)

    expect(endState.todolists.length).toBe(2)
    expect(endState.todolists[0].id).toBe(todolist1)
})

test('add todolist', () => {
    const todo: TodolistType = {id: '123', title: 'new todo', order: 0, addedDate: ''}
    const action = addTodolistTC.fulfilled(todo, '', '')
    const endState = todolistReducer(startState, action)
    expect(endState.todolists.length).toBe(3)
})

test('delete todolist', () => {
    const action = deleteTodolistTC.fulfilled(todolist1, '', todolist1)
    const endState = todolistReducer(startState, action)

    expect(endState.todolists.length).toBe(1)
})

test('change todolist title', () => {
    const action = changeTodolistTC.fulfilled(
        {todoId: startState.todolists[0].id, title: 'new title'},
        '',
        {todoId: startState.todolists[0].id, title: 'new title'}
    )

    const endState = todolistReducer(startState, action)
    expect(endState.todolists[0].title).toBe('new title')
})

