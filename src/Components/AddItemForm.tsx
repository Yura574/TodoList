import React, {ChangeEvent, KeyboardEvent, memo, MouseEvent, useMemo, useState} from "react";
import s from '../todolist.module.css'

type AddItemFormType = {
    callback: (title: string) => void
}

export const AddItemForm = memo( (props: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const callBackHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (title.trim() === '') {
            setError('title is required')
        }
        title.trim() !== '' && props.callback(title.trim())
        setTitle('')
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
            setTitle('')
        }
    }
    const onBlurHandler = () => {
        if (error) {
            setError('')
        }
    }

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
})

