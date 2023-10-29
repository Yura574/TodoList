import React from "react";
import style from './todolist.module.css'
import {AddItemForm} from "./Components/AddItemForm";
import {ChangeTitle} from "./Components/ChangeTitle";
import {useAppDispatch, useAppSelector} from "./store/store";
import {setChangedTitleId, setError} from "./store/reducers/commonReducer";
import {addTaskAC, changeTaskStatusAC, deleteTaskAC, editTaskTitleAC} from "./store/reducers/taskReducer";
import {changeFilterTodoAC, deleteTodoAC, editTodolistTitleAC} from "./store/reducers/todolistReducer";


type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'completed' | 'active'


export function TodoList(props: TodoListType) {
    const dispatch = useAppDispatch()

    const tasks = useAppSelector(state => state.tasks[props.id])
    const editTitleId = useAppSelector(state => state.common.changedTitleId)

    const addTask = (title: string) => {
        if (!title.trim()) {
            dispatch(setError({id: props.id, error: 'title '}))
        } else {
            dispatch(addTaskAC({todoId: props.id, taskTitle: title.trim()}))
        }
    }
    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todoId, taskId, isDone}))
    }

    const deleteTodolist = (todoId: string) => {
        dispatch(deleteTodoAC(todoId))
    }
    const editTodolistTitle = (title: string) => {
        dispatch(editTodolistTitleAC({todoId: props.id, title}))
        dispatch(setChangedTitleId(''))
    }

    // const cancelEditTitle = () => {
    //     dispatch(setChangedTitleId(''))
    // }
    let taskForTodoList = tasks
    if (props.filter === 'active') {
        taskForTodoList = tasks.filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodoList = tasks.filter(el => el.isDone)
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
                                 // cancelEditTitle={cancelEditTitle}
                    />
                </h3>
                : <h3 onDoubleClick={() => dispatch(setChangedTitleId(props.id))}>{props.title}
                    <button onClick={() => deleteTodolist(props.id)}>x</button>
                </h3>
            }


            <AddItemForm callback={addTask}/>
            <ul>
                {taskForTodoList.map(t => {
                        const deleteTask = () => {
                            dispatch(deleteTaskAC({todoId: props.id, taskId: t.id}))
                        }
                        const editTaskTitle = (title: string) => {
                            dispatch(editTaskTitleAC({todoId: props.id, taskId: t.id, title}))
                            dispatch(setChangedTitleId(''))
                        }
                        return (
                            <div key={t.id}>{editTitleId === t.id
                                ? <ChangeTitle editTitleCallback={editTaskTitle}
                                               title={t.title}
                                />
                                : <li key={t.id} className={t.isDone ? style.taskCompleted : ''}>
                                    <input type="checkbox"
                                           checked={t.isDone}
                                           onChange={() => changeTaskStatus(props.id, t.id, !t.isDone)}/>

                                    <span onDoubleClick={() => dispatch(setChangedTitleId(t.id))}>{t.title}</span>

                                    <button onClick={deleteTask}>x</button>
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