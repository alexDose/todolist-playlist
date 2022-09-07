import React, {ChangeEvent, memo} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";


type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    todolistID: string
}

export const Task = memo(({
                              task,
                              removeTask,
                              changeTaskTitle,
                              changeTaskStatus,
                              todolistID
                          }: TaskPropsType) => {
    console.log('task')
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, todolistID);
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }

    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan title={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})