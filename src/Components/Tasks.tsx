import {setChangedTitleId} from "../store/reducers/commonReducer";
import React, {memo, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/store";
import {changeTaskDTO, changeTaskTC, deleteTaskTC,  getTasksTC} from "../store/reducers/taskReducer";
import {ChangeTitle} from "./ChangeTitle";
import style from "../todolist.module.css";

type TaskType = {
    todoId: string
    filter: string
}
export const Tasks = memo((props: TaskType) => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[`${props.todoId}`])
    const editTitleId = useAppSelector(state => state.common.changedTitleId)
    useEffect(() => {
        dispatch(getTasksTC(props.todoId))
    }, [props.todoId])


    const changeTaskStatus = (todoId: string, taskId: string, status: number) => {
        const changeData: changeTaskDTO<number> ={todoId, taskId, changedData: status}
        dispatch(changeTaskTC(changeData))
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
                    dispatch(changeTaskTC({todoId: props.todoId, taskId: t.id, changedData: title}))
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
                        : <li key={t.id} className={t.status === 1 ? style.taskCompleted : ''}>
                            <input type="checkbox"
                                   checked={t.status === 1}
                                   onChange={() => changeTaskStatus(props.todoId, t.id, t.status ===0 ? 1 : 0)}/>

                                <span onDoubleClick={() => dispatch(setChangedTitleId(t.id))}>{t.title}</span>

                                <button onClick={deleteTask}>x</button>
                            </li>
                        }

                        </div>                    )                }            )}
        </ul>
    )
})