import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistTC, fetchTodolistsTC, removeTodolistAC, TodolistDomainType} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/todolist-api";
import {RequestStatusType} from "./state/app-reducer";
import {updateTaskTC} from "./state/tasks-reducer";
// CRUD => СRUD
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed"

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('app')
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    // BLL:
    //todolists:

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, {title}))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
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
                {status === "loading" && <LinearProgress color="secondary"/>}
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
