import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodoData = createAsyncThunk('todo/getData', async ()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    return data.slice(0,10)
})

export const addToTodoData = createAsyncThunk('todo/addData', async (newRecord)=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(newRecord)
    })

    return  await response.json()
})

export const updateTodoData = createAsyncThunk('todo/updateData', async (updateRecord)=>{
   const response= await fetch(`https://jsonplaceholder.typicode.com/todos/${updateRecord.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(updateRecord)
    })
    return await response.json()
})

export const deleteTodoData = createAsyncThunk('todo/deleteData', async(id)=>{
   await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        method:'DELETE',
    })
    return id
})

const TodoSlice = createSlice({
    name: 'todo',
    initialState:{
        todoList : [],
        status: 'idle'
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchTodoData.pending,state=>{
            state.status = "loading"
        })
        .addCase(fetchTodoData.fulfilled,(state,action)=>{
            state.todoList = action.payload
            state.status = "fulfilled"

        })
        .addCase(fetchTodoData.rejected,state=>{
            state.status = "error"
        })
        .addCase(addToTodoData.fulfilled,(state,action)=>{
            state.todoList.push(action.payload)
        })
        .addCase(updateTodoData.fulfilled,(state,action)=>{
            console.log(action)
            const index = state.todoList.findIndex(todo=> todo.id === action.payload.id)
            state.todoList[index] = action.payload
         })
        .addCase(deleteTodoData.fulfilled,(state,action)=>{
           state.todoList = state.todoList.filter(data => data.id !== action.payload)
        })
    }
})

export default TodoSlice.reducer