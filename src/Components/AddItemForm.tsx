import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import s from '../todolist.module.css'

type AddItemFormType = {
    title?: string
    callback: (title: string) => void
    cancelEdit?: () => void
    isChange?: boolean
}

export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState(props.title ? props.title : '')
    const [error, setError] = useState('')

    const callBackHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (title.trim() === '') {
            setError('title is required')
        }
        title.trim() !== '' && props.callback(title.trim())
        setTitle('')
        props.cancelEdit && props.cancelEdit()
    }


    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError('')
        }
        setTitle(e.currentTarget.value)
    }

    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            props.callback(title)
            props.cancelEdit && props.cancelEdit()
            setTitle('')
        }
    }
    const onBlurHandler = () => {
        if (error) {
            setError('')
        }
    }
    // const setChangeTaskTitle = (todoId: string, taskId: string, isChange: boolean,) => {
    //     isChange ? setIsChangeTaskTitle({todoId, taskId, isChange}) : setIsChangeTaskTitle(null)
    // }
    // const onBlurHandler = (taskId: string, title: string) => {
    //     props.editTaskTitle(props.id, taskId, title)
    //     props.setChangeTaskTitle(props.id, taskId, false)
    // }
    //
    // const keyPressTaskTitleHandler = (taskId: string, title: string, e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.code === 'Enter') {
    //         props.editTaskTitle(props.id, taskId, title)
    //         props.setChangeTaskTitle(props.id, taskId, false)
    //     }
    // }
    return (
        <span>
            <input value={title}
                   onChange={setTitleHandler}
                   onKeyPress={keyPressHandler}
                   autoFocus
                   onBlur={onBlurHandler}
                   className={error && s.errorInput}

            />
            <button onClick={(e) => callBackHandler(e)}>
                +</button>
            {error && <div className={s.error}>{error}</div>}
        </span>
    )
}