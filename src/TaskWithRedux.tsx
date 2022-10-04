import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTaskTC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {ThunkType} from "./state/store";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({
                                       task,
                                       todolistId
                                   }: TaskPropsType) => {
    console.log('task')
    const {id, status, title} = {...task}

    const dispatch = useDispatch()

    const removeTask = useCallback(function(todolistId: string, id: string): ThunkType {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch, id, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId))
    }, [dispatch, id, todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId))
    }, [dispatch, id, todolistId])

    return <div key={id} className={status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan title={title}  onChange={onTitleChangeHandler}/>
        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </div>
})