import React, {useState} from 'react';
import './App.css';
import {FilterType, TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

type TodolistType = {
    id: string,
    title: string
    error: string
    filter: FilterType
}
type TasksTodo = {
    [key: string]: TaskType[]
}

function App() {

    const [todolists, setTodolists] = useState<TodolistType[]>([])
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), isDone: true, title: 'HTML'},
        {id: v1(), isDone: true, title: 'css'},
        {id: v1(), isDone: false, title: 'ts'},
        {id: v1(), isDone: true, title: 'ts'},
        {id: v1(), isDone: false, title: 'ts'},
    ])
    const [tasksTodo, setTaskTodo] = useState<TasksTodo>({
        'id': [{id: v1(), isDone: true, title: 'HTML'},
            {id: v1(), isDone: false, title: 'ts'},]
    })
    const [error, setError] = useState('')

    const [titleTodolist, setTitleTodolist] = useState('')
    const deleteTask = (todoId: string, taskId: string) => {
        // setTasks(tasks.filter(t => t.id !== taskId))
        setTaskTodo({...tasksTodo, [`${todoId}`]: tasksTodo[todoId].filter(el => el.id !== taskId)})
    }
    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        const newTasks = tasksTodo[todoId]
        setTaskTodo({...tasksTodo, [`${todoId}`]: tasksTodo[todoId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }
    const addTodolist = (title: string) => {
        const id = v1()
        const todo: TodolistType = {
            id, title, error: '', filter: "all"
        }
        setTodolists([todo, ...todolists])
        const newTasks: TasksTodo = {...tasksTodo, [`${id}`]: []}
        setTaskTodo(newTasks)
    }

    const changeFilter = (todoId: string, filter: FilterType) => {
        setTodolists(todolists.map(todo => todo.id === todoId ? {...todo, filter} : todo))
    }

    const addTask = (todoId: string, title: string) => {

        const newTask: TaskType = {id: v1(), title, isDone: false}
        // const [`${}`]
        setTaskTodo({...tasksTodo, [`${todoId}`]: [newTask, ...tasksTodo[todoId]]})
        // setTasks([...tasks, newTask])
        // setTaskTodo({...tasksTodo })
    }

    const setErrorHandler = (error: string) => {
        setError(error)
    }

    // let taskForTodoList: TaskType[] = tasks
    //
    // if (filter === 'active') {
    //     taskForTodoList = tasks.filter(t => !t.isDone)
    // }
    // if (filter === 'completed') {
    //     taskForTodoList = tasks.filter(t => t.isDone)
    // }
    const click = () => {
        if (error) {
            setError('')
        }
    }
    // console.log(tasksTodo)
    return (
        <div className="App" onClick={click}>
            <div>
                <input value={titleTodolist}
                       onChange={e => setTitleTodolist(e.currentTarget.value)}
                />
                <button onClick={() => addTodolist(titleTodolist)}>+</button>
            </div>
            {todolists.map(todo => {

                    let taskForTodoList = tasksTodo[todo.id]

                    if (todo.filter === 'active') {
                        taskForTodoList = tasksTodo[todo.id].filter(el => el.isDone)
                    }
                    if (todo.filter === 'completed') {
                        taskForTodoList = tasksTodo[todo.id].filter(el => !el.isDone)
                    }
                    return (
                        <div key={todo.id}>
                            <TodoList
                                id={todo.id}
                                title={todo.title}
                                error={todo.error}
                                filter={todo.filter}
                                addTask={addTask}
                                setErrorHandler={setErrorHandler}
                                tasks={taskForTodoList}
                                deleteTask={deleteTask}
                                setFilter={changeFilter}
                                changeTaskStatus={changeTaskStatus}
                            />
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default App;




