import {setChangedTitleId} from "../store/reducers/commonReducer";
import React, {memo} from "react";
import {useAppDispatch, useAppSelector} from "../store/store";
import {changeTaskStatusAC, deleteTaskAC, editTaskTitleAC} from "../store/reducers/taskReducer";
import {ChangeTitle} from "./ChangeTitle";
import style from "../todolist.module.css";

type TaskType = {
    todoId: string
    filter: string
}
export const Tasks = memo((props: TaskType) =>{
    console.log('task is called')
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[`${props.todoId}`])
    const editTitleId = useAppSelector(state => state.common.changedTitleId)


    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todoId, taskId, isDone}))
    }

    let taskForTodoList = tasks
    if (props.filter === 'active') {
        taskForTodoList = tasks.filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodoList = tasks.filter(el => el.isDone)
    }

    return (
        <ul>
            {taskForTodoList.map(t => {
                    const editTaskTitle = (title: string) => {
                        dispatch(editTaskTitleAC({todoId: t.id, taskId: t.id, title}))
                        dispatch(setChangedTitleId(''))
                    }
                const deleteTask = () => {
                    dispatch(deleteTaskAC({todoId: props.todoId, taskId: t.id}))
                }
                    return (
                        <div key={t.id}>{editTitleId === t.id
                            ? <ChangeTitle editTitleCallback={editTaskTitle}
                                           title={t.title}
                            />
                            : <li key={t.id} className={t.isDone ? style.taskCompleted : ''}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={() => changeTaskStatus(props.todoId, t.id, !t.isDone)}/>

                                <span onDoubleClick={() => dispatch(setChangedTitleId(props.todoId))}>{t.title}</span>

                                <button onClick={deleteTask}>x</button>
                            </li>
                        }

                        </div>
                    )
                }
            )}
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