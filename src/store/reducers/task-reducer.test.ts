import {v1} from 'uuid';
import {getTodolistsThunk} from './todolistReducer';


export const a = 2

const todolist1 = v1()
const todolist2 = v1()
let startState = {}
beforeEach( ()=>{
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
// const   endState = getTodolistsThunk.fulfilled(startState, '', )
//     expect()
})