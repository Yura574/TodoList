import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {AddItemForm} from "./Components/AddItemForm";
import {useSelector} from "react-redux";
import {addTodolistTC, getTodolistsThunk,} from "./store/reducers/todolistReducer";
import {RootStateType, useAppDispatch, useAppSelector} from "./store/store";
import {Header} from "./Components/Header";
import {redirect, Navigate} from "react-router-dom";
import {authTC} from "./store/reducers/authReducer";


function App() {
    const dispatch = useAppDispatch()
    const todos = useSelector((state: RootStateType) => state.todolist.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const initialized = useAppSelector(state => state.auth.initialized)
// debugger
    useEffect(()=> {
        debugger
        dispatch(authTC(''))
    }, [])

    useEffect(() => {
      isLoggedIn &&  dispatch(getTodolistsThunk())
    }, [isLoggedIn])

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }
    if(!isLoggedIn && initialized){
      return <Navigate to={'login'}/>
    }

    return (
        <div>

            <Header/>
            {isLoggedIn&&  <div className="App">

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
            </div>}
        </div>
    );
}

export default App;



