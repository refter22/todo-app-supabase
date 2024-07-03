import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../api/todoApi'

interface TodoState {
  todos: Todo[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  currentPage: number
  totalPages: number
  filter: 'all' | 'active' | 'completed' | 'archived'
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
  currentPage: 0,
  totalPages: 0,
  filter: 'active'
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      if (state.filter === 'all' || state.filter === 'active') {
        state.todos.unshift(action.payload)
        if (state.todos.length > 10) {
          state.todos.pop()
        }
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      )
      if (index !== -1) {
        state.todos[index] = action.payload
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    setStatus: (state, action: PayloadAction<TodoState['status']>) => {
      state.status = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload
    },
    setFilter: (state, action: PayloadAction<TodoState['filter']>) => {
      state.filter = action.payload
      state.currentPage = 0
    },
    updateCurrentPage: (state) => {
      if (state.currentPage >= state.totalPages) {
        state.currentPage = Math.max(0, state.totalPages - 1)
      }
    }
  }
})

export const {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  setStatus,
  setError,
  setPage,
  setTotalPages,
  setFilter,
  updateCurrentPage
} = todoSlice.actions

export default todoSlice.reducer
