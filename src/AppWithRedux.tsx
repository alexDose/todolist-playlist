import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodolistDomainType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/todolist-api";

// CRUD => СRUD
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed"

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('app')
    // BLL:
    //todolists:

    /*    const todolistId1 = v1()
        const todolistId2 = v1()

        const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"},
        ])*/

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    /*
        let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    */

    let dispatch = useDispatch()

    /*    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
            [todolistId1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS/ES6", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "Bread", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Meat", isDone: false},
            ]
        })*/

//functions
    /*    const removeTask = (taskID: string, todolistId: string) => {
            dispatch(removeTaskAC(taskID, todolistId))
        }

        const addTask = (title: string, todolistId: string) => {
            dispatch(addTaskAC(title, todolistId))
        }
        const changeTaskStatus = (taskID: string, isDone: boolean, todolistId: string) => {  // 3, false
            dispatch(changeTaskStatusAC(taskID, isDone, todolistId))
        }

        const changeTaskTitle = (taskID: string, title: string, todolistId: string) => {  // 3, false
            dispatch(changeTaskTitleAC(taskID, title, todolistId))
        }

        const changeFilter = (filter: FilterValuesType, todolistId: string) => {
            dispatch(changeTodolistFilterAC(filter, todolistId))
        }*/

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

// UI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid style={{marginTop: "20px"}} container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid style={{padding: "20px"}} spacing={5} container>

                    {todolists.map(tl => {


                        return <Grid item key={tl.id}>
                            <Paper elevation={8}
                                   style={{padding: "20px"}}>
                                <TodoList key={tl.id}
                                          todolistID={tl.id}
                                          title={tl.title}
                                          filter={tl.filter}
                                          removeTodolist={removeTodolist}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}</Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
