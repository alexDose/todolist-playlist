import React, {memo, useCallback, useEffect} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskTC, fetchTasksTC, updateTaskTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTodolistFilterAC, removeTodolistTC} from "./state/todolists-reducer";
import {TaskWithRedux} from "./TaskWithRedux";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type TodoListPropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

const TodoList = memo((props: TodoListPropsType) => {
    console.log('todolist')
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    let tasksForRender: Array<TaskType>;
    switch (props.filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.status === TaskStatuses.Completed)
            break
        case "active":
            tasksForRender = tasks.filter(t => t.status === TaskStatuses.New)
            break
        default:
            tasksForRender = tasks
    }

    const tasksListItems = tasksForRender.length
        ? tasksForRender.map(task => {

            return (
                <>
                    <TaskWithRedux key={task.id} task={task} todolistId={props.todolistID}/>
                </>
            )
        })
        : <span>Your taskList is empty</span>

    const getChangeFilterHandler = useCallback((filter: FilterValuesType) => {
        return () => dispatch(changeTodolistFilterAC(filter, props.todolistID))
    }, [dispatch, props.todolistID])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string, taskId: string) => { dispatch(updateTaskTC(todolistId,{title}, taskId))
    }, [dispatch()])

    return (

        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>

                <IconButton
                    aria-label={"delete"} onClick={removeTodolist}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <List>
                {tasksListItems}
            </List>
            <div>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "default"}
                    className={props.filter === "all" ? "active" : ""}
                    onClick={getChangeFilterHandler("all")}>All
                </Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "default"}
                    className={props.filter === "active" ? "active" : ""}
                    onClick={getChangeFilterHandler("active")}>Active
                </Button>
                <Button
                    disableElevation
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "default"}
                    className={props.filter === "completed" ? "active" : ""}
                    onClick={getChangeFilterHandler("completed")}>Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList;