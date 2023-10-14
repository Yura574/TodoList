import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from './todolist.module.css'

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
    setErrorHandler: (error: string) => void
    error: string
    filter: FilterType
}
export type FilterType = 'all' | 'completed' | 'active'


export function TodoList(props: TodoListType) {
    const [title, setTitle] = useState('')
    const addTask = () => {
        if (title.trim() === '') {
            props.setErrorHandler('title is required')
        }
        title.trim() !== '' && props.addTask(props.id, title.trim())
        setTitle('')
    }

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.error) {
            props.setErrorHandler('')
        }
        setTitle(e.currentTarget.value)
    }
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTask()
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
                                <span>{t.title}</span>
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