import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
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
   // const title: string = "What to learn"
/*
    const [tasks, setTasks] = useState<Array<TaskType>>([ //[newState, setter(fn)]
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: false},
    ])
*/
  //  const [filter, setFilter] = useState<FilterValuesType>("all")
    //functions
    const removeTask = (taskID: string, todolistId: string): void => {
/*        const todolistTasks = tasks[todolistId]
        const updatedTasks = todolistTasks.filter((task: TaskType) => task.id !== taskID)
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updatedTasks
        setTasks(copyTasks)*/

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskID)})
    }

    const addTask = (title: string, todolistId: string) => {
/*        const todolistTasks = tasks[todolistId]
        const updatedTasks = [{id: v1(), title, isDone: false}, ...tasks[todolistId]]
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updatedTasks
        setTasks(copyTasks)*/

        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean,todolistId: string) => {  // 3, false
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, isDone: isDone} :t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    // UI:
    const todolistComponents = todolists.map(tl => {

        let tasksForRender;
        switch (tl.filter) {
            case "completed":
                tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
                break
            case "active":
                tasksForRender = tasks[tl.id].filter(t => t.isDone === false)
                break
            default:
                tasksForRender = tasks[tl.id]
        }
        return  <TodoList
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={tasksForRender}

            addTask={addTask}
            removeTask={removeTask}
            removeTodolist={removeTodolist}
            changeFilter={changeFilter}
            changeTaskStatus={changeTaskStatus}
        />
    })


   /* return (
        <div className="App">
            <TodoList
                title={title}
                filter={filter}
                tasks={tasksForRender}

                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );*/
}

export default App;
