import {setChangedTitleId} from "../store/reducers/commonReducer";
import React, {memo, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/store";
import {
    changeTaskStatusAC, changeTaskTC,
    deleteTaskAC,
    deleteTaskTC,
    editTaskTitleAC,
    getTasksTC
} from "../store/reducers/taskReducer";
import {ChangeTitle} from "./ChangeTitle";
import style from "../todolist.module.css";

type TaskType = {
    todoId: string
    filter: string
}
export const Tasks = memo((props: TaskType) => {
    console.log('task is called')
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[`${props.todoId}`])
    const editTitleId = useAppSelector(state => state.common.changedTitleId)
    useEffect(() => {
        dispatch(getTasksTC(props.todoId))
    }, [props.todoId])


    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskTC({todoId, taskId, isDone}))
    }

    let taskForTodoList = tasks
    if (props.filter === 'active') {
        taskForTodoList = tasks.filter(el => !el.status)
    }
    if (props.filter === 'completed') {
        taskForTodoList = tasks.filter(el => el.status)
    }

    return (
        <ul>
            {taskForTodoList.map(t => {
                    const editTaskTitle = (title: string) => {
                        dispatch(editTaskTitleAC({todoId: t.id, taskId: t.id, title}))
                        dispatch(setChangedTitleId(''))
                    }
                    const deleteTask = () => {
                        dispatch(deleteTaskTC({todoId: props.todoId, taskId: t.id}))
                    }
                    return (
                        <div key={t.id}>{editTitleId === t.id
                            ? <ChangeTitle editTitleCallback={editTaskTitle}
                                           title={t.title}
                            />
                            : <li key={t.id} className={t.status ===1 ? style.taskCompleted : ''}>
                                <input type="checkbox"
                                       checked={t.status ===1}
                                       onChange={() => changeTaskStatus(props.todoId, t.id, t.status !== 1)}/>

                                <span onDoubleClick={() => dispatch(setChangedTitleId(props.todoId))}>{t.title}</span>

                                <button onClick={deleteTask}>x</button>
                            </li>
                        }

                        </div>                    )                }            )}
        </ul>
        // <div>
        //     <input type="checkbox"
        //            checked={props.isDone}
        //            onChange={() => changeTaskStatus(props.todoId, props.taskId, !props.isDone)}/>
        //
        //     <span onDoubleClick={() => dispatch(setChangedTitleId(props.todoId))}>{props.title}</span>
        //
        //     <button onClick={deleteTask}>x</button>
        // </div>
    )
})