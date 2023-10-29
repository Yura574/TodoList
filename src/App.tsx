import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {useSelector} from "react-redux";
import {addTodoAC, TodolistType} from "./store/reducers/todolistReducer";
import {RootStateType, useAppDispatch} from "./store/store";



function App() {
    const dispatch = useAppDispatch()
    const todos = useSelector((state: RootStateType) => state.todolist)

    useEffect(() => {
        // dispatch(getTodolistsThunk())
    }, [])

    const addTodolist = (title: string) => {
        const todo: TodolistType = {id: v1(), title, filter: "all"}
        dispatch(addTodoAC(todo))
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
                                // editTitleId={editTitleId}
                            />
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default App;



