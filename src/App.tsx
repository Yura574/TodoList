import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {AddItemForm} from "./Components/AddItemForm";
import {useSelector} from "react-redux";
import { addTodolistTC, getTodolistsThunk, } from "./store/reducers/todolistReducer";
import {RootStateType, useAppDispatch} from "./store/store";



function App() {
    const dispatch = useAppDispatch()
    const todos = useSelector((state: RootStateType) => state.todolist.todolists)

    useEffect(() => {
        dispatch(getTodolistsThunk())
    }, [])

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {todos.map(todo => {
                    return (
                        <div key={todo.id}>
                            <TodoList
                                id={todo.id}
                                title={todo.title}
                                filter={todo.filter}
                            />
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default App;



