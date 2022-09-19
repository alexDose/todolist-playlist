import React, {memo, useCallback} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTodolistFilterAC} from "./state/todolists-reducer";
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
            /*
                        const removeTask = () => dispatch(removeTaskAC(task.id, props.todolistID))

                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                            dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.todolistID))

                        const changeTaskTitle = (title: string) => {
                            dispatch(changeTaskTitleAC(task.id, title, props.todolistID))
                        }
            */

            return (
                <>
                    <TaskWithRedux key={task.id} task={task} todolistId={props.todolistID}/>
                </>


                /*                <li key={task.id} className={task.isDone ? "isDone" : ""}>
                                    <Checkbox
                                        size={"small"}
                                        color={"secondary"}
                                        onChange={changeTaskStatus}
                                        checked={task.isDone}
                                    />
                                    <EditableSpan title={task.title} onChange={changeTaskTitle}/>
                                    {/!*
                                    <span className={task.isDone ? "isDone" : ""}>{task.title}</span>
                *!/}
                                    <IconButton
                                        size={"small"}
                                        aria-label={"delete"} onClick={removeTask}><Delete/></IconButton>
                                </li>*/
            )
        })
        : <span>Your taskList is empty</span>

    const getChangeFilterHandler = useCallback((filter: FilterValuesType) => {
        return () => dispatch(changeTodolistFilterAC(filter, props.todolistID))
    }, [dispatch, props.todolistID])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistID)
    }, [props.removeTodolist, props.todolistID])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistID))
    }, [dispatch, props.todolistID])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todolistID)
    }, [props.changeTodolistTitle, props.todolistID])

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