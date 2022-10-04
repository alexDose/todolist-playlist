import {FilterValuesType} from "../AppWithRedux";
import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {setAppStatusAC, SetAppStatusType} from "./app-reducer";
import {ThunkType} from "./store";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type TodolistDomainType = TodolistType & {filter: FilterValuesType}

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ActionsToodolistsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType | SetAppStatusType

const initialState = [] as Array<TodolistDomainType>

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsToodolistsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD_TODOLIST":
           const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE_TODOLIST_FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE_TODOLIST", id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: "ADD_TODOLIST", todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE_TODOLIST_TITLE", id, title} as const
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
    return {type: "CHANGE_TODOLIST_FILTER", filter, id} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return ({type: 'SET-TODOLISTS', todolists} as const)
}

export const fetchTodolistsTC = (): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    await todolistsAPI.getTodolists().then((res) => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}