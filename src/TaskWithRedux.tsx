import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TaskType} from "./TodoList";


type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({
                                       task,
                                       todolistId
                                   }: TaskPropsType) => {
    console.log('task')
    const {id, isDone, title} = {...task}

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(id, todolistId)), [dispatch, id, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistId))
    }, [id, todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId))
    }, [dispatch, id, todolistId])

    return <div key={id} className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan title={title}  onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})