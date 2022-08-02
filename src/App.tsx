import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    //BLL
    const todoListTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
    ])

    const [filter, setFilter] = React.useState<FilterValueType>('all')

    const removeTasks = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        console.log(tasks); //ассихронность
    }
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {

        //синтаксис 1

        // const newTask: TaskType = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }

        //синтаксис 2
        // если ключ значение совпадают, можно писать 1 словом! title

        setTasks([{id: v1(), title, isDone: false}, ...tasks ])
    }

    //UI
    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone)
            break
        case "active":
            tasksForRender = tasks.filter(t => !t.isDone)
            break
        default:
            tasksForRender = tasks
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
