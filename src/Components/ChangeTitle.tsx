import React, {KeyboardEvent, useState} from "react";
import s from '../todolist.module.css'
import {setChangedTitleId} from "../store/reducers/commonReducer";
import {useAppDispatch} from "../store/store";

type ChangeTitleType = {
    title?: string
    editTitleCallback: (title: string) => void
}

export const ChangeTitle = (props: ChangeTitleType) => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState(props.title ? props.title : '')
    const [error, setError] = useState('')

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            if (title.trim() !== '') {
                props.editTitleCallback(title)
            } else {
                setError('title is required')
            }
        }
    }
    const editTitle = () => {
        if (title.trim() !== '') {
            props.editTitleCallback(title)
        } else {
            setError('title is required')
        }
    }
    const cancelEditTitle = ()=> {
        dispatch(setChangedTitleId(''))
    }
    const changeTitle = (title: string) => {
        if (error) {
            setError('')
        }
        setTitle(title)
    }
    return (
        <>
            <input value={title}
                   onChange={e => changeTitle(e.currentTarget.value)}
                   autoFocus
                   onFocus={e => e.currentTarget.select()}
                   onKeyPress={onKeyPressHandler}
                   className={error&& s.errorInput}
            />
            <button onClick={editTitle}>edit</button>
            <button onClick={cancelEditTitle}>cancel</button>
            {error && <div className={error&& s.error}>{error}</div>}
        </>
    )
}