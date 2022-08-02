import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValueType} from "./App";

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (taskID: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')
    const tasksItems = props.tasks.map((t) => {
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTasks(t.id)}>x</button>
            </li>
        )
    })


    const onClickAddTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeSetType = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()

    // функция которая вызывает другую функцию
    // 1

    // const onClickSetFilterAll = () => props.changeFilter('all')
    // const onClickSetFilterActive  = () => props.changeFilter('active')
    // const onClickSetFilterCompleted = () => props.changeFilter('completed')

    //2

    const onClickSetFilterCreator = (filter: FilterValueType) => () => props.changeFilter(filter)

    //3

    // const onClickSetFilterCreator = (filter: FilterValueType) => {
    //     return () => props.changeFilter(filter)
    // }

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input

                    onChange={onChangeSetType}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={onClickSetFilterCreator('all')}>All</button>
                <button onClick={onClickSetFilterCreator('active')}>Active</button>
                <button onClick={onClickSetFilterCreator('completed')}>Completed</button>
            </div>
        </div>

    );
};

export default TodoList;