import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ActionsToodolistsType, todolistsReducer} from "./todolists-reducer";
import {ActionsTasksType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {ActionsAppType, appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootAppActions = ActionsToodolistsType | ActionsTasksType | ActionsAppType

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootAppActions>

//@ts-ignore
window.store = store