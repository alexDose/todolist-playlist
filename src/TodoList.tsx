import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    addTask: (title: string, todolistID: string) => void
    removeTask: (taskID: string, id: string) => void
    removeTodolist: (id: string) => void
    changeFilter: (filter: FilterValuesType, id: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, id: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}


const TodoList = (props: TodoListPropsType) => {

    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id, props.todolistID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistID)
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todolistID)
            }
            return (
                <li key={task.id} className={task.isDone ? "isDone" : ""}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    {/*
                    <span className={task.isDone ? "isDone" : ""}>{task.title}</span>
*/}
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskList is empty</span>

    const getChangeFilterHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todolistID)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }

    const changeTodolistTitle =(title: string) => {
        props.changeTodolistTitle(title, props.todolistID)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>

                <button onClick={removeTodolist}>X</button>
            </h3>

            <AddItemForm addItem={addTask}/>

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