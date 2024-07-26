import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodoData, addToTodoData, deleteTodoData, updateTodoData } from './slice/TodoSlice'

function TodoApp() {
    const [search, setSearch] = useState('')
    const [update, setUpdate] = useState('')
    const [editInput, setEditInput] = useState('')
    const dispatch = useDispatch()
    const { todoList, status } = useSelector(state => state.todos)
    // console.log(status)
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTodoData())
        }
    }, [status, dispatch])

    const addTodo = (e) => {
        e.preventDefault()
        dispatch(addToTodoData({ id: Math.random() * 16, title: search }))
        setSearch('')
    }

    const updateRecord = (id,title) => {
        setUpdate(id)
        setEditInput(title)
    }
    const saveUpdateData=(id)=>{
        console.log(id,editInput)
        dispatch(updateTodoData({id,title: editInput}))
        setUpdate(null)
        setEditInput(null)
    }
    return (
        <>
            <h1>Todo Application</h1>
            {status === 'loading' && <h1>loading.....</h1>}
            {
                status === 'fulfilled' &&
                <div>
                    <div>
                        <input placeholder='enter your todo' value={search} onChange={e => setSearch(e.target.value)} />
                        <button onClick={addTodo}>Add Todo</button>
                    </div>
                    <>
                        {
                            todoList.map(({ id, title }) => (
                                <li key={id}>
                                    {
                                        update === id ?
                                            <input type='text' value={editInput} onChange={e => setEditInput(e.target.value)} /> :
                                            <span>{title}</span>

                                    }
                                    {
                                        update === id ?
                                        <button onClick={() => { saveUpdateData(id) }}>Save</button> :
                                    <button onClick={() => { updateRecord(id,title)}}>Update</button>
                                    }
                                    <button onClick={() => { dispatch(deleteTodoData(id)) }}>Delete</button>
                                </li>
                            ))
                        }
                    </>
                </div>
            }

        </>
    )
}

export default TodoApp