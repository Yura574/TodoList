import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from './todolist.module.css'
import {ChangeTaskTitleType} from "./App";

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
    changeTaskTitle: ChangeTaskTitleType | null
    setChangeTaskTitle: (todoId: string, taskId: string, isChange: boolean) => void
    editTaskTitle: (todoId: string, taskId: string, title: string) => void
}
export type FilterType = 'all' | 'completed' | 'active'


export function TodoList(props: TodoListType) {
    const [title, setTitle] = useState('')
    const [editTitle, setEditTitle] = useState(title)

    const addTask = () => {
        if (title.trim() === '') {
            props.setErrorHandler(props.id, 'title is required')
        }
        title.trim() !== '' && props.addTask(props.id, title.trim())
        setTitle('')
    }
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.error) {
            props.setErrorHandler(props.id, '')
        }
        setTitle(e.currentTarget.value)
    }
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTask()
        }
    }
    const onBlurHandler = (taskId: string, title: string) => {
        props.editTaskTitle(props.id, taskId, title)
        props.setChangeTaskTitle(props.id, taskId, false)
    }
    const changeTaskTitleHandler = (taskId: string, title: string) => {
        setEditTitle(title)
        props.setChangeTaskTitle(props.id, taskId, true)
    }
    const keyPressTaskTitleHandler = (taskId: string, title: string, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            props.editTaskTitle(props.id, taskId, title)
            props.setChangeTaskTitle(props.id, taskId, false)
        }
    }
    const onAllClickHandler = () => props.setFilter(props.id, 'all')
    const onActiveClickHandler = () => props.setFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.setFilter(props.id, 'completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={setTitleHandler}
                       onKeyPress={keyPressHandler}
                       className={props.error && style.errorInput}
                />
                <button onClick={addTask}>+</button>
            </div>
            {props.error && <div className={style.error}>{props.error}</div>}
            <ul>
                {props.tasks.map(t => {
                        const deleteTaskHandler = () => {
                            props.deleteTask(props.id, t.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? style.taskCompleted : ''}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={() => props.changeTaskStatus(props.id, t.id, !t.isDone)}/>
                                {props.changeTaskTitle && props.changeTaskTitle.taskId === t.id
                                    ? <span>
                                        <input
                                            value={editTitle}
                                            onChange={e => setEditTitle(e.currentTarget.value)}
                                            autoFocus={true}
                                            onBlur={() => onBlurHandler(t.id, editTitle)}
                                            onKeyPress={e => keyPressTaskTitleHandler(t.id, editTitle, e)}
                                        />
                                </span>
                                    : <span onDoubleClick={() => changeTaskTitleHandler(t.id, t.title)}>{t.title}</span>}

                                <button onClick={deleteTaskHandler}>x</button>
                            </li>
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