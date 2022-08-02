import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

// CRUD => СRUD
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {
    // BLL:
    //todolists:
    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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

    })

    //functions
    const removeTask = (taskID: string, todolistId: string): void => {

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskID)})
    }

    const addTask = (title: string, todolistId: string) => {

        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todolistId: string) => {  // 3, false
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    }

    const changeTaskTitle = (taskID: string, title: string, todolistId: string) => {  // 3, false
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, title} : t)})
    }


    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: "all"
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

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
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid style={{padding: "20px"}} spacing={5} container>
                    {todolists.map(tl => {

                        let tasksForRender;
                        switch (tl.filter) {
                            case "completed":
                                tasksForRender = tasks[tl.id].filter(t => t.isDone)
                                break
                            case "active":
                                tasksForRender = tasks[tl.id].filter(t => !t.isDone)
                                break
                            default:
                                tasksForRender = tasks[tl.id]
                        }

                        return <Grid item key={tl.id}>
                        <Paper elevation={8}
                                      style={{padding: "20px"}}>
                            <TodoList
                                key={tl.id}
                                todolistID={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                tasks={tasksForRender}
                                addTask={addTask}
                                removeTask={removeTask}
                                removeTodolist={removeTodolist}
                                changeFilter={changeFilter}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            /></Paper></Grid>
                    })}</Grid>
            </Container>
        </div>
    )
}

export default App;
