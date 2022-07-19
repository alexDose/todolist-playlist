import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string, id: string) => void
    removeTask: (taskID: string, id: string) => void
    removeTodolist: (id: string) => void
    changeFilter: (filter: FilterValuesType, id: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, id: string) => void
}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const errorMessageStyles = {color: "hotpink"}
    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id, props.todolistID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistID)
            return (
                <li>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}
                    />
                    <span className={task.isDone ? "isDone" : ""}>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskList is empty</span>

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todolistID)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            onClickAddTask()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const getChangeFilterHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todolistID)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolist}>X</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={errorMessageStyles}>Title is required!</div>}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active" : ""}
                    onClick={getChangeFilterHandler("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "active" : ""}
                    onClick={getChangeFilterHandler("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active" : ""}
                    onClick={getChangeFilterHandler("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;