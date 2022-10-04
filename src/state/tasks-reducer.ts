import {TaskStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType} from "../api/todolist-api";
import {AppRootStateType, ThunkType} from "./store";
import {Dispatch} from "redux";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type AddTaskActionType = ReturnType<typeof addTaskAC>

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ChangeTaskStatusActionType = ReturnType<typeof updateTaskAC>

export type SetTasksActionType = ReturnType<typeof setTasksAC>

export type ActionsTasksType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState = {} as TaskStateType

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTasksType): TaskStateType => {
    console.log('reducer')
    switch (action.type) {
        case "REMOVE_TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD_TASK":
            const copy = {...state}
            const tasks = copy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            copy[action.task.todoListId] = newTasks
            return copy
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "UPDATE_TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }
        case "ADD_TODOLIST":
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        case "REMOVE_TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: "REMOVE_TASK", todolistId, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: "ADD_TASK", task} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE_TASK_TITLE", taskId, title, todolistId} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskType, todolistId: string) => {
    return {type: "UPDATE_TASK", taskId, model, todolistId} as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

export const fetchTasksTC = (todolistId: string): ThunkType => {
    return (dispatch) => {
        taskAPI.getTasks(todolistId).then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

type UpdateDomainTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, domainModel: UpdateDomainTaskType, taskId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            return
        }
        const apiModel: UpdateTaskType ={
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        taskAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }
}







