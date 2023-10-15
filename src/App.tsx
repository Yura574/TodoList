import React, {useState} from 'react';
import './App.css';
import {FilterType, TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

type TodolistType = {
    id: string,
    title: string
    filter: FilterType
}
type TasksType = {
    [key: string]: TaskType[]
}
export type ErrorType = {
    id: string,
    error: string
}
export type ChangeTaskTitleType = {
    todoId: string
    taskId: string
    isChange: boolean
}

function App() {

    const [todolists, setTodolists] = useState<TodolistType[]>([])
    const [tasks, setTasks] = useState<TasksType>({})
    const [titleTodolist, setTitleTodolist] = useState('')
    const [error, setError] = useState<ErrorType | null>(null)
    const [isChangeTaskTitle, setIsChangeTaskTitle] = useState<ChangeTaskTitleType | null>(null)


    const addTodolist = (title: string) => {
        const id = v1()
        const todo: TodolistType = {
            id, title, filter: "all"
        }
        setTodolists([todo, ...todolists])
        const newTasks: TasksType = {...tasks, [`${id}`]: []}
        setTasks(newTasks)
    }
    const changeFilter = (todoId: string, filter: FilterType) => {
        setTodolists(todolists.map(todo => todo.id === todoId ? {...todo, filter} : todo))
    }

    const addTask = (todoId: string, title: string) => {

        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [`${todoId}`]: [newTask, ...tasks[todoId]]})
    }
    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [`${todoId}`]: tasks[todoId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }
    const editTaskTitle = (todoId: string, taskId: string, title: string) => {
        console.log('title', title)
        setTasks({...tasks, [`${todoId}`]: tasks[todoId].map(t => t.id === taskId ? {...t, title} : t)})
    }
    const deleteTask = (todoId: string, taskId: string) => {
        setTasks({...tasks, [`${todoId}`]: tasks[todoId].filter(el => el.id !== taskId)})
    }


    const setErrorHandler = (id: string, error: string) => {
        setError({id, error})
    }
    const setChangeTaskTitle = (todoId: string, taskId: string, isChange: boolean,) => {
        isChange ? setIsChangeTaskTitle({todoId, taskId, isChange}) : setIsChangeTaskTitle(null)
    }


    const click = () => {
        if (error) {
            setError(null)
        }
        // if (isChangeTaskTitle) {
        //     setIsChangeTaskTitle(null)
        // }
    }
    return (
        <div className="App"
             onClick={click}
        >
            <div>
                <input value={titleTodolist}
                       onChange={e => setTitleTodolist(e.currentTarget.value)}
                />
                <button onClick={() => addTodolist(titleTodolist)}>+</button>
            </div>
            {todolists.map(todo => {
                    let taskForTodoList = tasks[todo.id]
                    if (todo.filter === 'active') {
                        taskForTodoList = tasks[todo.id].filter(el => !el.isDone)
                    }
                    if (todo.filter === 'completed') {
                        taskForTodoList = tasks[todo.id].filter(el => el.isDone)
                    }
                    return (
                        <div key={todo.id}>
                            <TodoList
                                id={todo.id}
                                title={todo.title}
                                error={error?.id === todo.id ? error.error : ''}
                                filter={todo.filter}
                                addTask={addTask}
                                setErrorHandler={setErrorHandler}
                                tasks={taskForTodoList}
                                deleteTask={deleteTask}
                                setFilter={changeFilter}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={isChangeTaskTitle?.todoId === todo.id ? isChangeTaskTitle : null}
                                setChangeTaskTitle={setChangeTaskTitle}
                                editTaskTitle={editTaskTitle}
                            />
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default App;




