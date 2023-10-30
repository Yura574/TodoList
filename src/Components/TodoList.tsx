import React, {memo} from "react";
import style from '../todolist.module.css'
import {AddItemForm} from "./AddItemForm";
import {ChangeTitle} from "./ChangeTitle";
import {useAppDispatch, useAppSelector} from "../store/store";
import {setChangedTitleId, setError} from "../store/reducers/commonReducer";
import { addTaskTC} from "../store/reducers/taskReducer";
import {
    changeFilterTodoAC,
     deleteTodolistTC,
    editTodolistTitleAC,
    FilterType,
} from "../store/reducers/todolistReducer";
import {Tasks} from "./Tasks";


type TodoListType = {
    id: string
    title: string
    filter: FilterType

}


export const TodoList = memo((props: TodoListType) => {
    const dispatch = useAppDispatch()

    const editTitleId = useAppSelector(state => state.common.changedTitleId)


    const deleteTodolist = (todoId: string) => {
        dispatch(deleteTodolistTC(todoId))
    }

    const editTodolistTitle = (title: string) => {
        dispatch(editTodolistTitleAC({todoId: props.id, title}))
        dispatch(setChangedTitleId(''))
    }

    const addTask = (title: string) => {
        if (!title.trim()) {
            dispatch(setError({id: props.id, error: 'title '}))
        } else {
            dispatch(addTaskTC({todoId: props.id, title: title.trim()}))
        }
    }


    const onAllClickHandler = () => dispatch(changeFilterTodoAC({todoId: props.id, filter: 'all'}))
    const onActiveClickHandler = () => dispatch(changeFilterTodoAC({todoId: props.id, filter: 'active'}))
    const onCompletedClickHandler = () => dispatch(changeFilterTodoAC({todoId: props.id, filter: 'completed'}))

    return (
        <div>
            {editTitleId === props.id
                ? <h3>
                    <ChangeTitle editTitleCallback={editTodolistTitle}
                                 title={props.title}
                    />
                </h3>
                : <h3 onDoubleClick={() => dispatch(setChangedTitleId(props.id))}>{props.title}
                    <button onClick={() => deleteTodolist(props.id)}>x</button>
                </h3>
            }


            <AddItemForm callback={addTask}/>
            <Tasks todoId={props.id}  filter={props.filter}/>
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
})