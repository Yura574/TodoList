import React, {useState} from "react";
import style from './todolist.module.css'
import {AddItemForm} from "./Components/AddItemForm";
import {ChangeTitle} from "./Components/ChangeTitle";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (todoId: string, taskId: string) => void
    setFilter: (todoId: string, filter: FilterType) => void
    changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
    addTask: (todoId: string, title: string) => void
    setErrorHandler: (todoId: string, error: string) => void
    error: string
    filter: FilterType
    editTaskTitle: (todoId: string, taskId: string, title: string) => void
    deleteTodolist: (todoId: string) => void
    editTodolistTitle: (todoId: string, title: string) => void
    editTitleId: string
    setEditTitleId: (id: string)=> void
}
export type FilterType = 'all' | 'completed' | 'active'

export type ChangeTitleType = {
    id: string
}
export function TodoList(props: TodoListType) {
    debugger
    // const [title, setTitle] = useState(props.title ? props.title :'')
    const [isChangeTitle, setIsChangeTitle] = useState('')

    const addTask = (title: string) => {
        props.addTask(props.id, title.trim())
    }

    // const changeTodolistTitle = (title: string) => {
    //     setTitle(title)
    // }
    const editTodolistTitleHandler = (title: string) => {
        props.editTodolistTitle(props.id, title)
        props.setEditTitleId('')
    }
    console.log(isChangeTitle )
    const cancelEditTitle = ()=>{
        props.setEditTitleId('')
    }


    const onAllClickHandler = () => props.setFilter(props.id, 'all')
    const onActiveClickHandler = () => props.setFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.setFilter(props.id, 'completed')

    return (
        <div>
            {props.editTitleId === props.id
                ? <h3>
                    <ChangeTitle editTitleCallback={editTodolistTitleHandler}
                                 title={props.title}
                                 cancelEditTitle={cancelEditTitle}
                    />
                </h3>
                : <h3 onDoubleClick={() => props.setEditTitleId(props.id)}>{props.title}
                    <button onClick={() => props.deleteTodolist(props.id)}>x</button>
                </h3>
            }


            <AddItemForm callback={addTask}/>
            {props.error && <div className={style.error}>{props.error}</div>}
            <ul>
                {props.tasks.map(t => {
                        const deleteTaskHandler = () => {
                            props.deleteTask(props.id, t.id)

                        }
                        const editTaskTitle = (title: string) => {
                            props.editTaskTitle(props.id, t.id, title)
                            props.setEditTitleId('')
                        }
                        return (
                            <div>{
                                props.editTitleId === t.id
                                    ? <ChangeTitle editTitleCallback={editTaskTitle}
                                                   title={t.title}
                                                   cancelEditTitle={cancelEditTitle}
                                    />
                                    : <li key={t.id} className={t.isDone ? style.taskCompleted : ''}>
                                        <input type="checkbox"
                                               checked={t.isDone}
                                               onChange={() => props.changeTaskStatus(props.id, t.id, !t.isDone)}/>

                                        <span onDoubleClick={() => props.setEditTitleId(t.id)}>{t.title}</span>

                                        <button onClick={deleteTaskHandler}>x</button>
                                    </li>
                            }

                            </div>
                        )
                    }
                )}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? style.active : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? style.active : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? style.active : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}