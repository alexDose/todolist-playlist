import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}

export type AddTodolistActionType = {
    type: "ADD_TODOLIST"
    title: string
    todolistId: string
}

type ChangeTodolistTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE"
    id: string
    title: string
}

type ChangeTodolistFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD_TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE_TODOLIST_FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return state
/*
            throw new Error("I don't understand this action type")
*/
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE_TODOLIST", id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD_TODOLIST", title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE_TODOLIST_TITLE", id, title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE_TODOLIST_FILTER", id, filter}
}
