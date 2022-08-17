import {FilterValuesType, TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";

/*type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    taskId: string
    todolistId: string
}*/
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

/*type AddTaskActionType = {
    type: "ADD_TASK"
    title: string
    todolistId: string
}*/
type AddTaskActionType = ReturnType<typeof addTaskAC>

/*type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    taskId: string
    title: string
    todolistId: string
}*/
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

/*type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}*/
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType


export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD_TASK":
            return {...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}
        case "CHANGE_TASK_TITLE":
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        case "CHANGE_TASK_STATUS":
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)}
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE_TASK", taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD_TASK", title, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE_TASK_TITLE", taskId, title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE_TASK_STATUS", taskId, isDone, todolistId} as const
}
